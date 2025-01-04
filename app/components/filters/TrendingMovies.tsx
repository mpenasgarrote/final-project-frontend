import { Product } from '~/types/interfaces'
import { ProductCard } from '../products/ProductCard'
import { Link } from '@remix-run/react'

interface TrendingMoviesProps {
	products: Product[]
}

export function TrendingMovies({ products }: TrendingMoviesProps) {
	console.log('Movies: ' + products)
	return (
		<>
			<h1 className="text-3xl m-4 font-bold mb-6 text-primaryBlack-default dark:text-primaryYellow-default">
				Currently Trending Movies
			</h1>
			<hr />
			<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
				{products.map((product) => (
					<Link
						to={`/product/details/${product.id}`}
						className="block"
						key={product.id}
					>
						<ProductCard product={product} />
					</Link>
				))}
			</div>
		</>
	)
}
