import axios from 'axios'
import { Genre, Product, Type } from '~/types/interfaces'

const apiUrl = process.env.API_URL

export async function getTypes(authToken: string): Promise<Type[]> {
	try {
		const response = await axios.get(`${apiUrl}/api/product-types`, {
			headers: {
				Authorization: `Bearer ${authToken}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			withCredentials: true,
		})

		return response.data.Types as Type[]
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error('Error fetching types:', error.message)
			throw new Error('Error fetching types')
		} else {
			throw error
		}
	}
}

export async function getGenres(authToken: string): Promise<Genre[]> {
	try {
		const response = await axios.get(`${apiUrl}/api/genres`, {
			headers: {
				Authorization: `Bearer ${authToken}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			withCredentials: true,
		})

		return response.data.genres as Genre[]
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			console.error('Error fetching genres:', error.message)
			throw new Error('Error fetching genres')
		} else {
			throw error
		}
	}
}

interface ProductGenre {
    product_id: number
    genre_id: number
}

export async function getGenresFromProduct(productId: number, authToken: string):Promise<Genre[]> {
    try {
        const response = await axios.get(`${apiUrl}/api/product-genres?product_id=${productId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            withCredentials: true,
        })

		const data: ProductGenre[] = response.data['Product-Genre'] as ProductGenre[]

		const genres:Genre[] = await getGenres(authToken)

		const productGenres = data.map(({genre_id}) => {
			const genre = genres.find((genre: Genre) => genre.id === genre_id)
			return genre
		})

        return productGenres as Genre[]
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching genres:', error.message)
            throw new Error('Error fetching genres')
        } else {
            throw error
        }
    }
}

export async function getProductById(id: string, authToken: string): Promise<Product | null> {
	try {
		const response = await axios.get(
			`${apiUrl}/api/products/${id}`,
			{
				headers: {
					'Authorization': `Bearer ${authToken}`,
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				withCredentials: true,
			}
		)

		const product = response.data.message as Product
		const allTypes: Type[] = await getTypes(authToken)
		const type = allTypes.find((type: Type) => type.id === product.type_id)
		product.type = type
        product.genres = await getGenresFromProduct(product.id, authToken)
        
		return product
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error('Error fetching product:', error.message)
			throw new Error('Error fetching product')
		} else {
			throw error
		}
	}
}
