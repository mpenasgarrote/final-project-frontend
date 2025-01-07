import { useFetcher } from '@remix-run/react'

interface ReviewLoaderProps {
	fetcher: ReturnType<typeof useFetcher>
}

interface ReviewLoaderProps {
	fetcher: ReturnType<typeof useFetcher>
}

const ReviewLoader = ({ fetcher }: ReviewLoaderProps) => {
	const isLoading = fetcher.state === 'loading'

	if (!isLoading) return null

	return (
		<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="loader border-t-4 border-b-4 border-primaryYellow-default rounded-full w-16 h-16 animate-spin"></div>
		</div>
	)
}

export default ReviewLoader
