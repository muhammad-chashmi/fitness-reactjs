import React, { Component } from 'react';
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'
import Wrapper from '../../../hoc/Wrapper/Wrapper'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return ( nextProps.show != this.props.show || nextProps.children != this.props.childern)
    }
    componentWillUpdate() {
        console.log('[Modal Component] will updated');
    }
    render() {
        return (
            <Wrapper>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-10)',
                        opacity: this.props.show ? '1' : '0',
                        zIndex: this.props.show ? '999' : '-100',
                    }}>
                    {this.props.children}
                </div>
            </Wrapper>
        )
    }
}
export default Modal;
