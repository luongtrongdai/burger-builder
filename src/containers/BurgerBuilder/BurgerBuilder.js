import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreator from '../../store/actions/index';

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchasing: false
    };

  }

  componentDidMount() {
    this.props.initIngredient();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map( igKey => {
      return ingredients[igKey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);


    return sum > 0;
  }
  
  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({
        purchasing: true
      });
    } else {
      this.props.onSetRedirectPath('/checkout');
      this.props.history.push('/auth')
    }
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    })
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    
    if (this.props.ings) {
      orderSummary =  <OrderSummary 
      ingredients={ this.props.ings }
      purchaseCanceled={ this.purchaseCancelHandler }
      purchaseContinued={ this.purchaseContinueHandler }
      price={ this.props.totalPrice }
        />;
      burger = (
        <Aux>
          <Burger ingredients={ this.props.ings } />
          <BuildControls ingredientAdded={ this.props.onIngredientAdded }
                         ingredientRemoved={ this.props.onIngredientRemoved }
                         disabled={disabledInfo}
                         purchasable={ this.updatePurchaseState(this.props.ings) }
                         ordered= { this.purchaseHandler }
                         isAuth={ this.props.isAuth }
                         price={ this.props.totalPrice} />

        </Aux>
      )
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing}
               modalClosed={ this.purchaseCancelHandler } >
          {orderSummary}
        </Modal>
        { burger }
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token != null
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (type) => dispatch(actionCreator.addIngredient(type)),
    onIngredientRemoved: (type) => dispatch(actionCreator.removeIngredient(type)),
    initIngredient: () => dispatch(actionCreator.initIngredients()),
    onInitPurchase: () => dispatch(actionCreator.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(actionCreator.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
