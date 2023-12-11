import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import Button from '../../UI/Buttons'
import RadioItem from '../../UI/RadioItem'
import Successfully from '../Successfully'
import styles from './PostRequest.module.scss'

const PostRequest = ({ signUpBlock, onSuccess }) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		watch,
		reset,
	} = useForm({ mode: 'onBlur' })

	const [token, setToken] = useState('')
	const [selectedPosition, setSelectedPosition] = useState('')
	const [showSuccessfully, setShowSuccessfully] = useState(false)
	const fileName = watch('photo')

	useEffect(() => {
		const fetchToken = async () => {
			try {
				const response = await axios.get(
					'https://frontend-test-assignment-api.abz.agency/api/v1/token',
				)
				setToken(response.data.token)
			} catch (error) {
				console.error('Error fetching token:', error.message)
			}
		}

		fetchToken()
	}, [])

	const submit = async data => {
		try {
			const formData = new FormData()
			formData.append('position_id', selectedPosition)
			formData.append('name', data.name)
			formData.append('email', data.email)
			formData.append('phone', data.phone)
			formData.append('photo', data.photo[0])

			const response = await axios.post(
				'https://frontend-test-assignment-api.abz.agency/api/v1/users',
				formData,
				{
					headers: {
						Token: token,
					},
				},
			)

			if (response.data.success) {
				setShowSuccessfully(true)
				onSuccess()
				reset()
				setTimeout(() => {
					setShowSuccessfully(false)
				}, 5000)
			}
		} catch (error) {
			console.error('Error submitting data:', error.message)
		}
	}

	return showSuccessfully ? (
		<Successfully />
	) : (
		<section ref={signUpBlock}>
			<h2>Working with POST request</h2>
			<form className={styles.form} onSubmit={handleSubmit(submit)}>
				<div
					className={`${styles.inputBlock} ${errors.name && styles.errorInput}`}
				>
					<input
						type='text'
						placeholder=' '
						{...register('name', {
							required: 'This field is required.',
							minLength: {
								value: 2,
								message: 'The name must be at least 2 characters.',
							},
							maxLength: {
								value: 60,
								message: 'The name should not exceed 60 characters.',
							},
						})}
					/>
					<label>Your name</label>
					<span className={styles.errorMessage}>
						{errors.name && errors.name.message}
					</span>
				</div>

				<div
					className={`${styles.inputBlock} ${
						errors.email && styles.errorInput
					}`}
				>
					<input
						type='email'
						placeholder=' '
						{...register('email', {
							required: 'The email must be a valid email address.',
							pattern: {
								value:
									/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
								message: 'The email must be a valid email address.',
							},
						})}
					/>
					<label>Email</label>
					<span className={styles.errorMessage}>
						{errors?.email && errors.email.message}
					</span>
				</div>

				<div
					className={`${styles.inputBlock} ${
						errors.phone && styles.errorInput
					}`}
				>
					<InputMask
						type='tel'
						placeholder=' '
						mask={'+380999999999'}
						{...register('phone', {
							required: 'The phone field is required.',
							pattern: {
								value: /^\+380\d{3}\d{2}\d{2}\d{2}$/,
								message: 'The phone field is required.',
							},
						})}
					/>
					<label>Phone</label>
					<span className={styles.errorMessage}>
						{errors?.phone && errors.phone.message}
					</span>
				</div>

				<div>
					<label>Select your position</label>
					<RadioItem
						onChange={setSelectedPosition}
						selectedPosition={selectedPosition}
					/>
					<span>{errors.position && errors.position.message}</span>
				</div>

				<div
					className={`${styles.fileBlock} ${errors.photo && styles.errorInput}`}
				>
					<label htmlFor='file'>
						<input
							id='file'
							type='file'
							name='photo'
							accept='.jpg, .jpeg'
							{...register('photo', {
								required: true,
								validate: {
									fileType: value => {
										const allowedTypes = ['image/jpeg', 'image/jpg']
										const fileType = value && value[0] && value[0].type

										return (
											allowedTypes.includes(fileType) || 'Image is invalid.'
										)
									},
									maxSize: value => {
										const maxSize = 5 * 1024 * 1024 // 5MB

										return (
											value[0].size <= maxSize ||
											'The photo may not be greater than 5 Mbytes.'
										)
									},
								},
							})}
						/>
						<div>Upload</div>
						<span>
							{fileName?.length > 0 ? (
								<span>{fileName[0].name}</span>
							) : (
								`Upload your photo`
							)}
						</span>
					</label>
					<span className={styles.errorMessage}>
						{errors.photo && errors.photo.message}
					</span>
				</div>
				<Button type='submit' disabled={!isValid}>
					Sign up
				</Button>
			</form>
		</section>
	)
}

export default PostRequest
