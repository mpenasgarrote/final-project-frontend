import { LoaderFunction, redirect } from '@remix-run/node'
import { getAuthToken, getLoggedUser } from '~/data/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
	const authToken = await getAuthToken(request)

	if (!authToken) {
		return redirect('/login')
	}

	const user = await getLoggedUser(request, authToken)

	const trendingMovies = await getTrendingMovies(authToken)

	const trendingGames = await getTrendingGames(authToken)

	return { trendingMovies, trendingGames, user }
}

export default function Home() {

	return (
		<div className="container mx-auto p-2">
			
		</div>
	)
}
