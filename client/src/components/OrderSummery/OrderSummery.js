import React, { Component } from 'react';
import Wrapper from '../../hoc/Wrapper/Wrapper'
import classes from './OrderSummery.module.css'
import Button from '../UI/Button/Button'

class OrderSummery extends Component {
    componentWillUpdate(){
        console.log('[Order Summery] Will Updated')
    }
    render() {
        const ingredientsSummery = Object.keys(this.props.ingredients)
            .map(igKey => {
                return <li key={igKey}><span>{igKey}</span>: {this.props.ingredients[igKey]}</li>
            })
        return (
            <Wrapper>
                <div className={classes.orderMain}>
                    <h4>اقلام سفارشی شما</h4>
                    <p>ساندویچی که شما سفارش داده اید شامل موارد زیر است:</p>
                    <ul>
                        {ingredientsSummery}
                    </ul>
                    <hr />
                    <p>جهت ادامه یکی از دکمه های زیر را انتخاب کنید:</p>
                    <Button btnType="btn-success" clicked={this.props.purchaseCheckout}>پرداخت نهایی</Button>
                    <Button btnType="btn-warning pull-left" clicked={this.props.purchaseContinue}>ادامه خرید</Button>
                </div>
            </Wrapper>
        )
    }
}

export default OrderSummery