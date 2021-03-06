import React, { useEffect, useState } from 'react'
import Drop from '../components/Drop'
import Input from '../components/Input'
import List from '../components/List'
import Multiline from '../components/Multiline'
import Radio from '../components/Radio'
import Single from '../components/Single'
import axios from 'axios'
import Checkbox from '../components/Checkbox'

export default function AddForm() {

    const [formName, setFormName] = useState('')
    const [formDescription, setFormDescription] = useState('')
    const [formCreated, setFormCreated] = useState(false)
    const [newFormId, setNewFormId] = useState(0)
    const [questions, setQuestions] = useState([])
    const [questionText, setQuestionText] = useState('')

    const createForm = async () => {
        let data = new FormData()
        data.append('name', formName ?? '')
        data.append('description', formDescription ?? '')
        try {
            let res = await axios({
                url: "http://127.0.0.1:8000/api/v1/admin/forms/new",
                method: "POST",
                headers: {
                    Authorization: `bearer ${ localStorage.getItem('token') }`
                },
                data: data,
            })
            setFormCreated(true)
            setNewFormId(res.data.survey.id)
        }
        catch (e) {
            console.log(e);
        }
    }

    const createQuestion = async () => {
        let data = new FormData()
        data.append('question_type', document.querySelector('#questionType').value ?? '')
        data.append('question', questionText ?? '')
        try {
            let res = await axios({
                url: `http://127.0.0.1:8000/api/v1/admin/questions/new/${ newFormId }`,
                method: "POST",
                headers: {
                    Authorization: `bearer ${ localStorage.getItem('token') }`
                },
                data: data,
            })
            setQuestions([...questions, { 'type': document.querySelector('#questionType').value, 'num': res.data.question.id, 'question': questionText }])
        }
        catch (e) {
            console.log(e);
        }
    }

    const deleteQuestion = async (id) => {
        try {
            let res = await axios({
                url: `http://127.0.0.1:8000/api/v1/admin/questions/${ id }`,
                method: "Delete",
                headers: {
                    Authorization: `bearer ${ localStorage.getItem('token') }`
                },
            })
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleFormTitle = () => {
        if (!formCreated)
            return (<div className='form-header'>
                <div>
                    <Input type={'text'} name={'formName'} placeholder={'Form Title'} value={formName} setValue={setFormName} />
                </div>
                <div>
                    <Multiline name={'formName'} placeholder={'Form Description'} value={formDescription} setValue={setFormDescription} />
                </div>
            </div>)

        if (formCreated)
            return (
                <div className='form-header'>
                    <div className='bold form-title'>
                        {formName}
                    </div>
                    <div>
                        <span className='bold'>Description: </span><br />
                        {formDescription}
                    </div>
                </div>)
    }

    const handleFormCreated = () => {
        if (!formCreated)
            return <div><button className='create-form-btn' onClick={() => createForm()}>Create a Form</button></div>
        if (formCreated)
            return <div className='form-header'>
                <input placeholder='Question' onChange={(e) => setQuestionText(e.target.value)} />
                <select id={'questionType'} className='select-dd'>
                    <option value={'Single Line'}>Single Line</option>
                    <option value={'Drop Down'}>Drop Down</option>
                    <option value={'MCQ'}>MCQ</option>
                    <option value={'Checkbox'}>Checkbox</option>
                </select>
                <button className='create-form-btn' onClick={() => { createQuestion() }}>Add Question</button>
            </div>
    }

    const handleAdminOptions = (num) => {
        return (
            <button onClick={() => { setQuestions(questions.filter((i) => i.num != num)); deleteQuestion(num) }}>Delete</button>
        )
    }

    const handleQuestion = (i, value, num) => {
        if (i.type === 'Drop Down')
            return <Drop question={value} admin={handleAdminOptions} num={num} />
        if (i.type === 'Single Line')
            return <Single question={value} admin={handleAdminOptions} num={num} />
        if (i.type === 'MCQ')
            return <Radio question={value} admin={handleAdminOptions} num={num} />
        if (i.type === 'Checkbox')
            return <Checkbox question={value} admin={handleAdminOptions} num={num} />
    }

    return (
        <div className='container'>
            <div className='content-wrapper'>
                {handleFormTitle()}
                {handleFormCreated()}
                <div className='question-card-wrapper'>
                    <List questions={questions} setQuestions={setQuestions} handleQuestion={handleQuestion} />
                </div>
            </div>
        </div>
    )
}
