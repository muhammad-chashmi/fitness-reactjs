import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SlideDrawer.module.css'
import Wrapper from '../../../hoc/Wrapper/Wrapper'
import Backdrop from '../../UI/Backdrop/Backdrop'

const slideDrawer = (props) => {
    let attachedClasses = [classes.SlideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SlideDrawer, classes.Open];
    }
    return (
        <Wrapper>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems isAuth = {props.isAuth}/>
                </nav>
            </div>
        </Wrapper>
    )
}

export default slideDrawer



/*

import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'

 </div>
                <NavigationItem link="/checkout">پرداخت</NavigationItem>
                <NavigationItem link="/checkout">پرداخت</NavigationItem>
                <NavigationItem link="/checkout">پرداخت</NavigationItem>
                <NavigationItem link="/checkout">پرداخت</NavigationItem>

                <nav>
                </nav>
            </div>


*/