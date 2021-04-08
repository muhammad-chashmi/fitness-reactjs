import React, { Component } from 'react'
import Wrapper from '../Wrapper/Wrapper'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SlideDrawer from '../../components/Navigation/SlideDrawer/SlideDrawer'
import { connect } from 'react-redux';

class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showSlideDrawer: false
        }
    }
    slideDrawerClosedHandler = () => {
        this.setState({ showSlideDrawer: false })
    }
    drawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSlideDrawer: !prevState.showSlideDrawer }
        });
    }
    render() {
        return (
            <Wrapper>
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.drawerToggleHandler} />
                <SlideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSlideDrawer}
                    closed={this.slideDrawerClosedHandler} />
                <main className={classes.mt}>
                    {this.props.children}
                </main>
            </Wrapper>
        )
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
}


export default connect(mapStateToProps)(Layout);