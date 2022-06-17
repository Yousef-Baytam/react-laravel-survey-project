import './App.css'
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, useNavigate, Navigate, Location, useLocation } from "react-router-dom"
import axios from 'axios'
import LogIn from "./pages/LogIn"
import Register from './pages/Register'
import Forms from './pages/Forms'
import Header from './components/Header'

function App() {

  const navigate = useNavigate()
  const [forms, setForms] = useState([])
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    let token
    if (!localStorage.getItem('token'))
      return
    token = localStorage.getItem('token')
    let data = new FormData()
    async function getUser() {
      const res = await axios({
        url: "http://127.0.0.1:8000/api/me",
        method: "POST",
        headers: {
          Authorization: `Bearer ${ token }`
        },
        data: data,
      })
      if (res.data) {
        setUser(res.data)
        setLoggedIn(true)
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    if (!loggedIn)
      navigate('/')
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn)
      navigate('/forms')
  }, [loggedIn])

  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          ></Route>
          <Route
            path="/register"
            element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
          ></Route>
          <Route
            path="/forms"
            element={<Forms />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
