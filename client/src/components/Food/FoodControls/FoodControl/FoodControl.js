import React from 'react'

import classes from './FoodControl.module.css'

const foodControl = (props) => {
    return (
        <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
                <div className="form-group row">
                    <div className="col-sm-6">
                        <button className="btn btn-sm btn-success ml" onClick={props.added}>افزایش</button>
                        <button className="btn btn-sm btn-danger ml" onClick={props.removed} disabled={props.disabled}>کاهش</button>
                    </div>
                    <label className="col-sm-6 mt-5">{props.label}</label>
                </div>
            </div>
        </div>
    )
}

export default foodControl;