import { Product } from '~/types/interfaces'
import { ProductCard } from '../products/ProductCard'
import { Link } from '@remix-run/react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState } from 'react'
import { useTransition, animated } from '@react-spring/web'

interface TrendingMoviesProps {
	products: Product[]
}

export function TrendingMovies({ products }: TrendingMoviesProps) {
	const [currentPage, setCurrentPage] = useState(0)
	const productsPerPage = 4 // Número de productos por página

	const totalPages = Math.ceil(products.length / productsPerPage)

	const handleNextPage = () => {
		if (currentPage < totalPages - 1) {
			setCurrentPage(currentPage + 1)
		}
	}

	const handlePrevPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1)
		}
	}

	const currentProducts = products.slice(
		currentPage * productsPerPage,
		(currentPage + 1) * productsPerPage
	)

	// Animación de transición de los productos
	const transitions = useTransition(currentProducts, {
		from: { opacity: 0, transform: 'translateX(100%)' },
		enter: { opacity: 1, transform: 'translateX(0)' },
		leave: { opacity: 0, transform: 'translateX(-100%)' },
		config: { tension: 250, friction: 20 },
	})

	return (
		<div className="container mx-auto max-w-screen-lg px-4">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl m-4 font-bold mb-6 text-primaryBlack-default dark:text-primaryYellow-default">
					Currently Trending Movies
				</h1>

				<div className="flex items-center gap-4">
					<button
						onClick={handlePrevPage}
						disabled={currentPage === 0}
						className={`p-2 text-white rounded-lg ${
							currentPage === 0
								? 'text-primaryBlack-light'
								: 'text-primaryYellow-light'
						}`}
					>
						<i className="bi bi-chevron-left"></i>
					</button>
					<button
						onClick={handleNextPage}
						disabled={currentPage === totalPages - 1}
						className={`p-2 text-white rounded-lg ${
							currentPage === totalPages - 1
								? 'text-primaryBlack-light'
								: 'text-primaryYellow-light'
						}`}
					>
						<i className="bi bi-chevron-right"></i>
					</button>
				</div>
			</div>

			<hr />

			{/* Contenedor de productos */}
			<div className="mt-8 flex gap-6 overflow-x-auto pb-4">
				{transitions((style, product) => (
					<animated.div style={style} key={product.id}>
						<Link to={`/product/details/${product.id}`} className="block">
							<ProductCard product={product} />
						</Link>
					</animated.div>
				))}
			</div>
		</div>
	)
}
