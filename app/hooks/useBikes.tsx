import { useQuery } from 'react-query';
import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  Authorization: '2591afa4-7526-4541-b720-c0ed5a623e35',
};

const fetchBikes = async () => {
  const { data } = await axios.get(
    'https://trio-bike-rent-api.herokuapp.com/api/bikes/', // TODO: get URL from env var
    { headers }
  );

  return data;
};

const useBikes = () => useQuery('bikes', fetchBikes);

export default useBikes;
