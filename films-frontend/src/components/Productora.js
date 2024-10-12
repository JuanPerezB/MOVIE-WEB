// src/components/Productora.js
import React, { useState } from 'react';
import { Button, Table, Form, Container } from 'react-bootstrap';

const Productora = () => {
  const [productoraList, setProductoraList] = useState([
    { id: 1, name: 'Warner Bros' },
    { id: 2, name: 'Universal Pictures' },
  ]);
  const [nombre, setNombre] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const handleDelete = (id) => {
    setProductoraList(productoraList.filter(productora => productora.id !== id));
  };

  const handleEdit = (productora) => {
    setEditMode(true);
    setCurrentId(productora.id);
    setNombre(productora.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setProductoraList(
        productoraList.map(productora =>
          productora.id === currentId ? { ...productora, name: nombre } : productora
        )
      );
    } else {
      const newProductora = { id: Date.now(), name: nombre };
      setProductoraList([...productoraList, newProductora]);
    }
    setNombre('');
    setEditMode(false);
    setCurrentId(null);
  };

  return (
    <Container>
      <h2>Lista de Productoras</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoraList.map(productora => (
            <tr key={productora.id}>
              <td>{productora.name}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(productora)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(productora.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>{editMode ? 'Editar Productora' : 'Crear Productora'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre de la productora"
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

export default Productora;
