import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import Loader from '~/components/navigation/Loader'
import MainFooter from '~/components/navigation/MainFooter'
import MainHeader from '~/components/navigation/MainHeader'
import { getLoggedUser } from '~/data/auth.server'
import { User } from '~/types/interfaces'

export async function loader({ request }: LoaderFunctionArgs) {
	const user = getLoggedUser(request)

	if (!user) {
		return redirect('/login')
	}

	return user
}

export default function MainPageLayout(): JSX.Element {
	const user = useLoaderData<User>()

	return (
		<div className="flex flex-col min-h-screen">
			<link
				href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
				rel="stylesheet"
			/>
			<Loader />
			<MainHeader user={user} />
			<main className="flex-grow">
				<Outlet />
			</main>
			<MainFooter />
		</div>
	)
}
