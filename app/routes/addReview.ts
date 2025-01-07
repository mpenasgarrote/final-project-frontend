import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { getAuthToken, getLoggedUserId } from '~/data/auth.server'
import {
	checkIfUserHasReviewOnProduct,
	postReview,
} from '~/data/reviews.server'

export async function action({ request }: ActionFunctionArgs) {
	const authToken = await getAuthToken(request)
	const formData = await request.formData()

	const userId = (await getLoggedUserId(request)) as string
	const title = formData.get('title')
	const content = formData.get('content')
	const score = formData.get('score') as string | null
	const productId = formData.get('productId') as string | null

	if (
		typeof title !== 'string' ||
		typeof content !== 'string' ||
		typeof score !== 'string' ||
		typeof productId !== 'string'
	) {
		return {
			ReviewError: {
				message: 'Something went wrong.',
			},
			status: 400,
		}
	}

	if (authToken) {
		if (await checkIfUserHasReviewOnProduct(userId, productId, authToken)) {
			return {
				ReviewError: {
					message: `You already have a review on this product.`,
				},
				status: 400,
			}
		}

		try {
			await postReview(productId, userId, title, content, score, authToken)
			return redirect(`/product/details/${productId}`)
		} catch (error) {
			return {
				ReviewError: {
					message: 'Failed to post review.',
				},
				status: 500,
			}
		}
	}

	return null
}
