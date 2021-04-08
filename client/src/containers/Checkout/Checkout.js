import React, { Component } from 'react'
import { connect } from 'react-redux'

import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery'
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom'

class Checkout extends Component {
    checkoutFianlHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <div>
                <CheckoutSummery ingredients={this.props.ings}
                    checkoutFinal={this.checkoutFianlHandler}
                    checkoutCancel={this.checkoutCancelledHandler} />
                <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.foodBuilder.ingredients
    };
}
export default connect(mapStateToProps)(Checkout);