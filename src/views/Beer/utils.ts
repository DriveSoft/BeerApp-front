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
				const beerList = localStorage.getItem('randomBeerList');
				if (beerList) {
					const beer = JSON.parse(beerList).find((beer: Beer) => beer.id === id);
					setData(beer);
				}
			}			
		}
	})();
};

export { fetchData };
