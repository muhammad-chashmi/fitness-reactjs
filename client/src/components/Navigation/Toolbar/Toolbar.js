import React from 'react';
import Wrapper from '../../../hoc/Wrapper/Wrapper'
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SlideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => {
    return (
        <Wrapper>
            <header className={classes.Toolbar}>
                <nav className={classes.DesktopOnly}>
                    <NavigationItems isAuth = {props.isAuth} />
                </nav>
                <div className={[classes.DesktopOnly, classes.LogoContainer].join(' ')}>
                    <Logo />
                </div>
                <div className={classes.MobileOnly}>
                    <DrawerToggle clicked={props.drawerToggleClicked} />
                </div>
            </header>

        </Wrapper>
    )
}

export default toolbar