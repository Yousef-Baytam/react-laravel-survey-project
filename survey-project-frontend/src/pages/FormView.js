import React, { useEffect, useState } from 'react'

export default function FormView(props) {
    const formId = parseInt(window.location.href.slice(window.location.href.length - 1))

    const [form, setForm] = useState({})
    const [formQuestions, setFormQuestions] = useState([])

    const getForm = () => {
        for (let i of props.forms)
            i.id === formId && setForm(i)
    }

    const getFormQuestions = () => {
        if (!form.id)
            return
        console.log('hello')
        console.log(form.questions)
        for (let i of form.questions)
            for (let j of props.questions)
                console.log(j)
        // i.id == j.id && setFormQuestions([...formQuestions, j])
    }

    useEffect(() => {
        getForm()
    }, [])

    useEffect(() => {
        getFormQuestions()
    }, [form])

    return (
        <div>FormView</div>
    )
}
