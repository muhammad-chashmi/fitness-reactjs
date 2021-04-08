import React from 'react'

import burgerLogo from '../../assets/images/vellik Logo.png'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="لوگو سایت روکسو" />
    </div>
)

export default logo;