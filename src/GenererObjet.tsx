import {Row, Col, Form, Button} from "react-bootstrap";
import React, {ChangeEventHandler, useState} from "react";

const GenererObjet = () => {
    const [typeSelected,setTypeSelected]=useState('PROFIL');

    return (<>
            <br/>
            <br/>
            <br/>
            <Row>
                <Col>
                    Selectionner le type d'objet à ajouter à l'inventaire
                </Col>
                <Col>
                    <Form.Select>
                        <option value='PROFIL'>Profil</option>
                        <option value='CONSOMMABLE'>Consommable</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Button>
                        Créer
                    </Button>
                </Col>
            </Row>
        </>
    )
}
export default GenererObjet;