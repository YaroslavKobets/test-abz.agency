import bg from '../../../assets/images/intro_bg.jpg'
import Button from '../../UI/Buttons'
import styles from './Intro.module.scss'

const Intro = ({ scrollToSignUp, signUpBlock }) => {
	return (
		<section className={styles.wrapper}>
			<img src={bg} alt='Img' />
			<div className={styles.content}>
				<h1>Test assignment for front-end developer</h1>
				<p>
					What defines a good front-end developer is one that has skilled
					knowledge of HTML, CSS, JS with a vast understanding of User design
					thinking as they'll be building web interfaces with accessibility in
					mind. They should also be excited to learn, as the world of Front-End
					Development keeps evolving.
				</p>
				<Button click={() => scrollToSignUp(signUpBlock)}>Sign up</Button>
			</div>
		</section>
	)
}

export default Intro
