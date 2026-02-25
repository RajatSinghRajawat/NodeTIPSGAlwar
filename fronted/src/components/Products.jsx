import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';

const Products = () => {
  const [query, setQuery] = useState('');

  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addProduct = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name: name,
        price: price,
        description: description
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      const response = await fetch("http://localhost:3001/products/add", requestOptions);
      const result = await response.json();

      console.log(result);


      // Clear form
      setName('');
      setPrice('');
      setDescription('');

      toast.success("Product added successfully!");
      // Optional: refresh product list after adding
      getProducts();

      handleClose(); // close modal after success
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };



  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products/all");
      const result = await response.json();
      console.log(result.get);
      setProducts(result.get || []); // safe guard in case result.get is undefined
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };






  const searchProducts = async (value) => {
    try {
      if (!value) {
        getProducts();
        return;
      }

      fetch(`http://localhost:3001/products/search?name=${value}`)
        .then((response) => response.json())
        .then((result) => {
          console.log(result.search);
          setProducts(result.search || []); // safe guard in case result.get is undefined
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getProducts();


  }, []);

  console.log(products, "ssds");


  useEffect(() => {
    searchProducts(query);
  }, [query])

  return (
    <>

      <ToastContainer />
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
        <div>
          <h2 className="mb-1">Featured Products</h2>
          <p className="text-muted mb-0">Hand-picked kits and tools to speed up delivery.</p>
        </div>
        <div className="d-flex align-items-center gap-2 w-100" style={{ maxWidth: 440 }}>
          <InputGroup>
            <InputGroup.Text>Search</InputGroup.Text>
            <Form.Control
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);

              }}
              type="search"
              placeholder="Search by name, tag, or description..."

            />
          </InputGroup>
          <Button variant="outline-primary" href="/auth">
            Get access
          </Button>
          <Button variant="primary" onClick={handleShow}>
            ADD
          </Button>
        </div>
      </div>

      <Row xs={1} md={2} className="g-3">
        {products && products.length > 0 ? (
          products.map((item) => (
            <Col key={item._id}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <span>{item.price}</span>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products found</p>
        )}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}  // ← fixed: onChange + e.target.value
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>

            {/* Price */}
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={price}
                onChange={(e) => setPrice(e.target.value)}  // ← fixed
                type="number"
                placeholder="Enter price"
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                onChange={(e) => setDescription(e.target.value)}  // ← fixed
                as="textarea"
                rows={3}
                placeholder="Enter description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={addProduct}  // ← fixed: only call addProduct (also closes modal inside it)
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Products;