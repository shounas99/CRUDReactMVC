import { useEffect, useState } from 'react';
import './App.css';
import { Card, CardBody, CardHeader, Col, Container, Row, Button } from 'reactstrap';
import TablaContacto from './components/TablaContacto';
import ModalContacto from './components/ModalContacto';
/*import { Button, Card, CardBody, CardHeader, Col, Container, Row } from '../node_modules/reactstrap/types/index';*/

function App() {
    const [contactos, setContactos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);


    useEffect(() => {
        mostrarContactos();
   
    }, []);

    async function mostrarContactos()
    {
        const response = await fetch('api/contacto/lista', {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            setContactos(data);
        }
    }

    async function guardarContacto(contacto) {
        const response = await fetch('api/contacto/guardar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(contacto)
        });
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    }

    const editarContacto = async (contacto) => {
        const response = await fetch("api/contacto/editar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(contacto)
        });
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos()
        }
    }

    const eliminarContacto = async (id) => {
        var respuesta = window.confirm("¿Desea eliminar el contacto?");
        if (!respuesta) {
            return;
        }
        const response = await fetch(`api/contacto/eliminar/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            mostrarContactos();
        }
        
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de contactos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success" onClick={(() => setMostrarModal(!mostrarModal))}>Nuevo contacto</Button>
                            <hr></hr>
                            <TablaContacto
                                data={contactos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarContacto={eliminarContacto}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalContacto
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}
                editar={editar}
                setEditar={setEditar}
                editarContacto={editarContacto}
            />
        </Container>
    )
        
    
}

export default App;