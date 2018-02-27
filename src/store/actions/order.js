import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';

export const setOrders = (orders) => {
    return {
        type: actionTypes.SET_ORDERS,
        orders: orders
    }
}

export const getListOrders = () => {
    return dispatch => {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(setOrders(fetchedOrders));
            })
            .catch(error => {
                console.log(error);
            });
    }
}