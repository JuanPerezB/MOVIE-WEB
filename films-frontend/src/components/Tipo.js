// src/components/Tipo.js
import React, { useState } from 'react';
import { Button, Table, Form, Container } from 'react-bootstrap';

const Tipo = () => {
  const [tipoList, setTipoList] = useState([
    { id: 1, name: 'Película' },
    { id: 2, name: 'Serie' },
  ]);
  const [nombre, setNombre] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleDelete = (id) => {
    setTipoList(tipoList.filter(tipo => tipo.id !== id));
  };

  const handleEdit = (tipo) => {
    setEditMode(true);
    setCurrentId(tipo.id);
    setNombre(tipo.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setTipoList(
        tipoList.map(tipo =>
          tipo.id === currentId ? { ...tipo, name: nombre } : tipo
        )
      );
    } else {
      const newTipo = { id: Date.now(), name: nombre };
      setTipoList([...tipoList, newTipo]);
    }
    setNombre('');
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <Container>
      <h2>Lista de Tipos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipoList.map(tipo => (
            <tr key={tipo.id}>
              <td>{tipo.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(tipo)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(tipo.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>{editMode ? 'Editar Tipo' : 'Crear Tipo'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del tipo"
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

export default Tipo;
