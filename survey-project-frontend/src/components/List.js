import React from 'react'
import { useSelector } from 'react-redux'
import { storeUser, currentUser } from '../features/userSlice'

export default function List(props) {
    const currentUser = useSelector((state) => state.user)
    return props.questions.map((i) => <div key={i.num} className='question-card-wrapper'>{props.handleQuestion(i, i.question && i.question, i.num)}</div>)
}
