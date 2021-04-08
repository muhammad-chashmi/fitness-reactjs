import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../store/actions/createCategory'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom'
 
class CreateCategory extends React.Component {

    state = {
        controls: {
            title: {
                label: 'please insert event movement title',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'please insert event movement title'
                },
                value:'',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            uniqueTitle: {
                label: 'لطفا عنوان یکتایی وادر کنید',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'لطفا عنوان یکتایی وادر کنید'
                },
                value:'',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            pictureURL: {
                label: 'تصویر',
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'تصویر'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            iconURL: {
                label: 'آیکون',
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'آیکون'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            color: {
                label: 'رنگ',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'رنگ'
                },
                value:'',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            description: {
                label: 'توضیحات',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'توضیحات'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            metaKeyWord: {
                label: 'کلمات کلیدی متا',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'کلمات کلیدی متا'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            metaDescription: {
                label: 'توضیحات متا',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'توضیحات متا'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            active: {
                label: 'فعال',
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'NOACTIVE', label: 'غیر فعال' },
                        { value: 'ACTIVE', label: 'فعال' },
                    ]
                },
                value: 'فعال',
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
        this.props.createCategoryItem(this.state.controls.title.value, this.state.controls.uniqueTitle.value, this.state.controls.pictureURL.value,this.state.controls.iconURL.value, this.state.controls.color.value, this.state.controls.metaKeyWord.value, this.state.controls.metaDescription.value, (this.state.controls.active.value == 'ACTIVE' ? true:false))
 //title, uniqueTitle, pictureURL, iconURL, color, description,metaKeyWord, metaDescription,active
   
   
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
                                <Button btnType="btn-success">ایجاد دسته بندی</Button>
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

const mapDispatchToProps = dispatch => {
    return {
        createCategoryItem: (title, uniqueTitle, pictureURL, iconURL, color, description,metaKeyWord, metaDescription,active) => dispatch(actionTypes.createCategory(title, uniqueTitle, pictureURL, iconURL, color, description,metaKeyWord, metaDescription,active))
    }
}

export default connect(null, mapDispatchToProps)(CreateCategory);
