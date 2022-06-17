import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header(props) {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        props.setLoggedIn(false)
        navigate('/')
    }

    return (
        <div>
            <div>
                <div>
                    <Link to={'/forms'}>All Forms</Link>
                </div>
                <div>
                    <Link to={'/forms'}>Add Form</Link>
                </div>
                <div>
                    <Link to={'/forms'}>Answers</Link>
                </div>
            </div>
            <div>
                <div onClick={handleLogout}>Logout</div>
            </div>
        </div >
    )
}
