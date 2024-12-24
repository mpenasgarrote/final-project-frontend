export type ValidationErrors = {
	title?: string
	amount?: string
	date?: string
}

export interface SignupInput {
	email: string
	password: string
}

export interface ShowErrors {
	title?: string
	code?: string
}
