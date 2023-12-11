import { useRef, useState } from 'react'
import './assets/styles/globals.scss'
import Header from './components/layout/Header/Header'
import GetRequest from './components/screens/GetRequest'
import Intro from './components/screens/Intro'
import PostRequest from './components/screens/PostRequest'
function App() {
	const signUpBlock = useRef()
	const usersBlock = useRef()
	const [updateGetRequest, setUpdateGetRequest] = useState(false)

	const scrollToSignUp = ref =>
		ref.current.scrollIntoView({ behavior: 'smooth' })

	const handlePostRequestSuccess = () => {
		setUpdateGetRequest(prev => !prev)
	}

	return (
		<div className='wrapper'>
			<Header
				scrollToSignUp={scrollToSignUp}
				signUpBlock={signUpBlock}
				usersBlock={usersBlock}
			/>
			<main className='container'>
				<Intro scrollToSignUp={scrollToSignUp} signUpBlock={signUpBlock} />
				<GetRequest
					updateTrigger={updateGetRequest}
					usersBlock={usersBlock}
					setUpdateGetRequest={setUpdateGetRequest}
				/>
				<PostRequest
					signUpBlock={signUpBlock}
					onSuccess={handlePostRequestSuccess}
				/>
			</main>
		</div>
	)
}

export default App
