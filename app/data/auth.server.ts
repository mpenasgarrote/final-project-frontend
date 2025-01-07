import { createCookieSessionStorage } from '@remix-run/node'
import { redirect } from '@remix-run/react'
import axios from 'axios'
import { SignupInput, ShowErrors, User } from '~/types/interfaces'

const apiUrl = process.env.API_URL

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'authToken',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production' ? true : false,
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
	},
})

export async function login({ email, password }: SignupInput) {
	const response = await axios.post(
		`${apiUrl}/api/login`,
		{ email, password },
		{
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			withCredentials: true,
		}
	)

	if (response.status === 200 && response.data?.token) {
		const userId = response.data.user.id

		const authToken = response.data.token

		return await createUserSession(userId, authToken, '/home')
	} else {
		const validationErr: ShowErrors = {
			title: 'Invalid login credentials',
			code: '401',
		}

		throw validationErr
	}
}

async function createUserSession(
	user_id: string,
	authToken: string,
	redirectPath: string
) {
	const session = await sessionStorage.getSession()

	session.set('user_id', user_id)
	session.set('authToken', authToken)

	return redirect(redirectPath, {
		headers: {
			'Set-Cookie': await sessionStorage.commitSession(session),
		},
	})
}

export async function signup(
	name: string,
	username: string,
	email: string,
	password: string,
	password_confirmation: string,
	image: File | null
) {
	try {
		const response = await axios.post(
			`${apiUrl}/api/register`,
			{ name, username, email, password, password_confirmation },
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				withCredentials: true,
			}
		)

		if (response.status === 200) {
			const userId = response.data.user.id
			const authToken = response.data.token

			if (image) {
				uploadProfileImage(userId, image)
			}

			return createUserSession(userId, authToken, '/home')
		} else {
			const validationErr: ShowErrors = {
				title: 'Invalid signup credentials',
				code: '401',
			}

			throw validationErr
		}
	} catch (error) {
		return error
	}
}

async function uploadProfileImage(userId: number, image: File) {
	try {
		const formData = new FormData()
		formData.append('user_id', userId.toString())
		formData.append('image', image)

		const uploadImage = await axios.post(
			`${apiUrl}/api/uploadProfileImage`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				withCredentials: true,
			}
		)

		console.log('Image Uploaded Successfully: ' + uploadImage.data.url)
		return uploadImage.data.url
	} catch (error) {
		console.error('Error when uploading image:', error)
	}
}

export async function getAuthToken(request: Request): Promise<string | null> {
	const cookieHeader = request.headers.get('Cookie')
	if (!cookieHeader) return null

	const session = await sessionStorage.getSession(cookieHeader)

	const authToken = session.get('authToken')

	return authToken || null
}

export async function getLoggedUserId(
	request: Request
): Promise<string | null> {
	const cookieHeader = request.headers.get('Cookie')

	if (!cookieHeader) return null

	const session = await sessionStorage.getSession(cookieHeader)

	const userId = session.get('user_id')

	return userId || null
}

export async function logout(request: Request) {
	try {
		// const authToken = await getAuthToken(request)
		// // const csrfToken = await getCsrfToken(request)

		// // console.log('CSRF:' + csrfToken)

		// if (!authToken) {
		// 	throw new Error('No authentication token found.')
		// }

		// await axios.post(
		// 	`${apiUrl}/logout`,
		// 	{},
		// 	{
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Accept: 'application/json',
		// 			Authorization: `Bearer ${authToken}`,
		// 		},
		// 	}
		// )

		// const title = 'La Sociedad de la Nieve'
		// const description = 'Blablablablablablbal'
		// const type_id = 2
		// const author = 'Marc Penas Garrote'
		// const user_id = 2

		// const response = await axios.post(
		// 	`${apiUrl}/api/products`,
		// 	{ title, description, type_id, author, user_id },
		// 	{
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Accept: 'application/json',
		// 			Authorization: `Bearer ${authToken}`,
		// 		},
		// 		withCredentials: true,
		// 	}
		// )

		// console.log(response.data)

		return redirect('/login')
	} catch (error) {
		console.error('error during logout: ' + error)
		return redirect('/home')
	}
}

export async function getLoggedUser(request: Request) {
	const authToken = await getAuthToken(request)

	const response = await axios.get(apiUrl + '/api/user', {
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	})

	return response.data as User
}

// export async function getCsrfToken(): Promise<string | null> {
// 	try {
// 		// Realiza la solicitud para obtener la cookie CSRF
// 		const response = await axios.get(`${apiUrl}/sanctum/csrf-cookie`, {
// 			withCredentials: true,
// 		})

// 		// Axios debería gestionar automáticamente las cookies
// 		const csrfToken = getCookie('XSRF-TOKEN') // getCookie es una función para extraer cookies

// 		if (csrfToken) {
// 			console.log('CSRF Token from cookie: ', csrfToken)
// 			return csrfToken
// 		} else {
// 			console.error('CSRF Token not found in cookies')
// 			return null
// 		}
// 	} catch (error) {
// 		console.error('Error fetching CSRF token:', error)
// 		return null
// 	}
// }

// function getCookie(name: string): string | null {
// 	const value = `; ${document.cookie}`
// 	const parts = value.split(`; ${name}=`)
// 	if (parts.length === 2) return parts.pop()?.split(';').shift() || null
// 	return null
// }
