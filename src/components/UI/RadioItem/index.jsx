import axios from 'axios'
import { useEffect, useState } from 'react'
import styles from './RadioItem.module.scss'

const RadioItem = ({ onChange, selectedPosition }) => {
	const [positions, setPositions] = useState([])

	useEffect(() => {
		const fetchPositions = async () => {
			try {
				const response = await axios.get(
					'https://frontend-test-assignment-api.abz.agency/api/v1/positions',
				)
				setPositions(response.data.positions)
			} catch (error) {
				console.error('Error fetching positions:', error.message)
			}
		}

		fetchPositions()
	}, [])

	useEffect(() => {
		if (positions.length > 0 && !selectedPosition) {
			onChange(positions[0].id)
		}
	}, [positions, selectedPosition, onChange])

	return (
		<div className={styles.radioItem}>
			{positions.map(position => (
				<div key={position.id}>
					<input
						type='radio'
						id={`position-${position.id}`}
						name='position'
						value={position.id}
						checked={selectedPosition === position.id}
						onChange={() => onChange(position.id)}
					/>
					<label htmlFor={`position-${position.id}`}>{position.name}</label>
				</div>
			))}
		</div>
	)
}

export default RadioItem
