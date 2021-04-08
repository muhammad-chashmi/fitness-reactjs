import React from 'react'
import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses = ['form-control']
    if(props.invalid && props.shouldValidation && props.touched){
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case ('input'):
            inputElement =
                <input className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement =
                <textarea className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    onChange={props.changed}>{props.value}</textarea>
            break;
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>)
            break;
        default:
            inputElement =
                <input className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />

    }
    return (
        <div className="form-group text-right">
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;