import successPicture from '../.../../../../assets/images/success_image.svg'
import styles from './Successfully.module.scss'

const Successfully = () => {
	return (
		<section className={styles.successBlock}>
			<h2>User successfully registered</h2>
			<img src={successPicture} alt='User successfully registered' />
		</section>
	)
}

export default Successfully
