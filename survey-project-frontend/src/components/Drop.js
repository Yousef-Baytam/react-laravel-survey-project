import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

export default function Drop(props) {
    const currentUser = useSelector((state) => state.user)

    const [options, setOptions] = useState([])
    const [optionText, setOptionText] = useState('')

    const handleDropDown = () => {
        return (
            options.map((i) => (<option key={i.id} value={i.value} id={i.id}>{i.value}</option>))
        )
    }

    const createValue = async (id, value) => {
        console.log(id, value)
        let data = new FormData()
        data.append('value', value ?? '')
        try {
            let res = await axios({
                url: `http://127.0.0.1:8000/api/v1/admin/values/new/${ id }`,
                method: "POST",
                headers: {
                    Authorization: `bearer ${ localStorage.getItem('token') }`
                },
                data: data,
            })
            console.log(res)
            setOptions([...options, { 'value': optionText, 'id': res.data.value.id }])
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <label htmlFor={props.question}>{props.question}</label>
            {currentUser.user.payload.user_type == 'admin' && props.admin && props.admin(props.num)}
            <br />
            <input style={{ width: '20%', }} onChange={(e) => setOptionText(e.target.value)} value={optionText}></input>
            <button onClick={() => { createValue(props.num, optionText); }}>Add option</button><br />
            <select id={props.question}>
                {handleDropDown()}
            </select>
        </div>
    )
}
