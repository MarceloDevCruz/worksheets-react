// routes
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

// context
import { AuthenticationContextProvider } from './context/AuthenticationContext'

//firebase
import { onAuthStateChanged } from 'firebase/auth'

// pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Worksheets from './pages/Worksheets/Worksheets'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import CreateWorksheets from './pages/CreateWorksheets/CreateWorksheets'
import Edit from './pages/Edit/Edit'

// components
import Header from './componets/Header'
import Footer from './componets/Footer'

//hooks
import { useState, useEffect } from 'react'

//custom hook
import { Authentication } from './hooks/Authentication'


function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = Authentication()

  const loading = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loading) {
    return <p className="loading">Carregando...</p>
  }

  return (
    <div className="App">
      <AuthenticationContextProvider value={{ user }}>
        <BrowserRouter>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/worksheets/edit/:id" element={user ? <Edit /> : <Navigate to="/login" />} />
              <Route path="/worksheets" element={user ? <Worksheets /> : <Navigate to="/login" />} />
              <Route path="/createNew" element={user ? <CreateWorksheets /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthenticationContextProvider>
    </div >
  );
}

export default App;
