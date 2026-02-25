import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Products from './components/Products'
import Authentication from './components/Authentication'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container className="py-4 main-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
      </Container>
    </Router>
  )
}

export default App