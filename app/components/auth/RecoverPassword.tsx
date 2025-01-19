import { Link, useFetcher } from '@remix-run/react'

export default function RecoverPassword() {
	const fetcher = useFetcher()
	type FetcherData = {
		FormError?: {
			message?: string
		}
	}

	const formError = (fetcher.data as FetcherData)?.FormError

	const isSubmitting =
		fetcher.state === 'submitting' || fetcher.state === 'loading'

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 dark:from-gray-800 dark:to-black">
			<div className="bg-white/30 dark:bg-primaryBlack-default backdrop-blur-md p-8 rounded-lg shadow-lg max-w-sm w-full">
				<h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200 mb-6">
					Recover Password
				</h1>
				<fetcher.Form method="post" className="space-y-4">
					<div className="">
						<label
							htmlFor="usernameOrEmail"
							className={`block text-sm font-medium transition-all duration-200 ${
								formError
									? 'text-red-500 dark:text-red-500'
									: 'text-gray-700 dark:text-gray-300'
							}`}
						>
							Insert your Username or Email
						</label>
						<input
							name="email"
							type="text"
							placeholder="user_example or user@example.com"
							className={`w-full p-3 rounded-lg border italic focus:outline-none transition-all duration-200 transform ${
								formError
									? 'border-red-500 focus:ring-errorColor-light text-errorColor-light focus:scale-105 focus:border-errorColor-light animate-shake'
									: 'focus:ring focus:ring-primaryYellow-default focus:scale-105 focus:border-primaryYellow-default bg-primaryBlack-light text-gray-900 dark:text-gray-200'
							}`}
							required
						/>
						{formError?.message && (
							<>
								<p className="text-red-500 text-xs">{formError.message}</p>
							</>
						)}
					</div>

					<button
						disabled={isSubmitting}
						type="submit"
						className={`w-full font-bold py-3 rounded-lg transition-all mt-6 duration-300 transform relative ${
							isSubmitting
								? 'bg-gray-400 text-gray-200 cursor-not-allowed'
								: 'bg-primaryYellow-default hover:bg-primaryYellow-light text-black hover:scale-110'
						}`}
					>
						{isSubmitting && (
							<div className="absolute ml-10 left-3/4 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
								<div className="w-5 h-5 border-4 border-t-transparent border-primaryWhite-default border-solid rounded-full animate-spin"></div>
							</div>
						)}
						{isSubmitting ? 'Sending Email...' : 'Send Email'}
					</button>
				</fetcher.Form>

				<div className=" mt-4 space-y-4">
					<Link
						to="/login"
						className="block text-center text-sm text-gray-700 dark:text-gray-300 hover:underline dark:hover:text-primaryYellow-default"
					>
						Return to Login
					</Link>

					<Link
						to="/register"
						className="block text-center text-sm text-gray-700 dark:text-gray-300 hover:underline dark:hover:text-primaryYellow-default"
					>
						Create a new User
					</Link>
				</div>
			</div>
		</div>
	)
}
