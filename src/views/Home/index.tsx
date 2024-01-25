import { useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';


const Home = () => {
	const [beerList, setBeerList] = useState<Array<Beer>>([]);
	const [savedList, setSavedList] = useState<Array<Beer>>([]);

	// eslint-disable-next-line
	useEffect(fetchData.bind(this, setBeerList), []);

	const onCheckBeer = (checked: boolean, id: string) => {
		const newBeerState = beerList.map(beer => (beer.id === id ? {...beer, checked: checked} : beer));
		setBeerList(newBeerState)
	}

	const onClickSaveSelectedItems = () => {
		const selectedItems = beerList.filter(beer => beer.checked);
		const selectedItemsWODuplication = selectedItems.filter(newBeer => !savedList.some(beer => beer.id === newBeer.id) )
		setSavedList([...savedList, ...selectedItemsWODuplication]);

		const uncheckedBeerList = beerList.map(beer => ({...beer, checked: false}));
		setBeerList(uncheckedBeerList);
	}

	return (
		<article>
			<section>
				<main>
					<Paper>
						<div className={styles.listContainer}>
							<div className={styles.listHeader}>
								<TextField label='Filter...' variant='outlined' />
								<Button variant='contained'>Reload list</Button>
							</div>
							<ul className={styles.list}>
								{beerList.map((beer, index) => (
									<li key={index.toString()}>
										<Checkbox checked={beer.checked} onChange={(e, checked) => onCheckBeer(checked, beer.id)} />
										<Link component={RouterLink} to={`/beer/${beer.id}`}>
											{beer.name}
										</Link>
									</li>
								))}
							</ul>
							<Button variant='contained' onClick={onClickSaveSelectedItems} disabled={!beerList.some(beer => beer.checked)}>Save selected items</Button>
						</div>
					</Paper>

					<Paper>
						<div className={styles.listContainer}>
							<div className={styles.listHeader}>
								<h3>Saved items</h3>
								<Button variant='contained' size='small' onClick={() => setSavedList([])}>
									Remove all items
								</Button>
							</div>
							<ul className={styles.list}>
								{savedList.map((beer, index) => (
									<li key={index.toString()}>
										<Checkbox />
										<Link component={RouterLink} to={`/beer/${beer.id}`}>
											{beer.name}
										</Link>
									</li>
								))}
								{!savedList.length && <p>No saved items</p>}
							</ul>
						</div>
					</Paper>
				</main>
			</section>
		</article>
	);
};

export default Home;
