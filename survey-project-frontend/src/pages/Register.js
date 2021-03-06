import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Submit from '../components/Submit'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { storeUser, currentUser } from '../features/userSlice'

export default function Register(props) {
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async () => {
        let data = new FormData()
        data.append('name', name)
        data.append('email', email)
        data.append('password', password)
        try {
            let res = await axios({
                url: "http://127.0.0.1:8000/api/register",
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
                    <Input type={'text'} name={'name'} placeholder={'Name'} value={name} setValue={setName} />
                    <Input type={'email'} name={'email'} placeholder={'Email'} value={email} setValue={setEmail} />
                    <Input type={'password'} name={'password'} placeholder={'Password'} value={password} setValue={setPassword} />
                    <Submit value={'Sign up'} run={handleRegister} />
                    <Link to="/" className='special'>Back</Link>
                </div>
            </form>
        </div>
    )
}
