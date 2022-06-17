import React, { useState } from 'react'
import Drop from '../components/Drop'
import Input from '../components/Input'
import List from '../components/List'
import Multiline from '../components/Multiline'
import Radio from '../components/Radio'
import Single from '../components/Single'

export default function AddForm() {

    const [formName, setFormName] = useState('')
    const [formDescription, setFormDescription] = useState('')
    const [questions, setQuestions] = useState([{
        'type': 'Drop Down',
        'value': 'xyz',
        'question': 'how dumb are you?'
    }, {
        'type': 'Single Line',
        'question': 'how dumb are you?1'
    }, {
        'type': 'MCQ',
        'question': 'how dumb are you?2'
    }])

    const handleQuestion = (i, value) => {
        if (i.type === 'Drop Down')
            return <Drop value={value} />
        if (i.type === 'Single Line')
            return <Single />
        if (i.type === 'MCQ')
            return <Radio />
        if (i.type === 'MCQ')
            return <Radio />
    }

    return (
        <div>
            <div>
                <Input type={'text'} name={'formName'} placeholder={'Form Title'} value={formName} setValue={setFormName} />
            </div>
            <div>
                <Multiline name={'formName'} placeholder={'Form Title'} value={formDescription} setValue={setFormDescription} />
            </div>
            <div>
                <List questions={questions} setQuestions={setQuestions} handleQuestion={handleQuestion} />
            </div>
        </div>
    )
}
