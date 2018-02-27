import * as actionTypes from '../actions/actionTypes';


const intialState = {
    orders: []
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ORDERS:
            return {
                ...state,
                orders: action.orders
            };
        default:
            return state;
    }
}

export default reducer;