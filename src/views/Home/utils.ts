import { getRandomBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void) => {
	(async () => {
		try {
			const { data } = await getRandomBeerList(30);
			const checkableBeer = data.map(beer => ({ ...beer, checked: false }))
			setData(checkableBeer);
			localStorage.setItem('randomBeerList', JSON.stringify(checkableBeer));
		} catch (error) {			
			handle(error);
			if (error && typeof error === "object" && "code" in error && error.code === "ERR_NETWORK") {
				const randomBeerList = localStorage.getItem('randomBeerList');
				if (randomBeerList) {
					setData(JSON.parse(randomBeerList));
				}
			}
		}
	})();
};

export { fetchData };
