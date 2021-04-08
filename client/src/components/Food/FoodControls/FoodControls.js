import React from 'react'
import Wrapper from '../../../hoc/Wrapper/Wrapper'
import FoodControl from './FoodControl/FoodControl';
import classes from './FoodControls.module.css'

const controls = [
    { label: 'هات داگ', type: 'hotDog' },
    { label: 'پنیر', type: 'cheese' },
    { label: 'سالاد', type: 'salad' }
]

const foodControls = (props) => {
    return (
        <Wrapper>
            <div className={classes.mainBackground}>
                <p>قیمت کل :‌ <strong>{props.price} تومان</strong></p>
                {controls.map(ctrl => (
                    <FoodControl
                        key={ctrl.label}
                        label={ctrl.label}
                        added={() => props.ingredientAdded(ctrl.type)}
                        removed={() => props.ingredientRemoved(ctrl.type)}
                        disabled={props.disabled[ctrl.type]} />
                ))}
                <button className="btn btn-primary"
                    disabled={!props.purchasable}
                    onClick={props.ordered}>{props.isAuth? 'خرید' : 'جهت خرید ابتدا وارد شوید' }</button>
            </div>
        </Wrapper>
    )
}

export default foodControls;