import { useState } from 'react'
import { Review } from '~/types/interfaces'
import ReviewCard from './ReviewCard'
import AddReview from './AddReview'

interface ReviewsDisplayProps {
	reviews: Review[]
	userLogged: number
}

export function ReviewsDisplay({ reviews, userLogged }: ReviewsDisplayProps) {
	const [showForm, setShowForm] = useState(false)

	return (
		<div className="max-w-4xl mt-10 mx-auto p-10 px-20 rounded-lg dark:bg-primaryBlack-default drop-shadow-lg">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-semibold text-primaryBlack-default dark:text-primaryYellow-default">
					Reviews
				</h1>
				<button
					className="mr-4 mt-4 text-primaryBlack-default hover:font-bold hover:text-primaryYellow-light hover:scale-150 transition duration-200 ease-in-out dark:text-primaryYellow-default rounded-full hover:bg-primaryBlue-dark transition-colors"
					aria-label="Add review"
					onClick={() => setShowForm(!showForm)}
				>
					<i className="bi bi-plus text-2xl"></i>
				</button>
			</div>

			{showForm && <AddReview productId={reviews[0].product_id} />}

			<hr className="border-primaryYellow-default mb-6" />

			{reviews.map((review) => {
				return (
					<ReviewCard key={review.id} review={review} userLogged={userLogged} />
				)
			})}
		</div>
	)
}
