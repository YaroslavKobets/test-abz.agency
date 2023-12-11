import logo from '../../../assets/images/logo.svg'
import Button from '../../UI/Buttons'
import styles from './Header.module.css'
const Header = ({ scrollToSignUp, signUpBlock, usersBlock }) => {
	return (
		<header className={styles.wrapper}>
			<div className={`${styles.body} container`}>
				<div className={styles.logo}>
					<img src={logo} alt='Logo' />
				</div>
				<div className={styles.buttons}>
					<Button click={() => scrollToSignUp(usersBlock)}>Users</Button>
					<Button click={() => scrollToSignUp(signUpBlock)}>Sign up</Button>
				</div>
			</div>
		</header>
	)
}

export default Header
