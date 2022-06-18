import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'
import { Routes, Route, useNavigate } from "react-router-dom"

export default function Forms(props) {
    const navigate = useNavigate()

    const [forms, setForms] = useState([])
    const [allQuestions, setAllQuestions] = useState([])

    const getAllForms = async () => {
        try {
            let res = await axios({
                url: `http://127.0.0.1:8000/api/v1/user/forms`,
                method: "Get",
                headers: {
                    Authorization: `bearer ${ localStorage.getItem('token') }`
                },
            })
            setForms(res.data.surveys)
            setAllQuestions(res.data.questions)
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllForms()
    }, [])

    const handleAllForms = () => {
        return (
            <>
                {forms.map((i) =>
                    <div className={`card-container`}>
                        <div className={`card ${ i.is_open ? 'open' : 'closed' }`}>
                            <div>Title: {i.name}</div>
                            <div>Description: {i.description}</div>
                            {i.is_open && <button onClick={() => navigate(`/forms/${ i.id }`)}>Fill Now</button>}
                        </div>
                    </div>)}
            </>
        )
    }

    return (
        <div className='container'>
            <div>List of All Forms</div>
            {handleAllForms()}
        </div>
    )
}
