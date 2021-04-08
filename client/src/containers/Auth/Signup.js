import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import * as actionTypes from '../../store/actions/signup'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom'

class Signup extends Component {

    state = {
        controls: {
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
                },
                valid: false,
                touched: false
            },
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
            },
            passwordConfirm: {
                label: 'تکرار رمز عبور',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder:  'تکرار رمز عبور'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                label: 'کاربر',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'admin', label: 'حاکم' },
                        { value: 'teacher', label: 'مربی' },
                        { value: 'student', label: 'هنرجو' },
                    ]
                },
                value: 'student',
                validation: {},
                valid: true
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
        this.props.goSignUp(this.state.controls.name.value,this.state.controls.email.value, this.state.controls.password.value,this.state.controls.passwordConfirm.value,this.state.controls.deliveryMethod.value)
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
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-offset-3">
                            {authRedirect}
                            {errorMessage}
                            <form onSubmit={this.submitHandler}>
                                {form}
                                <Button btnType="btn-success">ورود</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        loading: state.signup.loading ,
        error: state.signup.error,
        isAuthenticated: state.signup.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        goSignUp: (name,email, password, passwordConfirm, role) => dispatch(actionTypes.signUp(name, email, password, passwordConfirm, role))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);