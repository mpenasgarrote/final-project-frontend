import { ValidationErrors as ErrorsInterface } from '~/types/interfaces'

type ValidationErrors = Record<string, string>

function isValidName(value: string): boolean {
	return value.trim().length >= 3
}

function isValidUsername(value: string): boolean {
	return value.trim().length >= 4
}

function isValidEmail(value: string): boolean {
	return value.trim().includes('@')
}

function isValidPassword(value: string): boolean {
	return value.trim().length >= 8
}

function isValidImage(value: string): boolean {
	const validExtensions = /\.(jpeg|jpg|webp|png)$/i
	return validExtensions.test(value.trim())
}

interface CredentialsInput {
	name?: string
	username?: string
	email: string
	password: string
	confirmPassword?: string
	image?: string
}

export function validateLoginCredentials(
	input: CredentialsInput
): ErrorsInterface | undefined {
	const validationErrors: ValidationErrors = {}

	if (!input.email || !isValidEmail(input.email)) {
		validationErrors.email = input.email
			? 'Invalid email address.'
			: 'Email is required.'
	}

	if (!input.password || !isValidPassword(input.password)) {
		validationErrors.password = input.password
			? 'Invalid password. Must be at least 7 characters long.'
			: 'Password is required.'
	}

	if (Object.keys(validationErrors).length > 0) {
		return validationErrors
	}
}

export function validateSignupCredentials(
	input: CredentialsInput
): ErrorsInterface | undefined {
	const validationErrors: ValidationErrors = {}

	if (!input.name || !isValidName(input.name)) {
		validationErrors.name = input.name
			? 'Invalid name format.'
			: 'Name is required.'
	}

	if (!input.username || !isValidUsername(input.username)) {
		validationErrors.username = input.username
			? 'Invalid username format.'
			: 'Username is required.'
	}

	if (!input.email || !isValidEmail(input.email)) {
		validationErrors.email = input.email
			? 'Invalid email address.'
			: 'Email is required.'
	}

	if (!input.password || !isValidPassword(input.password)) {
		if (!input.password) {
			validationErrors.password = 'Password is required.'
		} else if (input.password !== input.confirmPassword) {
			validationErrors.confirmPassword = 'Passwords do not match.'
		} else {
			validationErrors.password =
				'Invalid password. Must be at least 7 characters long.'
		}
	}

	if (input.image) {
		if (!isValidImage(input.image)) {
			validationErrors.image = 'Invalid image format.'
		}
	}

	if (Object.keys(validationErrors).length > 0) {
		return validationErrors
	}
}
