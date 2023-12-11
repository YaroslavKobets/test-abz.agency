import styles from './CardItem.module.scss'

const formatPhoneNumber = phoneNumber => {
	const cleaned = ('' + phoneNumber).replace(/\D/g, '')

	const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/)
	if (match) {
		return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]} ${match[5]}`
	}

	return phoneNumber
}

const CardItem = ({ obj }) => {
	const { email, name, phone, photo, position } = obj
	const formattedPhone = formatPhoneNumber(phone)

	return (
		<div className={styles.card}>
			<div className={styles.photo}>
				<img src={photo} alt='' />
			</div>
			<p title={name}>{name}</p>
			<div className={styles.info}>
				<p title={position}>{position}</p>
				<p title={email}>{email}</p>
				<p>{formattedPhone}</p>
			</div>
		</div>
	)
}

export default CardItem
