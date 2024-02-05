import { ChangeEvent, useEffect, useState } from 'react';
import { Beer } from '../../types';
import { fetchData } from './utils';
import { Avatar, Button, List, ListItemAvatar, ListItemButton, ListItemText, Pagination, TextField } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 8;

const BeerList = () => {
	const navigate = useNavigate();
	const [beerList, setBeerList] = useState<Array<Beer>>([]);
	const [filterValue, setFilterValue] = useState('');
	const [sort, setSort] = useState<"ASC" | "DESC">('ASC');
	const [page, setPage] = useState(1)

	const filteredBeerList = beerList.filter(beer => beer.name.toLowerCase().includes(filterValue.toLowerCase()));
	const sortedBeerList = sort === "ASC" ? filteredBeerList.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0) : filteredBeerList.sort((a, b) => a.name > b.name ? -1 : a.name > b.name ? 1 : 0);
	const countPage = Math.ceil(sortedBeerList.length / ITEMS_PER_PAGE);
	const currentPage = page > countPage ? countPage : page;
	const pagedBeerList = sortedBeerList.slice((currentPage-1) * ITEMS_PER_PAGE, (currentPage-1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE)	

	// eslint-disable-next-line
	useEffect(fetchData.bind(this, setBeerList), []);

	const onBeerClick = (id: string) => navigate(`/beer/${id}`);

	return (
		<article>
			<section>
				<header>
					<h1>BeerList page</h1>
				</header>
				<main>
					<div style={{ display: "flex" }}>
						<TextField 
							onChange={(e: ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.value)} 
							autoComplete="one-time-code" 
							label='Filter...' 
							variant='outlined' 
						/>
						<Button 
							variant='contained' 
							onClick={() => setSort(prev => prev === "ASC" ? "DESC" : "ASC")}
						>
							Sort {sort === "ASC" ? "↓" : "↑"}
						</Button>
					</div>
					<List>
						{pagedBeerList.map((beer) => (
							<ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
								<ListItemAvatar>
									<Avatar>
										<SportsBar />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={beer.name} secondary={beer.brewery_type} />
							</ListItemButton>
						))}
					</List>
					<Pagination count={Math.ceil(sortedBeerList.length / ITEMS_PER_PAGE)} sx={{ mb: 5 }} page={page} onChange={(_, page) => setPage(page)} />
				</main>
			</section>
		</article>
	);
};

export default BeerList;
