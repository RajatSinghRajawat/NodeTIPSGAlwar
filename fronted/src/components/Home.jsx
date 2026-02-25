import React from 'react'
import { Row, Col, Button, Card } from 'react-bootstrap'

const Home = () => {
  return (
    <Row className="align-items-center gy-4">
      <Col md={6}>
        <h1 className="display-5 fw-bold">Welcome to NodeTIPS</h1>
        <p className="lead text-muted">
          Curated tips, tools, and starter kits to accelerate your Node.js workflow.
        </p>
        <div className="d-flex gap-3">
          <Button variant="primary" size="lg" href="/products">
            Explore Products
          </Button>
          <Button variant="outline-secondary" size="lg" href="/auth">
            Join Free
          </Button>
        </div>
      </Col>
      <Col md={6}>
        <Row xs={1} sm={2} className="g-3">
          {highlights.map((item) => (
            <Col key={item.title}>
              <Card className="h-100 shadow-sm glass-card hover-lift border-0">
                <Card.Body>
                  <div className="small text-primary fw-semibold mb-2">{item.tag}</div>
                  <Card.Title className="h6 mb-2">{item.title}</Card.Title>
                  <Card.Text className="text-muted mb-0">{item.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

const highlights = [
  { title: 'Zero to API fast', desc: 'Prebuilt templates with auth, tests, and docs.', tag: 'Starter Kits' },
  { title: 'Production ready', desc: 'Monitoring, alerts, and logging wired in.', tag: 'Reliability' },
  { title: 'Better DX', desc: 'CLIs, snippets, and shortcuts that save time.', tag: 'Developer Tools' },
  { title: 'Battle-tested', desc: 'Practices we ship across real-world projects.', tag: 'Best Practices' }
]

export default Home
