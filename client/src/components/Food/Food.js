import React from 'react'
import FoodIngredient from './FoodIngredient/FoodIngredient'
import classes from './Food.module.css'
const food = (props) => {
    let transformIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <FoodIngredient key={igKey + i} type={igKey} />;
            });
        })

        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])

    if (transformIngredients.length === 0) {
        transformIngredients = <p className={classes.nullIngredients}>لطفا مواد غذایی خود را انتخاب کنید</p>
    }
    return (
        <div className="container">
            <FoodIngredient type="breadLeft" />
            {transformIngredients}
            <FoodIngredient type="breadRight" />
        </div>
    )
}

export default food;