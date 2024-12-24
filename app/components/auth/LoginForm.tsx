import {
	Link,
	useActionData,
	useNavigation,
	useSearchParams,
} from '@remix-run/react'
import { ValidationErrors } from '../../types/interfaces'
// import { useState } from 'react'

function LoginForm() {
	const [searchParams] = useSearchParams()
	const navigation = useNavigation()
	const validationErrors = useActionData<ValidationErrors>()

	const authMode = searchParams.get('mode') || 'login'

	const submitBtnCaption = authMode === 'login' ? 'Login' : 'Register'

	const toggleBtnCaption =
		authMode === 'login' ? 'Create a new user' : 'Log in with a different user'

	const isSubmitting = navigation.state !== 'idle'

	/*const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		setIsSubmitting(true)
	}*/

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 dark:from-gray-800 dark:to-black">
				<div className="bg-white/30 dark:bg-black/40 backdrop-blur-md p-8 rounded-lg shadow-lg max-w-sm w-full">
					<h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
						Login
					</h1>

					<form id="login-form" method="post" className="space-y-4">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Email
							</label>
							<input
								type="string"
								id="email"
								name="email"
								placeholder="Enter your email"
								className="w-full p-3 rounded-lg border focus:ring focus:ring-blue-500 dark:focus:ring-purple-500 focus:outline-none transition-colors duration-300 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								// minLength={6}
								placeholder="Enter your password"
								className="w-full p-3 rounded-lg border focus:ring focus:ring-blue-500 dark:focus:ring-purple-500 focus:outline-none transition-colors duration-300 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
								required
							/>
						</div>

						<div>
							{validationErrors && (
								<ul>
									{Object.values(validationErrors).map((error) => (
										<li key={error} className="text-red-500 text-xs">
											{error}
										</li>
									))}
								</ul>
							)}
						</div>

						<button
							disabled={isSubmitting}
							type="submit"
							className="w-full bg-primaryYellow-default hover:bg-primaryYellow-light text-primaryWhite-default font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-110 relative"
						>
							{isSubmitting && (
								<div className="absolute ml-10 left-3/4 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
									<div className="w-5 h-5 border-4 border-t-transparent border-primaryWhite-default border-solid rounded-full animate-spin"></div>
								</div>
							)}
							{isSubmitting ? 'Authenticating...' : submitBtnCaption}
						</button>

						<Link
							to={authMode === 'login' ? '?mode=signup' : '?mode=login'}
							className="block text-center text-sm text-gray-700 dark:text-gray-300 hover:underline"
						>
							{toggleBtnCaption}
						</Link>
					</form>
				</div>
			</div>
		</>
	)
}

export default LoginForm
