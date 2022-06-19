import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Single(props) {
    const currentUser = useSelector((state) => state.user)

    return (
        <div key={props.num}>
            <label htmlFor={props.question}>{props.question}</label>
            {currentUser.user.payload.user_type == 'admin' && props.admin && props.admin(props.num)}
            <input placeholder='Answer' id={props.question} onChange={(e) => props.handleAnswer(e.target.value, props.num)} />
        </div>
    )
}
