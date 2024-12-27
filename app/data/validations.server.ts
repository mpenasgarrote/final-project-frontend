import { ValidationErrors as ErrorsInterface } from '~/types/interfaces'

type ValidationErrors = Record<string, string>

function isValidEmail(value: string): boolean {
	return value.trim().includes('@')
}

function isValidPassword(value: string): boolean {
	return value.trim().length >= 7
}

interface CredentialsInput {
	name?:string
	username?:string
	email: string
	password: string
	image?:string
}

export function validateCredentials(
	input: CredentialsInput
): ErrorsInterface | undefined {
	const validationErrors: ValidationErrors = {};

	// Validación de 'name'
	if (!input.name || !isValidName(input.name)) {
		validationErrors.name = input.name
			? 'Invalid name format.'
			: 'Name is required.';
	}

	// Validación de 'username'
	if (!input.username || !isValidUsername(input.username)) {
		validationErrors.username = input.username
			? 'Invalid username format.'
			: 'Username is required.';
	}

	// Validación de 'email'
	if (!input.email || !isValidEmail(input.email)) {
		validationErrors.email = input.email
			? 'Invalid email address.'
			: 'Email is required.';
	}

	// Validación de 'password'
	if (!input.password || !isValidPassword(input.password)) {
		validationErrors.password = input.password
			? 'Invalid password. Must be at least 7 characters long.'
			: 'Password is required.';
	}

	// Validación de 'image'
	if (!input.image || !isValidImage(input.image)) {
		validationErrors.image = input.image
			? 'Invalid image format.'
			: 'Image is required.';
	}

	// Lanza el error si hay fallos en la validación
	if (Object.keys(validationErrors).length > 0) {
		return validationErrors;
	}
}