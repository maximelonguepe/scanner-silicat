import React, {useState, useEffect, ChangeEvent} from "react";
import {Table, Button, Row, Col, Form, FormControl} from "react-bootstrap";
import Barcode from "react-barcode";
import {Link} from "react-router-dom";
import {apiUrl, Objet} from "./types";

const ListeObjets = () => {
    const [objets, setObjets] = useState<Objet[]>([]);
    const [typeSelected, setTypeSelected] = useState('TOUS');
    const [idSearched, setIdSearched] = useState('');

    const fetchObjets = async () => {
        try {
            const response = await fetch(apiUrl + 'objets');
            const jsonData = await response.json();
            setObjets(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const fetchObjetsFilter = async () => {
        let idX=idSearched;
        if(idSearched===''){
            idX='0';
        }
        try {
            const response = await fetch(apiUrl + `objets/filter?type=${typeSelected}&id=${idX}`);
            const jsonData = await response.json();
            setObjets(jsonData);
            renderList();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchObjets();
    }, []);
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setTypeSelected(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdSearched(event.target.value);
    };

    const renderList = () => {
        return (
            <>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col>
                        Type :
                    </Col>
                    <Col>
                        <Form.Select onChange={handleSelectChange} value={typeSelected}>
                            <option value='0'>Tous</option>
                            <option value='PROFIL'>Profil</option>
                            <option value='CONSOMMABLE'>Consommable</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        Id :
                    </Col>
                    <Col>
                        <FormControl
                            type="text"
                            value={idSearched}
                            onChange={handleSearchChange}
                            autoFocus
                        />
                    </Col>
                    <Col>
                        <Button onClick={fetchObjetsFilter}>
                            Rechercher
                        </Button>
                    </Col>
                </Row>
                {objets.length > 0 ? (
                    <>

                        <br/>
                        <Table striped bordered>
                            <thead>
                            <tr>
                                <th>Identifiant</th>
                                <th>Référence produit</th>
                                <th>Type</th>
                                <th>Quantité <br/>
                                    ou ML
                                </th>
                                <th>Prix unitaire <br/>
                                    ou ML
                                </th>
                                <th>Sous total</th>
                                <th>Code barre</th>
                                <th>Modifier</th>
                            </tr>
                            </thead>
                            <tbody>
                            {objets.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.referenceProduit}
                                    </td>
                                    <td>
                                        {item.type}
                                    </td>
                                    <td>
                                        {item.quantiteOuMl}
                                    </td>
                                    <td>
                                        {item.prixUnitaire}
                                    </td>
                                    <td>
                                        {item.prixUnitaire * item.quantiteOuMl}
                                    </td>
                                    <td>
                                        <Barcode value={item.id.toString()} format="CODE39"/>
                                    </td>
                                    <td>

                                        <Link to={`/objets?id=${item.id}`}>
                                            <Button variant="primary">Modifier</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <p>Pas d'objets à montrer pour le moment veuillez en créer</p>
                )}
            </>
        );
    };
    return (
        renderList()
    );
};

export default ListeObjets;
