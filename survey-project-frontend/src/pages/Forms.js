import React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'
import { Routes, Route, useNavigate } from "react-router-dom"

export default function Forms(props) {
    const navigate = useNavigate()

    const handleAllForms = () => {
        return (
            <>
                {props.forms.map((i) =>
                    <div className={`card-container`} key={i.id} >
                        <div className={`card`}>
                            <div className='info'>
                                <div>
                                    <div className={`mark ${ i.is_open ? 'open' : 'closed' } ${ !props.answeredForms.includes(i.id) ? 'open' : 'closed' }`}></div>
                                </div>
                                <div className=''>
                                    <div className='bold'>Title: {i.name}</div>
                                    <div className='bold'>Description:</div>
                                    <div className='card-info'>{i.description}</div>
                                </div>
                            </div>
                            <div>
                                {!props.answeredForms.includes(i.id) && i.is_open && <button onClick={() => navigate(`/forms/${ i.id }`)}>Fill Now</button>}
                            </div>
                        </div>
                    </div>)
                }
            </>
        )
    }

    useEffect(() => {
        props.getAllAnsweredForms()
        props.getAllForms()
    }, [])

    return (
        <div className='container'>
            <div className='content-wrapper'>
                <div className='page-title'>List of All Forms</div>
                {handleAllForms()}
            </div>
        </div>
    )
}
