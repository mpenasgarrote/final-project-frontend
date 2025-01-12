import axios from 'axios'
import { User } from '~/types/interfaces'

const apiUrl = process.env.API_URL

export async function getUserById(
	user_id: number,
	authToken: string
): Promise<User> {
	try {
		const response = await axios.get(`${apiUrl}/api/users/${user_id}`, {
			headers: {
				Authorization: `Bearer ${authToken}`,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			withCredentials: true,
		})

		const user: User = (await response.data.user) as User

		return user
	} catch (error) {
		console.error(error)

		throw error
	}
}

export async function deleteUserById(user_id: number, authToken: string) {
	const response = await axios.delete(`${apiUrl}/api/users/${user_id}`, {
		headers: {
			Authorization: `Bearer ${authToken}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		withCredentials: true,
	})

	console.log('Response: ', response.data)
	if (response.status === 200) {
		console.log('User Deleted Succesfully.', response.data)

		return 200
	} else {
		console.error('An error has occured when deleting a review.')

		return 400
	}
}
