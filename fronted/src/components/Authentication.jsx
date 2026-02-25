import React, { useState  } from 'react'
import { useNavigate } from "react-router";
import { Card, Form, Button } from 'react-bootstrap'

const Authentication = () => {
  const [mode, setMode] = useState('login')
  const navigate = useNavigate()

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'))
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  // ✅ REGISTER FUNCTION
  const register = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"   // ⭐ IMPORTANT
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })

      const result = await res.json()
      console.log(result)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <Card className="shadow-sm glass-card border-0" style={{ maxWidth: 420, width: '100%' }}>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h3 className="mb-1">
                {mode === 'login' ? 'Welcome back' : 'Create account'}
              </h3>
              <p className="text-muted mb-0">
                {mode === 'login'
                  ? 'Sign in to manage your NodeTIPS workspace.'
                  : 'Join and unlock premium kits and tools.'}
              </p>
            </div>

            <Button variant="outline-primary" size="sm" onClick={toggleMode}>
              {mode === 'login' ? 'New here?' : 'Have an account?'}
            </Button>
          </div>

          {/* ✅ FORM SUBMIT HANDLE */}
          <Form className="d-flex flex-column gap-3" onSubmit={register}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
              />
            </Form.Group>

            {mode === 'signup' && (
              <Form.Group controlId="team">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter your Name"
                />
              </Form.Group>
            )}

            {/* ⭐ TYPE SUBMIT */}
            <Button variant="primary" size="lg" type="submit">
              {mode === 'login' ? 'Continue' : 'Create account'}
            </Button>

            {mode === 'login' && (
              <Button variant="link" className="text-decoration-none p-0 align-self-start">
                Forgot password?
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Authentication
