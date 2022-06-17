import React from 'react'
import Input from '../components/Input'
import { useState, useEffect } from "react"
import Submit from '../components/Submit'
import axios from 'axios'

export default function LogIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect()
    const login = async () => {
        let data = new FormData()
        data.append('email', email)
        data.append('password', password)
        try {
            let res = await axios({
                url: "http://127.0.0.1:8000/api/login",
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: data,
            })
            localStorage.setItem('token', res.data.authorisation.token)
        }
        catch (e) {
            console.log(e);
        }
    }

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
