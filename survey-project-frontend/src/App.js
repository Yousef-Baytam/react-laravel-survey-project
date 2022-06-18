import './App.css'
import { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import axios from 'axios'
import LogIn from "./pages/LogIn"
import Register from './pages/Register'
import Forms from './pages/Forms'
import Header from './components/Header'
import AddForm from './pages/AddForm'
import { useSelector, useDispatch } from 'react-redux'
import { storeUser, currentUser } from './features/userSlice'
import FormView from './pages/FormView'

function App() {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)

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
        dispatch(storeUser(res.data))
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    if (!loggedIn)
      navigate('/')
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      navigate('/forms')
      console.log(currentUser)
    }
  }, [loggedIn])

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
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
          <Route
            path="/forms/:id"
            element={<FormView />}
          ></Route>
          <Route
            path="/forms/new"
            element={<AddForm />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
