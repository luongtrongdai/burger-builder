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
        this.props.onInitOrders();
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
        orders: state.order.orders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitOrders: () => dispatch(actionCreator.getListOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
