import { Product } from '~/types/interfaces'
import { genreColors, getScoreColor } from '~/types/utils'

export function ProductCard({ product }: { product: Product }) {
	return (
		<div
			key={product.id}
			className="pointer bg-white dark:bg-primaryBlack-light rounded-lg shadow-lg overflow-hidden transform transition-transform transition-opacity opacity-100 hover:scale-105 w-64 mx-auto flex flex-col h-full"
		>
			<img
				src={product.image}
				alt={product.title}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4 flex flex-col flex-grow">
				<div className="flex items-center gap-6 justify-between">
					<h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
						{product.title}
					</h2>
					<div>
						<p className="bg-gray-600 rounded-md px-2 py-1 text-xs italic text-white">
							{product.type ? product.type.name : ''}
						</p>
					</div>
				</div>
				<hr className="my-2" />
				<div className="mt-auto flex justify-between items-center">
					<div>
						{product.type && (
							<div className="flex gap-4 items-center">
								{product.genres?.map((genre) => (
									<p
										key={genre.id}
										className={`${
											genreColors[genre.name] || 'bg-primaryBlack-light'
										} justify-self-center mt-2 rounded-md px-2 py-1 text-xs font-bold text-white`}
									>
										{genre.name}
									</p>
								))}
							</div>
						)}
					</div>

					<div
						className={`text-lg py-2 px-4  ${getScoreColor(
							product.score ?? 0
						)} text-white font-bold rounded-lg ml-auto`}
					>
						<span>{product.score}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
