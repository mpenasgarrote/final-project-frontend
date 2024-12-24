import { ValidationErrors as ErrorsInterface } from '~/types/interfaces'

type ValidationErrors = Record<string, string>

function isValidEmail(value: string): boolean {
	return value.trim().includes('@')
}

function isValidPassword(value: string): boolean {
	return value.trim().length >= 7
}

interface CredentialsInput {
	email: string
	password: string
}

export function validateCredentials(
	input: CredentialsInput
): ErrorsInterface | undefined {
	const validationErrors: ValidationErrors = {}

	// Validacions individuals
	if (!isValidEmail(input.email)) {
		validationErrors.email = 'Invalid email address.'
	}

	/*if (!isValidPassword(input.password)) {
		validationErrors.password =
			'Invalid password. Must be at least 7 characters long.'
	}*/

	// Llança l'error si hi ha alguna validació fallida
	if (Object.keys(validationErrors).length > 0) {
		return validationErrors
	}
}
