import React, { useEffect, useState } from 'react'
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
            setOptions([...options, { 'value': optionText, 'id': res.data.value.id }])
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (!props.parentOptions)
            return
        let arr = []
        for (let i of props.parentOptions)
            arr.push({ 'value': i.value, 'id': i.id })
        setOptions(arr)
    }, [])

    const adminTools = () => {
        if (props.admin)
            return (
                <div className='admin-tools'><input style={{ width: '20%', }} onChange={(e) => setOptionText(e.target.value)} value={optionText} className='dd-options'></input>
                    <button onClick={() => { createValue(props.num, optionText); }}>Add option</button><br /></div>
            )
    }

    return (
        <div key={props.num} className='card-container cc-question'>
            <div className='question'>
                <label htmlFor={props.question} >{props.question}</label>
                {currentUser.user.payload.user_type == 'admin' && props.admin && props.admin(props.num)}
                <br />
                {adminTools()}
                <select id={props.question} className='select-dd' onChange={(e) => props.handleAnswer(e.target.value, props.num)} defaultValue={'none'}>
                    <option value={'none'}>None</option>
                    {handleDropDown()}
                </select>
            </div>
        </div>
    )
}
