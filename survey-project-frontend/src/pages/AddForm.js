import React, { useState } from 'react'
import Input from '../components/Input'
import Multiline from '../components/Multiline'

export default function AddForm() {
    const [formName, setFormName] = useState('')
    const [formDescription, setFormDescription] = useState('')
    return (
        <div>
            <div>
                <Input type={'text'} name={'formName'} placeholder={'Form Title'} value={formName} setValue={setFormName} />
            </div>
            <div>
                <Multiline name={'formName'} placeholder={'Form Title'} value={formDescription} setValue={setFormDescription} />
            </div>
        </div>

    )
}
