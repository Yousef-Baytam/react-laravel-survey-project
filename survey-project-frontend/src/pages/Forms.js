import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'

export default function Forms(props) {

    const [forms, setForms] = useState([])

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
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAllForms()
    }, [])

    return (
        <div className='container'>Forms</div>
    )
}
