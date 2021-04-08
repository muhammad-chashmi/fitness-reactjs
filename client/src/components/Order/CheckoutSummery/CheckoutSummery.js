import React from 'react'
import Wrapper from '../../../hoc/Wrapper/Wrapper'
import Food from '../../Food/Food'
import Button from '../../UI/Button/Button'

const checkoutSummery = (props) => {
    return (
        <Wrapper>
            <div className='container'>
                <h3>سفارش شما به شرح زیر می باشد. امیدواریم لذت کافی را ببرید</h3>
                <div>
                    <Food ingredients={props.ingredients} />
                </div>
                <div className="text-right">
                    <Button btnType="btn-success" clicked={props.checkoutFinal}>ثبت اطلاعات</Button>
                    <Button btnType="btn-warning pull-left" clicked={props.checkoutCancel}>انصراف</Button>
                </div>
            </div>

        </Wrapper>
    )
}

export default checkoutSummery;