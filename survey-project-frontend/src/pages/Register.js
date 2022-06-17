import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import Submit from '../components/Submit'
import axios from 'axios'

export default function Register(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <form>
                <Input type={'text'} name={'name'} placeholder={'Name'} value={name} setValue={setName} />
                <Input type={'email'} name={'email'} placeholder={'Email'} value={email} setValue={setEmail} />
                <Input type={'password'} name={'password'} placeholder={'Password'} value={password} setValue={setPassword} />
                <Submit value={'Sign up'} run={''} />
                <Link to="/forms">About</Link>
            </form>
        </div>
    )
}
