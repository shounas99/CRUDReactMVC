import { Button } from 'bootstrap';
import { Table } from 'reactstrap'
function TablaContacto({ data, setEditar, mostrarMostrar, setMostrarModal, eliminarContacto }) {

    const enviarDatos = (contacto) => {
        setEditar(contacto)
        setMostrarModal(!setMostrarModal)
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length < 1 ? (
                        <tr>
                            <td colSpan="4">Sin registros :c</td>
                        </tr>
                    ) : (
                            data.map(item => (
                                <tr key={item.idContacto}>
                                    <td>{item.nombre}</td>
                                    <td>{item.correo}</td>
                                    <td>{item.telefono}</td>
                                    <td>
                                        <Button color="primary"
                                            size="sm"
                                            classNae="me-2"
                                            onClick={() => enviarDatos(item)}
                                        >Editar</Button>
                                        <Button color="danger"
                                            size="sm"
                                            onClick={() => eliminarContacto(item.idContacto)}
                                        >Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                    )
                }
            </tbody>
        </Table> 
    );
}

export default TablaContacto