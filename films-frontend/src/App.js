// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Media from './components/Media';
import Genero from './components/Genero';
import Director from './components/Director';
import Productora from './components/Productora';
import Tipo from './components/Tipo';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Contenedor del título */}
        <div className="sidebar">
          <h1>J°J Movies</h1>
        </div>

        {/* Contenedor de comentarios */}
        <div className="sidebar-right">
          <h2>Comentarios</h2>
          <div className="comment">
            <p>"Una app increíble para descubrir películas. ¡Me encanta!" - Ana</p>
          </div>
          <div className="comment">
            <p>"Excelente interfaz y recomendaciones precisas. Muy recomendada." - Carlos</p>
          </div>
          <div className="comment">
            <p>"¡Fácil de usar y muy divertida! Me ha ayudado a encontrar mis películas favoritas." - Laura</p>
          </div>
        </div>

        {/* Barra de navegación */}
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/">FilmsApp</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/media">Media</Nav.Link>
                <Nav.Link href="/genero">Género</Nav.Link>
                <Nav.Link href="/director">Director</Nav.Link>
                <Nav.Link href="/productora">Productora</Nav.Link>
                <Nav.Link href="/tipo">Tipo</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Contenedor principal */}
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Media />} />
            <Route path="/media" element={<Media />} />
            <Route path="/genero" element={<Genero />} />
            <Route path="/director" element={<Director />} />
            <Route path="/productora" element={<Productora />} />
            <Route path="/tipo" element={<Tipo />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;



