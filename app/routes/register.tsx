import { ActionFunctionArgs } from '@remix-run/node'
import SignupForm from '~/components/auth/SignupForm'

export default function Index() {
	return (
		<div>
			<SignupForm />
		</div>
	)
}

export async function action({request}: ActionFunctionArgs) {
	const formData = await request.formData()

	const name = formData.get('name')
	const username = formData.get('username')
	const email = formData.get('email')
	const password = formData.get('password')

	
}