import React from 'react'

export default function Multiline(props) {
    return (
        <div>
            <label htmlFor={`${ props.name }`}>{props.placeholder}</label><br />
            <textarea name={props.name} id={`${ props.name }`} defaultValue={props.value} onChange={(e) => {
                props.setValue(e.target.value)
            }}>
            </textarea>
        </div>
    )
}
