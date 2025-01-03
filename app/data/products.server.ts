import axios from 'axios'
import { Type } from '~/types/interfaces'

const apiUrl = process.env.API_URL

export async function getTypes(authToken:string): Promise<Type[]> {
    try {
		const response = await axios.get(
			`${apiUrl}/api/product-types`,
			{
				headers: {
                    Authorization: `Bearer ${authToken}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				withCredentials: true,
			}
		)

        return response.data.Types as Type[];
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching types:', error.message);
            throw new Error('Error fetching types');
        } else {
            throw error;
        }
    }
}
