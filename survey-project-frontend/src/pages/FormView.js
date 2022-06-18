import React, { useEffect, useState } from 'react'

export default function FormView(props) {
    const formId = parseInt(window.location.href.slice(window.location.href.indexOf('forms/') + 6))

    const [form, setForm] = useState({})
    const [formQuestions, setFormQuestions] = useState([])
    const [answers, setAnswers] = useState([])

    const getForm = () => {
        for (let i of props.forms)
            i.id === formId && setForm(i)
    }

    const getFormQuestions = () => {
        if (!form.id)
            return
        let arr = []
        for (let i of form.questions)
            for (let j of props.questions)
                i.id == j.id && arr.push(j)
        setFormQuestions(arr)
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
