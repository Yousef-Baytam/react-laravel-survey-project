import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Drop(props) {
    const currentUser = useSelector((state) => state.user)

    const [options, setOptions] = useState([])

    const handleDropDown = () => {
        return (
            options.map((i) => <option key={i.id} value={i.value} id={i.id}>{i.value}</option>)
        )
    }

    return (
        <div>
            <label htmlFor={props.question}>{props.question}</label>
            {currentUser.user.payload.user_type == 'admin' && props.admin(props.num)}
            <br />
            <input style={{ width: '20%', }}></input><button>Add option</button>
            <select id={props.question}>
                {handleDropDown()}
            </select>
        </div>
    )
}
