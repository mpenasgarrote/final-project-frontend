import { Review } from '~/types/interfaces'
import { getScoreColor } from '~/types/utils'
import DeleteReview from './DeleteReview'
import { useFetcher } from '@remix-run/react'

interface ReviewCardProps {
	review: Review
	userLogged: number
	fetcher: ReturnType<typeof useFetcher>
}

export default function ReviewCard({
	review,
	userLogged,
	fetcher,
}: ReviewCardProps) {
	const isUserReviewOwner = review.user_id === userLogged

	return (
		<div
			key={review.id}
			className="bg-primaryWhite-default dark:bg-primaryBlack-light shadow-md rounded-lg p-6 border border-gray-200 dark:border-primaryBlack-default hover:shadow-lg transition-shadow duration-300 mt-8"
		>
			<div className="flex items-center mb-4 gap-4 justify-between">
				<div className="flex items-center gap-4">
					<img
						src={
							review.user?.image
								? review.user?.image
								: 'https://res.cloudinary.com/dy4kmqtwc/image/upload/v1736026088/Critics%20Eye/gtdrnbhbsebjqt3vqnha.jpg'
						}
						alt={review.user?.username}
						className="w-12 h-12 rounded-full object-cover"
					/>
					<div>
						{isUserReviewOwner && (
							<p className="text-gray-400 italic text-xs align-center">(You)</p>
						)}
						<h1 className="text-xl font-semibold text-primaryBlack-default dark:text-primaryYellow-light">
							{review.user?.username}
						</h1>
					</div>
				</div>

				{review.score !== undefined && (
					<div
						className={`text-xl py-2 px-4 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center lg:flex lg:items-center lg:justify-center ${getScoreColor(
							review.score
						)} lg:mr-0`}
					>
						<span>{review.score}</span>
					</div>
				)}
			</div>

			<hr className="border-gray-300" />

			<div className="mt-4">
				<h1 className="text-xl font-semibold text-primaryBlack-default dark:text-primaryWhite-default">
					{review.title}
				</h1>
				<p className="text-gray-600 dark:text-gray-300">{review.content}</p>
			</div>

			{isUserReviewOwner && (
				<div className="flex justify-end mt-4">
					<DeleteReview
						reviewId={review.id}
						productId={review.product_id}
						fetcher={fetcher}
					/>
				</div>
			)}
		</div>
	)
}
