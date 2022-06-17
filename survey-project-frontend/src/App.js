import './App.css';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';

function App() {

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
      const user = await axios({
        url: "http://127.0.0.1:8000/api/me",
        method: "POST",
        headers: {
          Authorization: `Bearer ${ token }`
        },
        data: data,
      })
      if (user.data) {
        setUser(user.data)
        setLoggedIn(true)
      }
    }
    getUser()
  }, [])

  return (
    <div className="App">
      hello
    </div>
  );
}

export default App;
