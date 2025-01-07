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
