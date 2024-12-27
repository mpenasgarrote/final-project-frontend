import { Link, useFetcher } from '@remix-run/react'

function LoginForm() {
	const fetcher = useFetcher()

	const validationErrors = fetcher.data ? fetcher.data : undefined

	const submitBtnCaption = 'Login'

	const toggleBtnCaption = 'Create a new user'

	const isSubmitting = fetcher.state === 'submitting'

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 dark:from-gray-800 dark:to-black">
				<div className="bg-white/30 dark:bg-primaryBlack-default backdrop-blur-md p-8 rounded-lg shadow-lg max-w-sm w-full">
					<h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
						Login
					</h1>

					<fetcher.Form id="login-form" method="post" className="space-y-4">
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
								className="w-full p-3 rounded-lg border italic focus:ring focus:ring-primaryYellow-default focus:outline-none transition-all duration-200 transform scale-100 focus:scale-105 focus:border-primaryYellow-default focus:ring-4 bg-primaryBlack-light text-gray-900 dark:text-gray-200"
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
								className="w-full p-3 rounded-lg border italic focus:ring focus:ring-primaryYellow-default focus:outline-none transition-all duration-200 transform scale-100 focus:scale-105 focus:border-primaryYellow-default focus:ring-4 bg-primaryBlack-light text-gray-900 dark:text-gray-200"
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
							className={`w-full font-bold py-3 rounded-lg transition-all duration-300 transform relative ${
								isSubmitting
									? 'bg-gray-400 text-gray-200 cursor-not-allowed'
									: 'bg-primaryYellow-default hover:bg-primaryYellow-light text-white hover:scale-110'
							}`}
						>
							{isSubmitting && (
								<div className="absolute ml-10 left-3/4 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
									<div className="w-5 h-5 border-4 border-t-transparent border-primaryWhite-default border-solid rounded-full animate-spin"></div>
								</div>
							)}
							{isSubmitting ? 'Authenticating...' : submitBtnCaption}
						</button>

						<Link
							to="/register"
							className="block text-center text-sm text-gray-700 dark:text-gray-300 hover:underline"
						>
							{toggleBtnCaption}
						</Link>
					</fetcher.Form>
				</div>
			</div>
		</>
	)
}

export default LoginForm
