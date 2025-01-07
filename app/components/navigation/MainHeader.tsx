import { Link, Form } from '@remix-run/react'
import { useState } from 'react'
import { User } from '~/types/interfaces'

const MainHeader = ({ user }: { user: User }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	return (
		<nav className="bg-primaryBlack-default text-white px-6 py-4 shadow-md relative">
			<div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
				<div className="flex-shrink-0 mx-auto md:mx-0">
					<Link
						to="/home"
						className="text-2xl md:text-3xl font-extrabold tracking-wide text-center"
					>
						<img
							src="/images/LogoCritics.png"
							alt="The Critic's Eye"
							className="h-12 md:h-16 hover:scale-110 transition-transform duration-300 ease-in-out"
						/>
					</Link>
				</div>

				<div className="flex items-center space-x-8">
					{['Movies', 'Games', 'Books'].map((item) => (
						<Link
							key={item}
							to={`/${item.toLowerCase()}`}
							className="relative text-primaryWhite-default dark:text-primaryWhite-default text-lg font-medium transition-all duration-300 ease-in-out group"
						>
							<span className="absolute inset-0 rounded-lg bg-primaryBlack-light transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-in-out" />

							<span className="relative z-10 px-2 group-hover:text-primaryYellow-default">
								{item}
							</span>
						</Link>
					))}
				</div>

				<div className="flex items-center space-x-6 md:space-x-10 mt-4 md:mt-0">
					<div className="relative w-full max-w-xs">
						<input
							type="text"
							placeholder="Search..."
							className="bg-primaryBlack-light text-sm w-full rounded-full pl-12 pr-5 py-2.5 focus:outline-none focus:font-bold transition-transform duration-300 ease-in-out focus:scale-105 focus:ring-2 focus:ring-primaryBlack-default focus:bg-primaryWhite-default focus:text-primaryBlack-default"
						/>
						<span className="absolute inset-y-0 left-4 flex items-center text-primaryWhite-default transition-colors duration-300">
							<i className="bi bi-search"></i>
						</span>
					</div>

					<Link
						to="/publish"
						className=" transition-all duration-400 ease-in-out overflow-hidden transform transition-transform hover:scale-150 hover:text-primaryYellow-default"
					>
						<i className="bi bi-cloud-upload-fill mr-4 w-14 h-auto"></i>{' '}
					</Link>

					<div className="relative">
						{user ? (
							<>
								<button
									onClick={() => setIsDropdownOpen(!isDropdownOpen)}
									className="w-auto h-auto"
								>
									<img
										src={
											user.image
												? user.image
												: 'https://res.cloudinary.com/dy4kmqtwc/image/upload/v1736026088/Critics%20Eye/gtdrnbhbsebjqt3vqnha.jpg'
										}
										alt="User Profile"
										className="w-20 h-14 rounded-full object-cover border border-primaryBlack-light transition-all duration-300 ease-in-out transform hover:scale-125 hover:border-primaryYellow-default"
									/>
								</button>
								<div
									className={`absolute left-1/2 dark:bg-primaryBlack-default transform -translate-x-1/2 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out ${
										isDropdownOpen
											? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
											: 'opacity-0 scale-95 translate-y-2 pointer-events-none'
									}`}
								>
									<ul className="py-2">
										<li className="px-4 py-2 w-full dark:bg-primaryBlack-default dark:text-primaryWhite-default dark:hover:text-primaryYellow-default dark:hover:bg-primaryBlack-light cursor-pointer block">
											<Link to="/profile">Profile</Link>
										</li>
										<li className="w-full">
											<Form method="post" action="/logout" className="w-full">
												<button
													type="submit"
													className="w-full text-left px-4 py-2 dark:bg-primaryBlack-default dark:text-primaryWhite-default dark:hover:text-primaryYellow-default dark:hover:bg-primaryBlack-light cursor-pointer block"
												>
													<i className="bi bi-box-arrow-right"></i>
												</button>
											</Form>
										</li>
									</ul>
								</div>
							</>
						) : (
							<span className="font-medium text-lg">Not Logged</span>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}

export default MainHeader
