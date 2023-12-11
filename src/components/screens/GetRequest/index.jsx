import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from '../../UI/Buttons'
import CardItem from './CardItem/'
import styles from './GetRequest.module.scss'

const API_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users'

const GetRequest = ({ usersBlock, updateTrigger, setUpdateGetRequest }) => {
	const [cards, setCards] = useState([])
	const [page, setPage] = useState(1)
	const [totalPage, setTotalPage] = useState(0)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)

				const { data } = await axios.get(API_URL, {
					params: {
						page,
						count: 6,
					},
				})

				setLoading(false)

				if (updateTrigger) {
					resetCards()
				} else {
					setCards(prevCards => [...prevCards, ...data.users])
				}

				setTotalPage(data.total_pages)
			} catch (error) {
				console.error(error)
			}
		}

		fetchData()
	}, [page, updateTrigger, setUpdateGetRequest])

	const resetCards = () => {
		setCards([])
		setPage(1)
		setUpdateGetRequest(false)
	}

	const showMore = () => setPage(prevPage => prevPage + 1)

	return (
		<section className={styles.getRequest} ref={usersBlock}>
			<h2>Working with GET request</h2>
			<div className={styles.cards}>
				{cards
					.sort((a, b) => b.registration_timestamp - a.registration_timestamp)
					.map(obj => (
						<CardItem obj={obj} key={obj.id} />
					))}
			</div>
			{loading && <div className={styles.loading}></div>}
			{page < totalPage && <Button click={showMore}>Show more</Button>}
		</section>
	)
}

export default GetRequest
