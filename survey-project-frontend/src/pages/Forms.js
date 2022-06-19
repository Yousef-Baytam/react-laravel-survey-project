import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'
import { Routes, Route, useNavigate } from "react-router-dom"

export default function Forms(props) {
    const navigate = useNavigate()

    const [answeredForms, setAnsweredForms] = useState([])

    const handleAllForms = () => {
        return (
            <>
                {props.forms.map((i) =>
                    <div className={`card-container`} key={i.id} >
                        <div className={`card ${ i.is_open ? 'open' : 'closed' }`}>
                            <div>Title: {i.name}</div>
                            <div>Description: {i.description}</div>
                            {i.is_open && <button onClick={() => navigate(`/forms/${ i.id }`)}>Fill Now</button>}
                        </div>
                    </div>)
                }
            </>
        )
    }

    const getAllAnsweredForms = async () => {
        try {
            let res = await axios({
                url: `http://127.0.0.1:8000/api/v1/user/forms/answered`,
                method: "Get",
                headers: {
                    Authorization: `bearer ${ localStorage.getItem('token') }`
                },
            })
            console.log(res)
            setAnsweredForms(res.data.answeredForms)
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllAnsweredForms()
    }, [])

    return (
        <div className='container'>
            <div>List of All Forms</div>
            {handleAllForms()}
        </div>
    )
}
