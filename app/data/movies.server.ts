import axios from 'axios'
import { Product, ShowErrors, Type } from '~/types/interfaces'
import { getGenresFromProduct, getTypes } from './products.server'

const apiUrl = process.env.API_URL

export async function getLatestMovies(): Promise<Product[] | ShowErrors> {
	try {
		const response = await axios.get(
			`${apiUrl}/api/products?type_id=2&limit=10&sort=created_at:desc`,
			{
				headers: {
					// 'Authorization': `Bearer ${token}`, // Asegúrate de que el token sea correcto
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				withCredentials: true,
			}
		)

		return (await response).data.products as Product[]
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const validationErr: ShowErrors = {
				title: error.message,
				code: error.code,
			}
			return validationErr
		} else {
			throw error
		}
	}
}

export async function getTrendingMovies(authToken: string): Promise<Product[] | ShowErrors> {
	try {
		const response = await axios.get(
			`${apiUrl}/api/products?type_id=2&limit=10&sort=score:desc`,
			{
				headers: {
					'Authorization': `Bearer ${authToken}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				withCredentials: true,
			}
		)

		const data = (await response.data.products) as Product[]

		const allTypes: Type[] = await getTypes(authToken)

		const movies: Product[] = await Promise.all(data.map(async (movie) => {
			const type = allTypes.find((type: Type) => type.id === movie.type_id)
			movie.type = type
			movie.genres = await getGenresFromProduct(movie.id, authToken)

			return movie
		}))


		return movies as Product[]
	} catch (error: unknown) {
		console.log('Error fetching trending movies:', error)
		if (axios.isAxiosError(error)) {
			const validationErr: ShowErrors = {
				title: error.message,
				code: error.code,
			}
			return validationErr
		} else {
			throw error
		}
	}
}
