import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Single(props) {
    const currentUser = useSelector((state) => state.user)

    const handleAnswer = (ans) => {
        let numb = 0
        if (props.answer) {
            let arr = props.answer
            for (let i of props.answer) {
                if (i.id == props.num) {
                    numb += 1
                    arr = arr.filter((e) => e.id != i.id)
                    arr.push({ 'id': props.num, 'answer': ans })
                    props.setAnswer(arr)
                }
            }
        }
        !numb && props.setAnswer([...props.answer, { 'id': props.num, 'answer': ans }])
    }

    return (
        <div key={props.num}>
            <label htmlFor={props.question}>{props.question}</label>
            {currentUser.user.payload.user_type == 'admin' && props.admin && props.admin(props.num)}
            <input placeholder='Answer' id={props.question} onChange={(e) => props.handleAnswer(e.target.value, props.num)} />
        </div>
    )
}
