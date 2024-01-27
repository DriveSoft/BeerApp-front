import { getBeer } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Beer) => void, id?: string) => {
	if (!id) return;

	(async () => {
		try {
			const response = await getBeer(id);
			setData(response.data);
		} catch (error) {
			handle(error);
			if (error && typeof error === "object" && "code" in error && error.code === "ERR_NETWORK") {
				const randomBeerList = localStorage.getItem('randomBeerList');
				if (randomBeerList) {
					const beers = JSON.parse(randomBeerList) as Beer[];
					const beer = beers.find((beer: Beer) => beer.id === id);
					if (beer) {
						setData(beer);
						return;
					}

				}

				const beerList = localStorage.getItem('beerList');
				if (beerList) {
					const beers = JSON.parse(beerList) as Beer[];
					const beer = beers.find((beer: Beer) => beer.id === id);
					if (beer) {
						setData(beer);
						return;
					}
				}
			}
		}
	})();
};

export { fetchData };
