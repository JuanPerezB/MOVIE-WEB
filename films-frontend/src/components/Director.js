// src/components/Director.js
import React, { useState } from 'react';
import { Button, Table, Form, Container } from 'react-bootstrap';

const Director = () => {
  const [directorList, setDirectorList] = useState([
    { id: 1, name: 'Christopher Nolan' },
    { id: 2, name: 'Steven Spielberg' },
  ]);
  const [nombre, setNombre] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleDelete = (id) => {
    setDirectorList(directorList.filter(director => director.id !== id));
  };

  const handleEdit = (director) => {
    setEditMode(true);
    setCurrentId(director.id);
    setNombre(director.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setDirectorList(
        directorList.map(director =>
          director.id === currentId ? { ...director, name: nombre } : director
        )
      );
    } else {
      const newDirector = { id: Date.now(), name: nombre };
      setDirectorList([...directorList, newDirector]);
    }
    setNombre('');
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <Container>
      <h2>Lista de Directores</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directorList.map(director => (
            <tr key={director.id}>
              <td>{director.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(director)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(director.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>{editMode ? 'Editar Director' : 'Crear Director'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del director"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {editMode ? 'Actualizar' : 'Crear'}
        </Button>
      </Form>
    </Container>
  );
};

export default Director;
