import React from 'react'
import Input from '../components/Input'
import { useState, useEffect } from "react"
import Submit from '../components/Submit'
import axios from 'axios'

export default function LogIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div>
            <form>
                <Input type={'email'} name={'email'} placeholder={'Email'} value={email} setValue={setEmail} />
                <Input type={'password'} name={'password'} placeholder={'Password'} value={password} setValue={setPassword} />
                <Submit value={'Login'} run={login} />
            </form>
        </div>
    )
}
