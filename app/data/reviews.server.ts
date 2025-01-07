import axios from 'axios'
import { Review } from '~/types/interfaces'
import { getUserById } from './users.server'

const apiUrl = process.env.API_URL

export async function checkIfUserHasReviewOnProduct(
	user_id: string | number,
	product_id: string | number,
	authToken: string
) {
	try {
		const response = await axios.get(
			`${apiUrl}/api/hasReview?user_id=${user_id}&product_id=${product_id}`,
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				withCredentials: true,
			}
		)

		if (response.status === 200) {
			return response.data.review as Review
		} else {
			return false
		}
	} catch (error) {
		return false
	}
}

export async function postReview(
	product_id: string | number,
	user_id: string | number,
	title: string,
	content: string,
	score: number | string,
	authToken: string
) {
	const response = await axios.post(
		`${apiUrl}/api/reviews`,
		{ user_id, title, content, score, product_id },
		{
			headers: {
				Authorization: `Bearer ${authToken}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			withCredentials: true,
		}
	)

	if (response.status === 200) {
		console.log('Review Added.', response.data)
	} else {
		console.error('An error has occured when adding a review.')
	}
}

export async function getReviewsFromProduct(
	product_id: string,
	authToken: string
): Promise<Review[]> {
	try {
		const response = await axios.get(
			`${apiUrl}/api/reviews?product_id=${product_id}`,
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				withCredentials: true,
			}
		)

		const reviews: Review[] = (await response.data.reviews) as Review[]

		await Promise.all(
			reviews.map(async (review) => {
				review.user = await getUserById(review.user_id, authToken)
			})
		)

		return reviews
	} catch (error) {
		console.log(error)

		throw error
	}
}
