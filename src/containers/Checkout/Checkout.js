import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/' />
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    { purchaseRedirect }
                    <CheckoutSummary ingredients={this.props.ings}
                                    checkoutCanceled={this.checkoutCanceledHandler}
                                    checkoutContinued={this.checkoutContinueHandler} />

                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component={ ContactData } />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
};


export default connect(mapStateToProps)(Checkout);