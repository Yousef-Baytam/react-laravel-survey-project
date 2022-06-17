import React from 'react'

export default function Submit(props) {
    return (
        <div>
            <input type={'submit'} value={props.value} onClick={(e) => { e.preventDefault(); props.run() }} />
        </div>
    )
}
