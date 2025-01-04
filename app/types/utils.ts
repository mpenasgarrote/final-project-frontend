export const genreColors: { [key: string]: string } = {
	Action: 'bg-red-500',
	Adventure: 'bg-yellow-800',
	Comedy: 'bg-yellow-500',
	Drama: 'bg-purple-800',
	Horror: 'bg-purple-500',
	Thriller: 'bg-gray-500',
	Fantasy: 'bg-indigo-500',
	Fiction: 'bg-pink-500',
}

export const getScoreColor = (score: number) => {
	if (score < 40) return 'bg-scoreColor-red'
	if (score < 70) return 'bg-scoreColor-yellow'
	if (score < 90) return 'bg-scoreColor-light-green'
	if (score >= 90) return 'bg-scoreColor-dark-green'
}
