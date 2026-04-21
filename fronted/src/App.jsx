import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Products from './components/Products'
import Authentication from './components/Authentication'
import EmailOtp from './components/EmailOtp'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container className="py-4 main-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/email-otp" element={<EmailOtp />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App