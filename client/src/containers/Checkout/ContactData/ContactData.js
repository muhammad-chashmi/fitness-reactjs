import React, { Component } from 'react';
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                label: 'نام و نام خانوادگی',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'نام و نام خانوادگی'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 10
                },
                valid: false,
                touched: false
            },
            email: {
                label: 'پست الکترونیک',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'پست الکترونیک'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address: {
                label: 'آدرس پستی',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'آدرس پستی'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                label: 'شیوه ارسال',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'pishtaz', label: 'ارسال با پست پیشتاز' },
                        { value: 'express', label: 'ارسال با پست اکسپرس' },
                    ]
                },
                value: '',
                validation: {},
                valid: true
            }

        },
        formIsValid: false,
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            //{'address': 'خیابان پاستور'}
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            order: formData
        }
        axios.post('posts', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/')
                console.log(response)
            })
            .catch(error => {
                this.setState({ loading: false })
                console.log(error)
            })
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid;
    }
    inputHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form className={classes.formOffset} onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        label={formElement.config.label}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidation={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputHandler(event, formElement.id)} />
                ))}
                <Button btnType="btn-success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>پرداخت نهایی</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className="container">
                <h5>اطلاعات خود را برای ثبت سفارش وارد کنید:</h5>
                <div className="row">
                    <div className="col-md-offset-3">
                        {form}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        ings: state.foodBuilder.ingredients,
        price: state.foodBuilder.totalPrice
    };
}
export default connect(mapStateToProps)(ContactData);