import React, { Component } from 'react'
import { connect } from 'react-redux'

import Wrapper from '../../hoc/Wrapper/Wrapper'
import Food from '../../components/Food/Food'
import FoodControls from '../../components/Food/FoodControls/FoodControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/OrderSummery/OrderSummery'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as foodBuilderActions from '../../store/actions/index'

class FoodBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            loading: false,
        }
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }
    purchaseHandler = (isOpen) => {
        if (isOpen) {
            if(this.props.isAuthenticated){
                this.setState({ purchasing: true })
            }else{
                this.props.history.push('/authentication')
            }
        } else {
            this.setState({ purchasing: false })
        }
    }
    
    purchaseContinue = () => {
        alert('آیا می خواهید ادامه دهید؟')
    }
    purchaseCheckout = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo) {
            // if(disableInfo[key] <= 0){
            //     disableInfo[key] = true;
            // }
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummery = null;

        let burger = <Spinner />
        if (this.props.ings) {
            burger = (
                <Wrapper>
                    <Food ingredients={this.props.ings} />
                    <FoodControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        price={this.props.price}
                        ordered={() => this.purchaseHandler(true)}
                        isAuth = {this.props.isAuthenticated}
                        purchasable={this.updatePurchaseState(this.props.ings)} />
                </Wrapper>
            )
            orderSummery = <OrderSummery
                purchaseContinue={this.purchaseContinue}
                purchaseCheckout={this.purchaseCheckout}
                ingredients={this.props.ings} />;
        }
        if (this.state.loading) {
            orderSummery = <Spinner />
        }

        return (
            <Wrapper>
                <Modal show={this.state.purchasing} modalClosed={() => this.purchaseHandler(false)}>
                    {orderSummery}
                </Modal>
                {burger}
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.foodBuilder.ingredients,
        price: state.foodBuilder.totalPrice,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(foodBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(foodBuilderActions.removeIngredient(ingName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FoodBuilder, axios));