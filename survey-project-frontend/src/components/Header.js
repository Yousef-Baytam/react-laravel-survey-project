import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function Header(props) {
    const currentUser = useSelector((state) => state.user)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        props.setLoggedIn(false)
        navigate('/')
    }

    let user
    try {
        user = currentUser.user.payload.user_type
    } catch (e) {
        console.log(e)
    }

    return (
        <div className={window.location.href == 'http://localhost:3000/' || window.location.href == 'http://localhost:3000/register' ? 'd-none nav' : 'nav'} >
            <div className='nav-links'>
                <div>
                    <Link to={'/forms'}>All Forms</Link>
                </div>
                <div className={user && user == 'admin' ? '' : 'd-none'}>
                    <Link to={'/forms/new'}>Add Form</Link>
                </div>
            </div>
            <div className='logout'>
                <div onClick={handleLogout}>Logout</div>
            </div>
        </div >
    )
}
