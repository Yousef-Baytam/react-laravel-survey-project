import React, { useEffect, useState } from 'react'
import Drop from '../components/Drop'
import Input from '../components/Input'
import List from '../components/List'
import Multiline from '../components/Multiline'
import Radio from '../components/Radio'
import Single from '../components/Single'
import '../App.css'
import axios from 'axios'

export default function AddForm() {

    const [formName, setFormName] = useState('')
    const [formDescription, setFormDescription] = useState('')
    const [formCreated, setFormCreated] = useState(false)
    const [questions, setQuestions] = useState([])

    const createForm = async () => {
        let data = new FormData()
        data.append('name', formName ?? '')
        data.append('description', formDescription ?? '')
        try {
            let res = await axios({
                url: "http://127.0.0.1:8000/api/v1/admin/forms/new",
                method: "POST",
                headers: {
                    Authorization: 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjU1NTQxNTE3LCJleHAiOjE2NTU1NDUxMTcsIm5iZiI6MTY1NTU0MTUxNywianRpIjoidFpIOXpmdWFucTFqeXhrRyIsInN1YiI6IjIiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.sHQgoJ8CIMnpc4sq73fJg5LhZi5UVNcD4Z8O0Bz45dc'
                },
                data: data,
            })
            setFormCreated(true)
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleFormTitle = () => {
        if (!formCreated)
            return (<>
                <div>
                    <Input type={'text'} name={'formName'} placeholder={'Form Title'} value={formName} setValue={setFormName} />
                </div>
                <div>
                    <Multiline name={'formName'} placeholder={'Form Description'} value={formDescription} setValue={setFormDescription} />
                </div>
            </>)

        if (formCreated)
            return (<>
                <div>
                    {formName}
                </div>
                <div>
                    {formDescription}
                </div>
            </>)
    }

    const handleFormCreated = () => {
        if (!formCreated)
            return <div><button onClick={() => createForm()}>Create a Form</button></div>
        if (formCreated)
            return <div>
                <input placeholder='Question' />
                <select>
                    <option value={'Single Line'}>Single Line</option>
                    <option value={'Drop Down'}>Drop Down</option>
                    <option value={'MCQ'}>MCQ</option>
                </select>
                <button onClick={() => { setQuestions([...questions, { 'type': document.querySelector('select').value, 'num': questions.length }]) }}>Add Question</button>
            </div>
    }

    const handleQuestion = (i, value) => {
        if (i.type === 'Drop Down')
            return <Drop value={value} />
        if (i.type === 'Single Line')
            return <Single />
        if (i.type === 'MCQ')
            return <Radio />
    }

    return (
        <div className='container'>
            {handleFormTitle()}
            {handleFormCreated()}
            <div>
                <List questions={questions} setQuestions={setQuestions} handleQuestion={handleQuestion} />
            </div>
        </div>
    )
}
