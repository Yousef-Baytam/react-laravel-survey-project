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
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [forms, setForms] = useState([])
  const [allQuestions, setAllQuestions] = useState([])
  const [answeredForms, setAnsweredForms] = useState([])

  const themes = {
    'darkblue': { 'main': '#000058', 'primary': 'black', 'text': 'white' },
    'lightblue': { 'main': 'rgb(92, 194, 253)', 'primary': 'rgb(32, 172, 253)', 'text': 'white' },
    'purple': { 'main': '#6a0dad', 'primary': 'rgb(32, 172, 253)', 'text': 'white' },
    'maroon': { 'main': '#800000', 'primary': 'rgb(32, 172, 253)', 'text': 'white' },
    'dark': { 'main': 'black', 'primary': 'rgb(32, 172, 253)', 'text': 'white' },
    'light': { 'main': 'white', 'primary': 'rgb(32, 172, 253)', 'text': 'black' }
  }

  const getAllForms = async () => {
    try {
      let res = await axios({
        url: `http://127.0.0.1:8000/api/v1/user/forms`,
        method: "Get",
        headers: {
          Authorization: `bearer ${ localStorage.getItem('token') }`
        },
      })
      setForms(res.data.surveys)
      setAllQuestions(res.data.questions)
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAllForms()
  }, [])
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

  const getAllAnsweredForms = async () => {
    try {
      let res = await axios({
        url: `http://127.0.0.1:8000/api/v1/user/forms/answered`,
        method: "Get",
        headers: {
          Authorization: `bearer ${ localStorage.getItem('token') }`
        },
      })
      console.log(res)
      setAnsweredForms(res.data.answeredForms)
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getAllAnsweredForms()
    let theme = localStorage.getItem('theme')
    let r = document.querySelector(':root')
    if (theme == 'darkblue') {
      r.style.setProperty('--main-bg-color', themes.darkblue.main)
      r.style.setProperty('--secondary-bg-color', themes.darkblue.primary)
      r.style.setProperty('--text', themes.darkblue.text)
    }
    if (theme == 'lightblue') {
      r.style.setProperty('--main-bg-color', themes.lightblue.main)
      r.style.setProperty('--secondary-bg-color', themes.lightblue.primary)
      r.style.setProperty('--text', themes.lightblue.text)
    }
    if (theme == 'purple') {
      r.style.setProperty('--main-bg-color', themes.purple.main)
      r.style.setProperty('--secondary-bg-color', themes.purple.primary)
      r.style.setProperty('--text', themes.purple.text)
    }
    if (theme == 'maroon') {
      r.style.setProperty('--main-bg-color', themes.maroon.main)
      r.style.setProperty('--secondary-bg-color', themes.maroon.primary)
      r.style.setProperty('--text', themes.maroon.text)
    }
    if (theme == 'dark') {
      r.style.setProperty('--main-bg-color', themes.dark.main)
      r.style.setProperty('--secondary-bg-color', themes.dark.primary)
      r.style.setProperty('--text', themes.dark.text)
    }
    if (theme == 'light') {
      r.style.setProperty('--main-bg-color', themes.light.main)
      r.style.setProperty('--secondary-bg-color', themes.light.primary)
      r.style.setProperty('--text', themes.light.text)
    }

  }, [])

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} themes={themes} />
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
            element={<Forms forms={forms} questions={allQuestions} answeredForms={answeredForms} setAnsweredForms={setAnsweredForms} getAllAnsweredForms={getAllAnsweredForms} getAllForms={getAllForms} />}
          ></Route>
          <Route
            path="/forms/:id"
            element={<FormView forms={forms} questions={allQuestions} answeredForms={answeredForms} />}
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
