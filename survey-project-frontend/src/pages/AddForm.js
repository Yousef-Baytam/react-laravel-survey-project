import React, { useState } from 'react'
import Input from '../components/Input'
import List from '../components/List'
import Multiline from '../components/Multiline'

export default function AddForm() {

    const [formName, setFormName] = useState('')
    const [formDescription, setFormDescription] = useState('')
    const [questions, setQuestions] = useState([{
        'type': 'Drop down',
        'question': 'how dumb are you?'
    }])

    const handleQuestion = () => {
        for (let i of questions) {
            if (i.type == 'Drop Down')
                return <Drop />
            if (i.type == 'Signle Line')
                return <Single />
            if (i.type == 'MCQ')
                return <Radio />
            if (i.type == 'MCQ')
                return <Radio />
        }
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
