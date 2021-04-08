import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {!props.isAuth? (
            <NavigationItem link="/authentication">ورود</NavigationItem>

        ): (
            <NavigationItem link="/logout">خروج</NavigationItem>
        )}
        
        {!props.isAuth? (
            <NavigationItem link="/signup" exact>ثبت نام</NavigationItem>

        ): (
            <NavigationItem link="/getAllUser">کاربران</NavigationItem>
        )}

         {!props.isAuth? (
            null
        ): (
            <NavigationItem link="/createCategory">ایجاد گروه</NavigationItem>
        )}
    </ul>
)

export default navigationItems;



//        <NavigationItem link="/userDetails">جزییات</NavigationItem>
//        <NavigationItem link="/" exact>ثبت سفارش</NavigationItem>
//        <NavigationItem link="/checkout">پرداخت</NavigationItem>
