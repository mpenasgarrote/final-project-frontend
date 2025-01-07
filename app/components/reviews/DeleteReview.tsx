export default function DeleteReview() {
	return (
		<>
			<form action="/deleteReview">
				<button
					type="submit"
					className="transition-all duration-400 ease-in-out overflow-hidden transform transition-transform hover:scale-150 hover:text-primaryYellow-default"
				>
					<i className="bi bi-trash mr-2 text-primaryYellow-light text-2xl h-auto"></i>
				</button>
			</form>
		</>
	)
}
