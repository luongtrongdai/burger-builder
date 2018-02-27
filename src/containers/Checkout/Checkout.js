import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary ingredients={this.props.ings}
                                 checkoutCanceled={this.checkoutCanceledHandler}
                                 checkoutContinued={this.checkoutContinueHandler} />

                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ ContactData } />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice
    }
};

export default connect(mapStateToProps)(Checkout);