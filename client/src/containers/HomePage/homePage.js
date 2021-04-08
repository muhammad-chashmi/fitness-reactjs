import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actionTypes from '../../store/actions/userlist'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom'
import Wrapper from '../../hoc/Wrapper/Wrapper'
import classes from './homePage.module.css';

class homePage extends React.Component {

    render() {
            return(
                <div className = {classes.LoginComponent}>
                 <div className = {classes.herotext}>   
                  <h1>Vellik</h1>
                  <h3>مربی شما هر جا که باشید همراه شماست</h3>

              </div>
              </div>
            )          
    }
}

export default homePage;


