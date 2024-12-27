import { createCookieSessionStorage } from '@remix-run/node'
import { redirect } from '@remix-run/react'
import axios from 'axios'
import { SignupInput, ShowErrors } from '~/types/interfaces'

const apiUrl = process.env.API_URL

const sessionStorage = createCookieSessionStorage({
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

		console.error('userId', userId)

		return await createUserSession(userId, '/home')
	} else {
		const validationErr: ShowErrors = {
			title: 'Invalid login credentials',
			code: '401',
		}

		throw validationErr
	}
}

async function createUserSession(user_id: string, redirectPath: string) {
	const session = await sessionStorage.getSession()

	session.set('user_id', user_id)

	return redirect(redirectPath, {
		headers: {
			'Set-Cookie': await sessionStorage.commitSession(session),
		},
	})
}

export async function signup(name:string, username:string, email:string, password:string, image: File) {
	const response = await axios.post(
		`${apiUrl}/api/register`,
		{ name, username, email, password },
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
		return createUserSession(userId, "/home");
	}
	else {
		const validationErr: ShowErrors = {
			title: 'Invalid signup credentials',
			code: '401',
		}

		throw validationErr
	}
  }