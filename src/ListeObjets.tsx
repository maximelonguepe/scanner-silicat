import React, {useState, useEffect, ChangeEvent} from "react";
import {Table, Button, Row, Col, Form, FormControl, Modal} from "react-bootstrap";
import Barcode from "react-barcode";
import {Link} from "react-router-dom";
import {apiUrl, Objet} from "./types";
import {type} from "os";

const ListeObjets = () => {
    const [objets, setObjets] = useState<Objet[]>([]);
    const [typeSelected, setTypeSelected] = useState('TOUS');
    const [idSearched, setIdSearched] = useState('');
    const [showModalDeleteObjet, setShowModalDeleteObjet] = useState(false);
    const [totalSum, setTotalSum] = useState(0);
    const [objetSelected, setObjetSelected]=useState<Objet>({
        type:"", id: 0, prixUnitaire: 0, quantiteOuMl: 0, referenceProduit: ""

    })
    const fetchObjets = async () => {
        try {
            const response = await fetch(apiUrl + 'objets');
            const jsonData = await response.json();

            setObjets(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        const sommeDesPrix = objets.reduce((total, objet) => total + objet.prixUnitaire*objet.quantiteOuMl, 0);
        setTotalSum(sommeDesPrix);
    }, [objets]);
    const fetchdeleteObjet = async () => {
        try {
            // Remplacez 'URL_DE_VOTRE_API' par l'URL réelle de votre API
            const response = await fetch(apiUrl + `objets?id=${objetSelected.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // Vous pouvez ajuster les en-têtes selon vos besoins
                },
            }

            );

        }catch (error) {
            console.error('Error fetching data:', error);
        }
    }


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

    function closeModalDeleteObjet(){
        setShowModalDeleteObjet(false);
    }
    function findObjectById(array:Array<Objet>, id:number) {
        return array.find(obj => obj.id === id);
    }
    const onclickShowModalDeleteObjet = (id: number) => {
        const objetFound = findObjectById(objets, id);

        if (objetFound) {
            setObjetSelected(objetFound);
            setShowModalDeleteObjet(true);
        } else {
            // Gérer le cas où l'objet n'est pas trouvé, par exemple, afficher une erreur ou une notification.
            console.error(`Aucun objet trouvé avec l'ID ${id}`);
        }
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
                            <option value='ACCESSOIRE'>Accessoire</option>
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
                                    <td>
                                        <Button variant="danger" onClick={()=>onclickShowModalDeleteObjet(item.id)}>Supprimer</Button>
                                    </td>
                                </tr>

                            ))}
                            <tr>
                                <td>
                                    Total
                                </td>
                                <td/>
                                <td/>
                                <td/>
                                <td/>
                                <td>
                                    {totalSum} €
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </>
                ) : (
                    <p>Pas d'objets à montrer pour le moment veuillez en créer</p>
                )}
                <Modal show={showModalDeleteObjet} onHide={closeModalDeleteObjet}>
                    <Modal.Header closeButton>
                        <Modal.Title>Etes vous sur de supprimer l'objet suivant</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>
                                Id :
                            </Col>
                            <Col>
                                {objetSelected.id}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Référence :
                            </Col>
                            <Col>
                                {objetSelected.referenceProduit}
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={fetchdeleteObjet}>
                            Supprimer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };
    return (
        renderList()
    );
};

export default ListeObjets;
