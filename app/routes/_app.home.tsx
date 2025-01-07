import { LoaderFunction } from '@remix-run/node'
import { getAuthToken } from '~/data/auth.server'
import { TrendingMovies } from '../components/filters/TrendingMovies'
import { useLoaderData } from '@remix-run/react'
import { Product } from '~/types/interfaces'
import { getTrendingMovies } from '~/data/movies.server'

export const loader: LoaderFunction = async ({ request }) => {
	const authToken = await getAuthToken(request)

	if (!authToken) {
		throw new Response('Unauthorized', { status: 401 })
	}

	const trendingMovies = await getTrendingMovies(authToken)

	return trendingMovies
}

export default function Home() {
	const trendingMovies = useLoaderData<Product[]>()

	return (
		<div className="container mx-auto p-2">
			<TrendingMovies products={trendingMovies} />
		</div>
	)
}
