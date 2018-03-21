import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/index';

class Orders extends Component {
    state = {
        loading: true
    }
    componentDidMount() {
        this.props.onInitOrders(this.props.token, this.props.userId);
    }

    render() {
        return (
            <div>
                {this.props.orders.map(order => (
                    <Order key={order.id} ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitOrders: (token, userId) => dispatch(actionCreator.getListOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
