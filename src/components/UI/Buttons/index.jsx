import styles from './Buttons.module.scss'

const Button = ({ click, children, disabled }) => {
	return (
		<button onClick={click} disabled={disabled} className={styles.button}>
			{children}
		</button>
	)
}

export default Button
