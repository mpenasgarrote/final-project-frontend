import { Product } from '~/types/interfaces'
import { ProductCard } from '../products/ProductCard'
import { Link } from '@remix-run/react'
import { useState, useEffect } from 'react'

interface TrendingMoviesProps {
	products: Product[]
}

export function TrendingMovies({ products }: TrendingMoviesProps) {
	const [currentPage, setCurrentPage] = useState(0)
	const [currentProducts, setCurrentProducts] = useState<Product[]>([])
	const [fadeInProduct, setFadeInProduct] = useState<Map<number, boolean>>(
		new Map()
	)
	const productsPerPage = 4

	const totalPages = Math.ceil(products.length / productsPerPage)

	useEffect(() => {
		const newProducts = products.slice(
			currentPage * productsPerPage,
			(currentPage + 1) * productsPerPage
		)
		setCurrentProducts(newProducts)

		const fadeMap = new Map<number, boolean>()
		newProducts.forEach((product) => {
			fadeMap.set(product.id, true)
		})
		setFadeInProduct(fadeMap)
	}, [currentPage, products])

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

	return (
		<div className="container mx-auto max-w-screen-xl px-4">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl m-4 font-bold mb-6 text-primaryBlack-default dark:text-primaryYellow-default">
					Currently Trending Movies
				</h1>

				<div className="flex items-center gap-4">
					<button
						onClick={handlePrevPage}
						disabled={currentPage === 0}
						className={`p-2 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-125 ${
							currentPage === 0
								? 'text-gray-400 cursor-not-allowed'
								: 'text-primaryYellow-light hover:text-primaryYellow-dark'
						}`}
					>
						<i className="bi bi-chevron-left"></i>
					</button>
					<button
						onClick={handleNextPage}
						disabled={currentPage === totalPages - 1}
						className={`p-2 rounded-lg  transition-all duration-200 ease-in-out transform hover:scale-125 ${
							currentPage === totalPages - 1
								? 'text-gray-400 cursor-not-allowed'
								: 'text-primaryYellow-light hover:text-primaryYellow-dark'
						}`}
					>
						<i className="bi bi-chevron-right"></i>
					</button>
				</div>
			</div>

			<hr className="border-t-2 border-primaryYellow-default" />

			<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{currentProducts.map((product) => (
					<Link
						key={product.id}
						to={`/product/details/${product.id}`}
						className={`block transition-opacity duration-500 ${
							fadeInProduct.get(product.id) ? 'opacity-100' : 'opacity-0'
						}`}
						onAnimationEnd={() => {
							setFadeInProduct((prev) => new Map(prev).set(product.id, false))
						}}
					>
						<ProductCard product={product} />
					</Link>
				))}
			</div>
		</div>
	)
}
