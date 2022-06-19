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

    const setTheme = (e) => {
        localStorage.setItem('theme', e)
        let themes = props.themes
        console.log(themes)
        let r = document.querySelector(':root')
        if (e == 'darkblue') {
            r.style.setProperty('--main-bg-color', themes.darkblue.main)
            r.style.setProperty('--secondary-bg-color', themes.darkblue.primary)
            r.style.setProperty('--text', themes.darkblue.text)
        }
        if (e == 'lightblue') {
            r.style.setProperty('--main-bg-color', themes.lightblue.main)
            r.style.setProperty('--secondary-bg-color', themes.lightblue.primary)
            r.style.setProperty('--text', themes.lightblue.text)
        }
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
            <div className='nav-links-end'>
                <div className='theme'>Theme
                    <div className='menu'>
                        <div className='menu-box' onClick={(e) => { setTheme(e.target.innerText) }}>darkblue</div>
                        <div className='menu-box' onClick={(e) => { setTheme(e.target.innerText) }}>lightblue</div>
                    </div>
                </div>
                <div className='logout'>
                    <div onClick={handleLogout}>Logout</div>
                </div>
            </div>
        </div >
    )
}
