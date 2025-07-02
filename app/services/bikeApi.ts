import axios from 'axios';

import {API_BASE_URL, API_TOKEN, API_USER_ID} from "@env"

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: API_TOKEN,
  },
});

// NOTE: for this deliverable, it's better to only show the bikes we can rent, 
// since there's not a return bike feature, or a piece in the design to highlight 
// whether a bike is rented or not.
//export const fetchAllBikes = () => {
//  console.log('Getting bikes list from:', `${API_BASE_URL}/bikes/`);
//  return api.get('/bikes/');
//};

export const fetchAvailableBikes = () => {
    console.log('Available bikes from:', `${API_BASE_URL}/bikes/available/`);
    return api.get('/bikes/available/');
};

export const calculateRentAmount = (bikeId: number, userId: number, dateFrom: string, dateTo: string) => {
  userId = Number(API_USER_ID); // just for this POC, since we don't have any users CRUD feature
  return api.post(`/bikes/amount`, {
    bikeId,
    userId,
    dateFrom,
    dateTo
  });
};

export const bookBike = (bikeId: number, userId: number, dateFrom: string, dateTo: string) => {
  userId = Number(API_USER_ID); // just for this POC, since we don't have any users CRUD feature
  console.log('Renting bike:', bikeId, 'for user:', userId, 'from', dateFrom, 'to', dateTo);
  return api.post(`/bikes/rent`, {
    bikeId,
    userId,
    dateFrom,
    dateTo
  });
};

//TODO: API return a 500 error
//export const returnBike = (bikeId: string, userId: number) => {
//  userId = API_USER_ID; // just for this POC, since we don't have any users CRUD feature
//  console.log('returning bike:', bikeId, 'for user:', userId);
//  return api.post(`/bikes/return`, {
//    bikeId,
//    userId
//  });
//};

export default api; 