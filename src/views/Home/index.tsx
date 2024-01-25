import { ChangeEvent, useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link, Pagination } from '@mui/material';
import styles from './Home.module.css';

const ITEMS_PER_PAGE = 8;

const Home = () => {
	const [beerList, setBeerList] = useState<Array<Beer>>([]);
	const [savedList, setSavedList] = useState<Array<Beer>>(() => getSavedListFromStorage());
	const [filterValue, setFilterValue] = useState('');
	const [sort, setSort] = useState<"ASC" | "DESC">('ASC');
	const [page, setPage] = useState(1)

	// eslint-disable-next-line
	useEffect(fetchData.bind(this, setBeerList), []);
	useEffect(() => {
		localStorage.setItem("savedList", JSON.stringify(savedList))
	}, [savedList]);

	function getSavedListFromStorage() {
		return JSON.parse(localStorage.getItem("savedList") ?? "[]") as Beer[]
	}

	const filteredBeerList = beerList.filter(beer => beer.name.toLowerCase().includes(filterValue.toLowerCase()));
	const sortedBeerList = sort === "ASC" ? filteredBeerList.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0) : filteredBeerList.sort((a, b) => a.name > b.name ? -1 : a.name > b.name ? 1 : 0);
	const countPage = Math.ceil(sortedBeerList.length / ITEMS_PER_PAGE);
	const currentPage = page > countPage ? countPage : page;
	const pagedBeerList = sortedBeerList.slice((currentPage-1) * ITEMS_PER_PAGE, (currentPage-1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE)	

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
								<div style={{display: "flex"}}>
									<TextField autoComplete="one-time-code" label='Filter...' variant='outlined' onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.value) } />
									<Button variant='contained' onClick={() => setSort(prev => prev === "ASC" ? "DESC" : "ASC")}>
										Sort {sort === "ASC" ? "↓" : "↑"}
									</Button>
								</div>
								
								<Button variant='contained' onClick={() => fetchData.bind(this, setBeerList)()}>Reload list</Button>
							</div>
							<ul className={styles.list}>
								{pagedBeerList.map((beer, index) => (
									<li key={index.toString()}>
										<Checkbox checked={beer.checked} onChange={(_, checked) => onCheckBeer(checked, beer.id)} />
										<Link component={RouterLink} to={`/beer/${beer.id}`}>
											{beer.name}
										</Link>
									</li>
								))}
							</ul>
							<Pagination count={countPage} sx={{mb: 5}} page={currentPage} onChange={(_, page) => setPage(page)} />
							<Button variant='contained' onClick={onClickSaveSelectedItems} disabled={!sortedBeerList.some(beer => beer.checked)}>Save selected items</Button>
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
