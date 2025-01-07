import { useFetcher } from '@remix-run/react'

// interface DeleteReviewProps {
// 	reviewId: number
// 	productId: number
// }

// export default function DeleteReview(review: DeleteReviewProps) {
// 	return (
// 		<>
// 			<form method="post" action={`/deleteReview/${review.productId}`}>
// 				<button
// 					type="submit"
// 					className="transition-all duration-400 ease-in-out overflow-hidden transform transition-transform hover:scale-150 hover:text-primaryYellow-default"
// 				>
// 					<i className="bi bi-trash mr-2 text-primaryYellow-light text-2xl h-auto"></i>
// 				</button>
// 				<input type="hidden" value={review.reviewId} name="reviewId" />

// 				<input type="hidden" value={review.productId} name="productId" />
// 			</form>
// 		</>
// 	)
// }

interface DeleteReviewProps {
	reviewId: number
	productId: number
	fetcher: ReturnType<typeof useFetcher>
}

export default function DeleteReview({
	reviewId,
	productId,
	fetcher,
}: DeleteReviewProps) {
	const isDeleting = fetcher.state === 'submitting'

	const handleDelete = () => {
		fetcher.submit(
			{ reviewId: String(reviewId) },
			{ method: 'post', action: `/deleteReview/${productId}` }
		)
	}

	return (
		<>
			<button
				onClick={handleDelete}
				className={`transition-all duration-400 ease-in-out transform ${
					isDeleting
						? 'cursor-not-allowed'
						: 'hover:scale-150 hover:text-primaryYellow-default'
				}`}
				disabled={isDeleting}
			>
				{isDeleting ? (
					<i className="bi bi-slash-circle text-errorColor-default mr-2 text-2xl h-auto"></i>
				) : (
					<i className="bi bi-trash mr-2 text-primaryYellow-light text-2xl h-auto"></i>
				)}
			</button>
		</>
	)
}
