import React from 'react'

export default function List(props) {
    return props.questions.map((i) => <div key={i.num}>{props.handleQuestion(i, i.value && i.value)}</div>)
}
