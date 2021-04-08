import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import * as actionTypes from '../../store/actions/auth'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom'

class Auth extends Component {

    state = {
        controls: {
            email: {
                label: 'پست الکترونیک',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'پست الکترونیک'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                label: 'رمز عبور',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'رمز عبور'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
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
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    inputHandler = (event, controlName) =>{
        const updatedControls = {
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({controls: updatedControls})
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.oAuth(this.state.controls.email.value, this.state.controls.password.value)
    }
    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = formElementsArray.map(formElement => (
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
        ))
        if(this.props.loading){
            form = <Spinner />
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }
        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to="/" />
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col col-md-6 col-md-offset-3">
                        {authRedirect}
                        {errorMessage}
                        <form onSubmit={this.submitHandler}>
                            <div className="card badge-primary">
                                <div className="card-header">
                                    <strong>Login to your account</strong>
                                </div>
                                <div className="card-body">
                                    {form}
                                </div>
                                <div className="card-footer">
                                    <Button
                                      btnType="btn btn-block btn-success"
                                      >ورود</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        oAuth: (email, password) => dispatch(actionTypes.auth(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);