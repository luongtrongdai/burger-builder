import * as actionTypes from '../actions/actionTypes';


const intialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(newOrder),
                purchased: true
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        default:
            return state;
    }
}

export default reducer;