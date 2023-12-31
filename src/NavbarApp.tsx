import {Nav, Navbar, Container, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

const NavbarApp = () => {
    return (
        <>

            <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
                <Container fluid>
                    <Navbar.Brand className="text-white">
                        SILICAT
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto d-flex">
                            <Nav.Item id="my-events" className="d-flex mb-2 me-2 mb-lg-0">
                                <Link to='/'>
                                    <Button>
                                        Accueil
                                    </Button>
                                </Link>
                            </Nav.Item>

                            <Nav.Item id="my-events" className="d-flex mb-2 me-2 mb-lg-0">
                                <Link to='/create'>
                                    <Button>
                                        Ajouter un objet
                                    </Button>
                                </Link>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default NavbarApp;