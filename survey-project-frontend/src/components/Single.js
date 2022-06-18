import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Single(props) {
    const currentUser = useSelector((state) => state.user)
    console.log(currentUser.user.payload.user_type)

    return (
        <div>
            <label htmlFor={props.question}>{props.question}</label>
            {currentUser.user.payload.user_type == 'admin' && props.admin(props.num)}
            <input placeholder='Answer' id={props.question} />
        </div>
    )
}
