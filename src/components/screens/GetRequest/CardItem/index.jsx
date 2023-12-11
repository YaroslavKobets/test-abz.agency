import styles from './CardItem.module.scss'

const CardItem = ({ obj }) => {
	const { email, name, phone, photo, position } = obj
	return (
		<div className={styles.card}>
			<div className={styles.photo}>
				<img src={photo} alt='' />
			</div>
			<p title={name}>{name}</p>
			<div className={styles.info}>
				<p title={position}>{position}</p>
				<p title={email}>{email}</p>
				<p>{phone}</p>
			</div>
		</div>
	)
}

export default CardItem
