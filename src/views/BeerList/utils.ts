import { getBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void) => {
	(async () => {
		try {
			const response = await getBeerList();
			setData(response.data);
			localStorage.setItem('beerList', JSON.stringify(response.data));
		} catch (error) {
			handle(error);
			if (error && typeof error === "object" && "code" in error && error.code === "ERR_NETWORK") {
				const beerList = localStorage.getItem('beerList');
				if (beerList) {
					setData(JSON.parse(beerList));
				}
			}
		}
	})();
};

export { fetchData };
