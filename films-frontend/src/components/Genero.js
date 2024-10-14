import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';

const Genero = () => {
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    fetchGeneros();
  }, []);

  const fetchGeneros = async () => {
    try {
      const response = await axios.get('/media'); // Asegúrate de que esta URL es correcta
      const generosUnicos = [...new Set(response.data.map(pelicula => pelicula.genero.nombre))];
      setGeneros(generosUnicos);
    } catch (error) {
      console.error('Error al cargar los géneros:', error);
    }
  };

  const handleEdit = (nombre) => {
    console.log('Editar género:', nombre);
    // Aquí puedes agregar la lógica para editar el género.
  };

  const handleDelete = async (nombre) => {
    console.log('Eliminar género:', nombre);
    // Aquí puedes agregar la lógica para eliminar el género.
  };

  return (
    <Container className="mt-4">
      <h2 className="text-white">GÉNEROS</h2>
      <Table striped bordered hover className="bg-light">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((genero, index) => (
            <tr key={index}>
              <td>{genero}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(genero)}>Editar</Button>
                <Button variant="danger" onClick={() => handleDelete(genero)}>Eliminar</Button>
              </td>
            </tr>
          ))}
          {generos.length === 0 && (
            <tr>
              <td colSpan="2">No hay géneros disponibles.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Genero;



