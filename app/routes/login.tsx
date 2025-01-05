import { ActionFunctionArgs } from '@remix-run/node'
import LoginForm from '../components/auth/LoginForm'
import { validateLoginCredentials } from '~/data/validations.server'
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
		return {
			validationErrors: {
				email: 'Email is required',
				password: 'Password is required',
			},
			status: 400,
		}
	}

	if (validateLoginCredentials({ email, password })) {
		return validateLoginCredentials({ email, password })
	}

	try {
		return await login({ email, password })
	} catch (error: unknown) {
		return error
	}
}
