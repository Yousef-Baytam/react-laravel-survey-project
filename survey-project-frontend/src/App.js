import './App.css'
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, useNavigate, Navigate, Location, useLocation } from "react-router-dom"
import axios from 'axios'
import LogIn from "./pages/LogIn"
import Register from './pages/Register'
import Forms from './pages/Forms'

function App() {

  let location = useLocation
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
        // window.location.href = '/forms'
      }
    }
    getUser()
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<LogIn />}
          ></Route>
          <Route
            path="/register"
            element={<Register />}
          ></Route>
          <Route
            path="/forms"
            element={<Forms />}
          ></Route>
        </Routes>
        {/* <Route path="/forms" element={<Forms />}></Route> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
