import React, { useEffect, useState } from 'react'
import Drop from '../components/Drop'
import Radio from '../components/Radio'
import Single from '../components/Single'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function FormView(props) {
    const formId = parseInt(window.location.href.slice(window.location.href.indexOf('forms/') + 6))

    const navigate = useNavigate()
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

    const handleAnswer = (ans, id) => {
        console.log('hello')
        let numb = 0
        if (answers) {
            let arr = answers
            for (let i of answers) {
                if (i.id == id) {
                    numb += 1
                    arr = arr.filter((e) => e.id != i.id)
                    arr.push({ 'id': id, 'answer': ans })
                    setAnswers(arr)
                }
            }
        }
        !numb && setAnswers([...answers, { 'id': id, 'answer': ans }])
    }

    const handleQuestionType = (i, value, num, options = null) => {
        console.log(i)
        if (i === 'Drop Down')
            return <Drop question={value} num={num} parentOptions={options} setAnswer={setAnswers} answer={answers} handleAnswer={handleAnswer} />
        if (i === 'Single Line')
            return <Single question={value} num={num} parentOptions={options} setAnswer={setAnswers} answer={answers} handleAnswer={handleAnswer} />
        if (i === 'MCQ')
            return <Radio question={value} num={num} parentOptions={options} setAnswer={setAnswers} answer={answers} handleAnswer={handleAnswer} />
    }

    const handleSubmit = async () => {
        for (let i of answers) {
            let data = new FormData()
            data.append('answer', i.answer ?? '')
            try {
                let res = await axios({
                    url: `http://127.0.0.1:8000/api/v1/user/forms/submit/${ i.id }`,
                    method: "POST",
                    headers: {
                        Authorization: `bearer ${ localStorage.getItem('token') }`
                    },
                    data: data,
                })
                console.log(res)
            }
            catch (e) {
                console.log(e);
            }
        }
    }

    useEffect(() => {
        getForm()
        props.answeredForms.includes(formId) && navigate('/forms')
    }, [])

    useEffect(() => {
        getFormQuestions()
    }, [form])

    return (
        <div className='container'>
            <div className='content-wrapper'>
                <div className='form-header'>
                    <div className='bold form-title'>
                        <div>
                            {form.name}
                        </div>
                    </div>
                    <div>
                        <span className='bold'>Description: </span><br />
                        {form.description}
                    </div>
                </div>
                {formQuestions.map((i) => handleQuestionType(i.question_types.question_type, i.question, i.id, i.values))}
                <div>
                    <button className='create-form-btn' onClick={() => { handleSubmit(); navigate('/forms') }}>Submit answers</button>
                </div>
            </div>
        </div>
    )
}
