import React, { useEffect, useState } from 'react'
import Drop from '../components/Drop'
import Radio from '../components/Radio'
import Single from '../components/Single'

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

    const handleQuestionType = (i, value, num, options = null) => {
        console.log(i)
        if (i === 'Drop Down')
            return <Drop question={value} num={num} parentOptions={options} />
        if (i === 'Single Line')
            return <Single question={value} num={num} parentOptions={options} />
        if (i === 'MCQ')
            return <Radio question={value} num={num} parentOptions={options} />
    }

    useEffect(() => {
        getForm()
    }, [])

    useEffect(() => {
        getFormQuestions()
    }, [form])

    return (
        <div className='container'>
            <div>
                {form.name}
            </div>
            <div>
                {form.description}
            </div>
            {formQuestions.map((i) => handleQuestionType(i.question_types.question_type, i.question, i.id, i.values))}
        </div>
    )
}
