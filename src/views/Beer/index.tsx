import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import imgWoodHouse from './assets/house.png'
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Beer = () => {
	const { id } = useParams();
	const [beer, setBeer] = useState<IBeer>();

	// eslint-disable-next-line
	useEffect(fetchData.bind(this, setBeer, id), [id]);

	return (
		<Grid container component="main" sx={{ height: '80vh' }}>
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: `url(${imgWoodHouse})`,
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
						t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'start',
					}}
				>
					<h1>{beer?.name}</h1>
					<h2 style={{ color: '#888' }}>Brewery type: {beer?.brewery_type}</h2>
					<h2 style={{ color: '#888' }}>{beer?.city}({beer?.country})</h2>
					<div style={{ color: '#888' }}>{beer?.address_1}</div>
					<div style={{ color: '#888' }}>{beer?.address_2}</div>
					<div style={{ color: '#888' }}>{beer?.address_3}</div>
					<div style={{ color: '#888' }}>{beer?.phone ? `Tel.: ${beer.phone}` : null}</div>
					
				</Box>
			</Grid>
		</Grid>
	);
};

export default Beer;
