import { getRandomBeerList } from '../../api';
import { Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void) => {
  (async () => {
    try {
      const { data } = await getRandomBeerList(30);
      const checkableBeer = data.map(beer => ({...beer, checked: false}))
      setData(checkableBeer);
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData };
