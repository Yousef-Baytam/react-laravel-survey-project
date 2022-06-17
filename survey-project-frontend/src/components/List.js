import React from 'react'

export default function List(props) {
    return props.questions.map((i) => <div key={i.question}>{props.handleQuestion(i, i.value && i.value)}</div>)
}
