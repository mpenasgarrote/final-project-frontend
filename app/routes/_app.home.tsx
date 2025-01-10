import { LoaderFunction, redirect } from '@remix-run/node'
import { getAuthToken, getLoggedUser } from '~/data/auth.server'
import { TrendingMovies } from '../components/filters/TrendingMovies'
import { useLoaderData } from '@remix-run/react'
import { Product, User } from '~/types/interfaces'
import { getTrendingMovies } from '~/data/movies.server'

export const loader: LoaderFunction = async ({ request }) => {
	const authToken = await getAuthToken(request)

	if (!authToken) {
		return redirect('/login')
	}

	const user = await getLoggedUser(request, authToken)

	const trendingMovies = await getTrendingMovies(authToken)

	return {trendingMovies, user}
}

export default function Home() {
	const { trendingMovies, user } = useLoaderData<{ trendingMovies: Product[], user: User }>()

	return (
		<div className="container mx-auto p-2">
			<TrendingMovies products={trendingMovies} userLogged={user}  />
		</div>
	)
}
