import { ActionFunctionArgs } from '@remix-run/node'
import LoginForm from '../components/auth/LoginForm'
import { validateCredentials } from '~/data/validations.server'
import { login } from '~/data/auth.server'

export default function Index() {
	return (
		<div>
			<LoginForm />
		</div>
	)
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const email = formData.get('email') as string
	const password = formData.get('password') as string

	if (!email || !password) {
		return new Response('Email and password are required', { status: 400 })
	}

	if (validateCredentials({ email, password })) {
		return validateCredentials({ email, password })
	}

	try {
		return await login({ email, password })
	} catch (error) {
		console.log(error)
		console.error('Error during authentication:', error)

		// if (axios.isAxiosError(error) && error.response?.status === 401) {
		//   return new Response("Invalid login credentials", { status: 401 });
		// }
		return error
	}
}
