import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../store/actions/userlist'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom'
import FilesUploadComponent from '../../components/FilesUploadComponent/FilesUploadComponent';
//import { fetchShipment } from "../actions";
//import CargoDetails from "./CargoDetails";
//import SerivcesDetails from "./ServicesDetails";
//import NameForm from "./NameForm";

class UserDetails extends React.Component {

    state = {
        profileImg : '',
        controls: {
            name: {
                label: 'نام و نام خانوادگی',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'نام و نام خانوادگی'
                },
                value:this.props.selectedCurrentUser.name,
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
                value: this.props.selectedCurrentUser.email,
                validation: {
                    required: true,
                    isEmail: true
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
                value: this.props.selectedCurrentUser.address,
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            about: {
                label: 'درباره',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'درباره'
                },
                value: this.props.selectedCurrentUser.about,
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            instagram: {
                label: 'ایستاگرام',
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'ایستاگرام'
                },
                value: this.props.selectedCurrentUser.instagram,
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            facebook: {
                label: 'فیس بوک',
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'فیس بوک'
                },
                value: this.props.selectedCurrentUser.facebook,
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            telegram: {
                label: 'تلگرام',
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'تلگرام'
                },
                value: this.props.selectedCurrentUser.telegram,
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            roleMethod: {
                label: 'کاربر',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'admin', label: 'حاکم' },
                        { value: 'teacher', label: 'مربی' },
                        { value: 'student', label: 'هنرجو' },
                    ]
                },
                value: this.props.selectedCurrentUser.role,
                validation: {},
                valid: true
            },
            planMethod: {
                label: 'پلن',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'FREE', label: 'رایگان' },
                        { value: 'MONTHLY', label: 'ماهیانه' },
                        { value: 'SIXMONTH', label: 'شش ماهه' },
                        { value: 'ANNUALY', label: 'سالیانه' },
                    ]
                },
                value: this.props.selectedCurrentUser.payPlan,
                validation: {},
                valid: true
            },
            stateMethod: {
                label: 'استان',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'تهران', label: 'تهران' },
                        { value: 'گیلان', label: 'گیلان' },
                        { value: 'آذربایجان شرقی', label: 'آذربایجان شرقی' },
                        { value: 'خوزستان', label: 'خوزستان' },
                        { value: 'فارس', label: 'فارس' },
                        { value: 'اصفهان', label: 'اصفهان' },
                        { value: 'خراسان رضوی', label: 'خراسان رضوی' },
                        { value: 'قزوین', label: 'قزوین' },
                        { value: 'سمنان', label: 'سمنان' },
                        { value: 'قم', label: 'قم' },
                        { value: 'مرکزی', label: 'مرکزی' },
                        { value: 'زنجان', label: 'زنجان' },
                        { value: 'گلستان', label: 'گلستان' },
                        { value: 'اردبیل', label: 'اردبیل' },
                        { value: 'آذربایجان غربی', label: 'آذربایجان غربی' },
                        { value: 'همدان', label: 'همدان' },
                        { value: 'کردستان', label: 'کردستان' },
                        { value: 'کرمانشاه', label: 'کرمانشاه' },
                        { value: 'لرستان', label: 'لرستان' },
                        { value: 'بوشهر', label: 'بوشهر' },
                        { value: 'کرمان', label: 'کرمان' },
                        { value: 'هرمزگان', label: 'هرمزگان' },
                        { value: 'چهارمحال و بختیاری', label: 'چهارمحال و بختیاری' },
                        { value: 'یزد', label: 'یزد' },
                        { value: 'سیستان و بلوچستان', label: 'سیستان و بلوچستان' },
                        { value: 'ایلام', label: 'ایلام' },
                        { value: 'کهگلویه و بویراحمد', label: 'کهگلویه و بویراحمد' },
                        { value: 'خراسان شمالی', label: 'خراسان شمالی' },
                        { value: 'خراسان جنوبی', label: 'خراسان جنوبی' },
                        { value: 'البرز', label: 'البرز' },
                        { value: 'مازندران', label: 'مازندران' },
                    ]
                },
                value: this.props.selectedCurrentUser.city,
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

    componentDidMount() {
        const { id } = this.props.match.params;
        console.log('id->' + JSON.stringify(this.props.match.params));
        
       // JSON.stringify(this.props.selectedUser)

    //     if (this.props.selectedUser.length === 0) {
    //         this.props.getSelectedUser({id});
    //    }
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
         console.log('test _id in props ->' + JSON.stringify(this.props.selectedCurrentUser))
          //console.log('test nameeeee ->' +  this.state.controls.name.value )
        // console.log('test nameeeee ->' +   this.state.controls.email.value) 
        // console.log('test nameeeee ->' +   this.state.controls.address.value)
        //  console.log('test nameeeee ->' +  this.state.controls.about.value)
        //   console.log('test nameeeee ->' +  this.state.controls.instagram.value)
        //    console.log('test nameeeee ->' +  this.state.controls.facebook.value) 
        //    console.log('test nameeeee ->' +   this.state.controls.telegram.value )
        //    console.log('test nameeeee ->' +  this.state.controls.roleMethod.value )
        //    console.log('test nameeeee ->' +  this.state.controls.planMethod.value)
        //     console.log('test nameeeee ->' +  this.state.controls.stateMethod.value)
        //     const {id} = JSON.stringify(this.props.selectedCurrentUser._id);

        this.props.updateSelectedUser(this.props.selectedCurrentUser._id, this.state.controls.name.value, this.state.controls.email.value, this.state.controls.address.value, this.state.controls.about.value, this.state.controls.instagram.value,this.state.controls.facebook.value, this.state.controls.telegram.value, this.state.controls.roleMethod.value, this.state.controls.planMethod.value, this.state.controls.stateMethod.value, this.state.profileImg)
    }

    onFileSelected = (event) => {
        var selectedFile = event.target.files[0];
        this.state.profileImg = event.target.files[0];
        var reader = new FileReader();
        alert('image name'+selectedFile);
        console.log('image name'+selectedFile)
      
        var imgtag = document.getElementById("myimage");
        imgtag.title = selectedFile.name;
      
        reader.onload = function(event) {
          imgtag.src = event.target.result;
        };
      
        reader.readAsDataURL(selectedFile);
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
                                <div>
                                <input type="file" onChange= {this.onFileSelected} />
                                <img id="myimage" height="200"/>

                                </div>                              
                                <Button btnType="btn-success">بروز رسانی</Button>
                            </form>
                            <div className="ui top attached header">
                             <Link to="/getAllUser">Back</Link>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedCurrentUser:state.userlist.selectedUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getSelectedUser: (id) => dispatch(actionTypes.fetchUser(id)),
        updateSelectedUser: (id, name, email, address, about, instagram,facebook, telegram, role, payPlan, city, profileImge) => dispatch(actionTypes.updateUser(id, name, email, address, about, instagram,facebook, telegram, role, payPlan, city ,profileImge))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
