import { useState } from 'react'
import { User } from '~/types/interfaces'
import DeleteProfile from './DeleteProfile'
import { useFetcher } from '@remix-run/react'

interface ProfileModalProps {
	onClose: () => void
	user: User
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
	onClose,
	user,
}: ProfileModalProps) => {
    const fetcher = useFetcher()
	const [isEditing, setIsEditing] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
		image: user.image,
		password: '',
	})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSave = () => {
		console.log('Saved data:', formData)
		setIsEditing(false)
	}

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="dark:bg-primaryBlack-default text-primaryWhite-default rounded-lg shadow-lg w-11/12 max-w-xl p-6 relative">
				{/* Botón de cierre */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-primaryYellow-default hover:text-primaryYellow-light text-2xl"
					aria-label="Close modal"
				>
					&times;
				</button>

				{/* Encabezado: Imagen y Username */}
				<div className="flex items-center mb-6 gap-4">
					<img
						src={formData.image || '/placeholder.png'}
						alt="Profile"
						className="w-24 h-24 rounded-full border-4 border-primaryYellow-default object-cover mb-2"
					/>
					<h1 className="text-2xl font-bold">{user.username}</h1>
				</div>

				<hr className="border-2 border-primaryYellow-default mb-4" />

				{/* Contenido del modal */}
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-bold mb-1" htmlFor="name">
							Name
						</label>
						{isEditing ? (
							<input
								type="text"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								className="w-full bg-primaryBlack-light border border-primaryYellow-light text-primaryWhite-default rounded-md px-4 py-2"
							/>
						) : (
							<p className="text-lg">{user.name}</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-bold mb-1" htmlFor="email">
							Email
						</label>
						{isEditing ? (
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								className="w-full bg-primaryBlack-light border border-primaryYellow-light text-primaryWhite-default rounded-md px-4 py-2"
							/>
						) : (
							<p className="text-lg">{user.email}</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-bold mb-1" htmlFor="password">
							Password
						</label>
						{isEditing ? (
							<div className="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									id="password"
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									className="w-full bg-primaryBlack-light border border-primaryYellow-light text-primaryWhite-default rounded-md px-4 py-2"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute top-1/2 right-3 transform -translate-y-1/2 text-primaryYellow-default hover:text-primaryYellow-light"
								>
									{showPassword ? 'Hide' : 'Show'}
								</button>
							</div>
						) : (
							<p className="text-lg">********</p>
						)}
					</div>

					<div>
						<label
							className="block text-sm font-bold mb-1"
							htmlFor="accountCreated"
						>
							Account Created
						</label>
						<p id="accountCreated" className="text-lg">
							{new Date(user.created_at).toLocaleDateString()}
						</p>
					</div>
				</div>

				{/* Botones */}
				<div className="mt-6 flex justify-end gap-4">
					{isEditing ? (
						<>
							<button
								onClick={() => setIsEditing(false)}
								className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								className="px-4 py-2 bg-primaryYellow-default text-primaryBlack-default rounded-md hover:bg-primaryYellow-light transition"
							>
								Save
							</button>
						</>
					) : (
						<><button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-primaryYellow-default text-primaryBlack-default rounded-md hover:bg-primaryYellow-light transition"
                            >
                                Edit Profile
                            </button>
                            
                            <DeleteProfile fetcher={fetcher} userId={user.id} /></>
					)}
				</div>
			</div>
		</div>
	)
}
