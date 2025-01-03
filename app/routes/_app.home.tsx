import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getLatestMovies, getTrendingMovies } from '~/data/movies.server'
import { Product } from '~/types/interfaces'
import { ProductCard } from '~/components/products/ProductCard'
import { getAuthToken } from '~/data/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
	const authToken = await getAuthToken(request)

	console.log(authToken ?? 'No token found')

	if (!authToken) {
		throw new Response('Unauthorized', { status: 401 })
	}

	const latestMovies = await getTrendingMovies(authToken)

	console.log(latestMovies)

	return latestMovies
}

export default function Home() {
	const data = useLoaderData<Product[]>()

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl m-4 font-bold mb-6 text-gray-800 dark:text-gray-200">
				Movies
			</h1>
			<hr />
			<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
				{data.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}
