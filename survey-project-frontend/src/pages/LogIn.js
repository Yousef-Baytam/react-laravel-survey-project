import React from 'react'
import Input from '../components/Input'
import { useState, useEffect } from "react"
import Submit from '../components/Submit'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { storeUser, currentUser } from '../features/userSlice'

export default function LogIn(props) {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        let data = new FormData()
        data.append('email', email)
        data.append('password', password)
        try {
            let res = await axios({
                url: "http://127.0.0.1:8000/api/login",
                method: "POST",
                data: data,
            })
            localStorage.setItem('token', res.data.authorisation.token)
            props.setLoggedIn(true)
            dispatch(storeUser(res.data.user))
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (props.loggedIn)
            navigate('/forms')
    }, [props.loggedIn])

    return (
        <div>
            <div className='title'>
                Survey Champ
            </div>
            <form>
                <div>
                    <Input type={'email'} name={'email'} placeholder={'Email'} value={email} setValue={setEmail} />
                    <Input type={'password'} name={'password'} placeholder={'Password'} value={password} setValue={setPassword} />
                    <Submit value={'Login'} run={login} />
                    <div>Dont have an accout?<Link to="/register" className='special'>Register</Link></div>
                </div>
            </form>
        </div>
    )
}
