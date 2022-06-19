import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

export default function Radio(props) {
    const currentUser = useSelector((state) => state.user)

    const [options, setOptions] = useState([])
    const [optionText, setOptionText] = useState('')

    const handleRadio = () => {
        return (
            options.map((i) => (<div className='radio'>
                <input style={{ width: '2em' }} type={'radio'} name={props.num} id={i.id} key={i.id} value={i.value} onChange={(e) => props.handleAnswer(e.target.value, props.num)} />
                <label htmlFor={i.id} key={`1${ i.id }`}>{i.value}</label>
                <br />
            </div>))
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
                <div className='admin-tools'><input style={{ width: '20%', }} className='dd-options' onChange={(e) => setOptionText(e.target.value)} value={optionText}></input>
                    <button onClick={() => { createValue(props.num, optionText); }}>Add option</button><br /></div>
            )
    }

    return (
        <div key={props.num} className='card-container cc-question'>
            <div className='question'>
                <div className='question-label'>
                    <label htmlFor={props.question} >{props.question}</label>
                </div>
                {currentUser.user.payload.user_type == 'admin' && props.admin && props.admin(props.num)}
                <br />
                {adminTools()}
                <div className='question-card-wrapper'>
                    {handleRadio()}
                </div>
            </div>
        </div>
    )
}
