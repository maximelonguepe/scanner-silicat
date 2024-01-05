import React, {useState} from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import {apiUrl, UserLogin} from "./types";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const navig = useNavigate();
    const [user, setUser] = useState<UserLogin>({email: "", password: ""})

    const handleLogin = async () => {
        try {
            const response = await fetch(apiUrl + "v1/auth/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data)
                Cookies.set('token', data.token, { expires: 1 });
                navig('/liste');
            } else {

            }
        } catch (error) {

        }
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setUser((prevObject) => ({
            ...prevObject!,
            [name]: value
        }));
    };

    return (

        <Container>
            <br/>
            <br/>
            <br/>

            <Form>
                <Row className="justify-content-center">

                    <Form.Group controlId="formBasicUsername">
                        <Col>
                            <Form.Label>Mail</Form.Label>
                        </Col>
                        <Col>

                            <Form.Control
                                type="text"
                                name="email"
                                placeholder="Entrez votre nom d'utilisateur"
                                value={user.email}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                </Row>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Mot de passe"
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleLogin}>
                    Se connecter
                </Button>
            </Form>


</Container>
)
    ;
};

export default LoginPage;
