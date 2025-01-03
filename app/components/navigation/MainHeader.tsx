import { Link } from '@remix-run/react'

const MainHeader: React.FC = () => {
	return (
		<nav className="bg-primaryBlack-default text-white px-6 py-4 shadow-md">
			<div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
				<div className="flex-shrink-0 mx-auto md:mx-0">
					<Link
						to="/home"
						className="text-2xl md:text-3xl font-extrabold tracking-wide text-center "
					>
						<img
							src="/images/LogoCritics.png"
							alt="The Critic's Eye"
							className="h-12 md:h-16 hover:scale-110 transition-transform duration-300 ease-in-out"
						/>
					</Link>
				</div>

				{/* Left Section: Links */}
				<div className="flex items-center space-x-6 md:space-x-14">
					<Link
						to="/movies"
						className="text-primaryWhite-default dark:text-primaryWhite-default hover:text-primaryYellow-default 
                        hover:scale-110 hover:bg-primaryBlack-light hover:text-bolder hover:px-2 hover:py-1 hover:rounded text-lg font-medium transition-colors"
					>
						Movies
					</Link>
					<Link
						to="/games"
						className="text-primaryWhite-default dark:text-primaryWhite-default hover:text-primaryYellow-default 
                        hover:scale-110 hover:bg-primaryBlack-light hover:text-bolder hover:px-2 hover:py-1 hover:rounded text-lg font-medium transition-colors"
					>
						Games
					</Link>
					<Link
						to="/books"
						className="text-primaryWhite-default dark:text-primaryWhite-default hover:text-primaryYellow-default 
                        hover:scale-110 hover:bg-primaryBlack-light hover:text-bolder hover:px-2 hover:py-1 hover:rounded text-lg font-medium transition-colors"
					>
						Books
					</Link>
				</div>

				{/* Right Section: Search and User */}
				<div className="flex items-center space-x-6 md:space-x-8 mt-4 md:mt-0">
					<div className="relative w-full max-w-xs">
						<input
							type="text"
							placeholder="Search..."
							className="bg-primaryBlack-light text-sm w-full rounded-full pl-12 pr-5 py-2.5 focus:outline-none focus:font-bold transition-transform duration-300 ease-in-out focus:scale-105 focus:ring-2 focus:ring-primaryBlack-default focus:bg-primaryWhite-default focus:text-primaryBlack-default"
							onFocus={(e) => {
								const nextSibling = e.target.nextSibling as HTMLElement | null
								if (nextSibling) {
									nextSibling.classList.add('text-primaryBlack-default')
									nextSibling.classList.add('scale-110')
								}
							}}
							onBlur={(e) => {
								const nextSibling = e.target.nextSibling as HTMLElement | null
								if (nextSibling) {
									nextSibling.classList.remove('text-primaryBlack-default')
									nextSibling.classList.remove('scale-110')
								}
							}}
						/>
						<span className="absolute inset-y-0 left-4 flex items-center text-primaryWhite-default transition-colors duration-300">
							<i className="bi bi-search"></i>
						</span>
					</div>

					<Link
						to="/publish"
						className="text-primaryBlack-default dark:text-primaryWhite-default hover:text-primaryBlack-default 
                        hover:scale-130 hover:bg-primaryWhite-default hover:text-bolder hover:px-2 hover:py-1 hover:rounded text-lg font-medium transition-colors"
					>
						Publish
					</Link>

					<div>
						<span className="font-medium text-lg">Username</span>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default MainHeader
