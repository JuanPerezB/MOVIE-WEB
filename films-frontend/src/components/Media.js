import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import '../App.css'; // Importar estilos generales

const Media = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentPelicula, setCurrentPelicula] = useState({});

  useEffect(() => {
    fetchPeliculas();
  }, []);

  const fetchPeliculas = async () => {
    try {
      const response = await axios.get('https://filmsback-f6c5hrgxakcfdpax.eastus-01.azurewebsites.net/inventory');
      setPeliculas(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setEditing(false);
    setCurrentPelicula({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, director, releaseDate, genre, rating, coverImage } = event.target.elements;

    // Crear un objeto FormData para enviar tanto los datos como la imagen
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('director', director.value);
    formData.append('releaseDate', releaseDate.value);
    formData.append('genre', genre.value);
    formData.append('rating', rating.value);
    
    // Si hay una imagen seleccionada, la añadimos al FormData
    if (coverImage.files[0]) {
      formData.append('coverImage', coverImage.files[0]);
    }

    try {
      if (editing) {
        // Enviar los datos y la imagen usando PUT
        await axios.put(`https://filmsback-f6c5hrgxakcfdpax.eastus-01.azurewebsites.net/inventory/${currentPelicula._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Enviar los datos y la imagen usando POST
        await axios.post('https://filmsback-f6c5hrgxakcfdpax.eastus-01.azurewebsites.net/inventory', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchPeliculas();
      handleClose();
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  const handleEdit = (pelicula) => {
    setCurrentPelicula(pelicula);
    setEditing(true);
    handleShow();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://filmsback-f6c5hrgxakcfdpax.eastus-01.azurewebsites.net/inventory/${id}`);
      fetchPeliculas();
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-white">PELÍCULAS</h2> {/* Cambiado a blanco */}
      <Button onClick={handleShow}>Agregar Película</Button>
      <Row>
        {peliculas.map((pelicula) => (
          <Col md={4} key={pelicula._id}>
            <Card
              className="mb-4"
              style={{
                border: '6px solid transparent', // Grosor del borde
                borderRadius: '15px', // Redondea las esquinas
                borderImage: 'linear-gradient(black, darkgray) 1', // Borde en negro gradient
              }}
            >
              <Card.Img variant="top" src={`http://localhost:8080${pelicula.coverImage}`} alt={pelicula.title} />
              <Card.Body style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0))' }}>
                <Card.Title style={{ color: '#002366', fontWeight: '900' }}>{pelicula.title}</Card.Title>
                <Card.Text style={{ border: '2px solid black', padding: '8px', borderRadius: '4px', margin: '4px 0', color: 'black', fontWeight: 'bold' }}>
                  {pelicula.director}
                </Card.Text>
                <Card.Text style={{ border: '2px solid black', padding: '8px', borderRadius: '4px', margin: '4px 0', color: 'black', fontWeight: 'bold' }}>
                  {pelicula.genre}
                </Card.Text>
                <Card.Text style={{ border: '2px solid black', padding: '8px', borderRadius: '4px', margin: '4px 0', color: 'black', fontWeight: 'bold' }}>
                  {pelicula.releaseDate}
                </Card.Text>
                <Card.Text style={{ border: '2px solid black', padding: '8px', borderRadius: '4px', margin: '4px 0', color: 'black', fontWeight: 'bold' }}>
                  Rating: {pelicula.rating}
                </Card.Text>
                <Button variant="warning" onClick={() => handleEdit(pelicula)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(pelicula._id)}>Eliminar</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para agregar/editar película */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Editar Película' : 'Agregar Película'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" defaultValue={editing ? currentPelicula.title : ''} required />
            </Form.Group>
            <Form.Group controlId="director">
              <Form.Label>Director</Form.Label>
              <Form.Control type="text" defaultValue={editing ? currentPelicula.director : ''} required />
            </Form.Group>
            <Form.Group controlId="releaseDate">
              <Form.Label>Fecha de Estreno</Form.Label>
              <Form.Control type="date" defaultValue={editing ? currentPelicula.releaseDate.split('T')[0] : ''} required />
            </Form.Group>
            <Form.Group controlId="genre">
              <Form.Label>Género</Form.Label>
              <Form.Control type="text" defaultValue={editing ? currentPelicula.genre : ''} required />
            </Form.Group>
            <Form.Group controlId="rating">
              <Form.Label>Calificación</Form.Label>
              <Form.Control type="number" step="0.1" defaultValue={editing ? currentPelicula.rating : ''} required />
            </Form.Group>
            <Form.Group controlId="coverImage">
              <Form.Label>Imagen de Portada</Form.Label>
              <Form.Control type="file" accept="image/*" />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editing ? 'Actualizar Película' : 'Agregar Película'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Media;





