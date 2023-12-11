import axios from 'axios'
import { useEffect, useState } from 'react'
import Button from '../../UI/Buttons'
import CardItem from './CardItem/'
import styles from './GetRequest.module.scss'

const GetRequest = ({ usersBlock, updateTrigger }) => {
	const [cards, setCards] = useState([])
	const [page, setPage] = useState(1)
	const [totalPage, setTotalPage] = useState(0)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true)
				const response = await axios.get(
					`https://frontend-test-assignment-api.abz.agency/api/v1/users`,
					{
						params: {
							page: page,
							count: 6,
						},
					},
				)

				setLoading(false)
				if (updateTrigger) {
					setCards(response.data.users)
					setPage(1)
				} else {
					setCards(prevCards => [...prevCards, ...response.data.users])
				}
				setTotalPage(response.data.total_pages)
			} catch (error) {
				console.log(error)
			}
		}

		fetchData()
	}, [page, updateTrigger])

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

			{page < totalPage && (
				<Button click={() => setPage(page + 1)}>Show more</Button>
			)}
		</section>
	)
}

export default GetRequest
