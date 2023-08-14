import {Row, Col, Form, Button, FormControl, Table, Modal} from "react-bootstrap";
import React, {ChangeEvent, useState} from "react";
import {apiUrl, Couleur, Profil} from "./types";
import Barcode from "react-barcode";
import {Link} from "react-router-dom";
import html2canvas from "html2canvas";

const GenererObjet = () => {
    const [typeSelected, setTypeSelected] = useState('PROFIL');
    const [isCreatingCouleur, setIsCreatingCouleur] = useState(false);
    const [couleurToBeEdited, setCouleurToBeEdited] = useState<Couleur>({
        id: null, metreLineaire: 0, nomCouleur: ""

    })
    const [showModalAjoutOk, setShowModalAjoutOk] = useState(false);

    const [profilSaved, setProfilSaved] = useState<Profil>({
        couleurs: [],
        longueur: 0,
        prixMetreLineaire: 0,
        prixUnitaire: 0,
        quantiteOuMl: 0,
        referenceProduit: "",
        type: "PROFIL",
        id: 0
    })
    const [profil, setProfil] = useState<Profil>({
        couleurs: [],
        longueur: 0,
        prixMetreLineaire: 0,
        prixUnitaire: 0,
        quantiteOuMl: 0,
        referenceProduit: "",
        type: "PROFIL",
        id: 0
    });

    function handleCloseModalAjoutOk() {
        setShowModalAjoutOk(false);
        setProfil({
            couleurs: [],
            longueur: 0,
            prixMetreLineaire: 0,
            prixUnitaire: 0,
            quantiteOuMl: 0,
            referenceProduit: "",
            type: "PROFIL",
            id: 0
        })
    }


    const handleDownloadClick = () => {
        const barcodeDiv = document.getElementById('barcode');
        if (barcodeDiv) {
            html2canvas(barcodeDiv).then((canvas) => {
                const link = document.createElement('a');
                link.download = 'barcode' + profilSaved?.id + '.png';
                link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                link.click();
            });
        }
    };

    const saveProfilFetch = async () => {
        try {
            const response = await fetch(apiUrl + "profils", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profil)
            });

            const data = await response.json();

            if (response.ok) {
                setProfilSaved(data);
                setShowModalAjoutOk(true);

            } else {

            }
        } catch (error) {

        }
    };
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setTypeSelected(event.target.value);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setProfil((prevObject) => ({
            ...prevObject!,
            [name]: value
        }));
    };

    function saveColor() {
        addingColorInArray();
        setIsCreatingCouleur(false);
    }

    const addingColorInArray = () => {
        setProfil((prevProfil) => {
            if (prevProfil) {
                return {
                    ...prevProfil!,
                    couleurs: [
                        ...prevProfil.couleurs!,
                        couleurToBeEdited
                    ]
                };
            }
            return prevProfil; // Renvoie null ou le profil inchangé en fonction de votre logique
        });
    };

    function editCouleurs() {
        setIsCreatingCouleur(true);
    }

    function hideEditingColor() {
        setIsCreatingCouleur(false);
        setCouleurToBeEdited({
            id: null,
            nomCouleur: "",
            metreLineaire: 0,
        })
    }

    const handleInputChangeNewColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCouleurToBeEdited((prevObject) => ({
            ...prevObject!,
            [name]: value
        }));
    };
    const createFields = () => {
        console.log(typeSelected);
    };

    return (
        <>
            <br/>
            <br/>
            <br/>
            <Row>
                <Col>
                    Selectionner le type d'objet à ajouter à l'inventaire
                </Col>
                <Col>
                    <Form.Select onChange={handleSelectChange} value={typeSelected}>
                        <option value='PROFIL'>Profil</option>
                        <option value='CONSOMMABLE'>Consommable</option>
                    </Form.Select>
                </Col>
                <Col>
                    <Button onClick={createFields}>
                        Créer
                    </Button>
                </Col>
            </Row>
            <br/>
            <br/>
            {typeSelected === "PROFIL" && (
                <>
                    <Row>
                        <Col>
                            Référence :
                        </Col>
                        <Col>
                            <FormControl
                                type="text"
                                name="referenceProduit"
                                value={profil.referenceProduit}
                                onChange={handleInputChange}
                                autoFocus
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Prix metre linéaire
                        </Col>
                        <Col>
                            <FormControl
                                type="text"
                                name="prixUnitaire"
                                value={profil.prixUnitaire}
                                onChange={handleInputChange}
                                autoFocus
                            />
                        </Col>
                    </Row>
                    <br/>
                    <br/>

                    {profil.couleurs.length > 0 && (
                        <Table striped bordered>
                            <thead>
                            <tr>
                                <th>Couleur</th>
                                <th>Quantité</th>
                                <th>Sous total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {profil.couleurs.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        {item.nomCouleur}
                                    </td>
                                    <td>
                                        {item.metreLineaire}
                                    </td>
                                    <td>
                                        {item.metreLineaire * profil.prixUnitaire}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>


                    )}

                    <br/>
                    <br/>
                    {
                        isCreatingCouleur && (
                            <>
                                <Row>
                                    <Col>
                                        Nom de la couleur
                                    </Col>
                                    <Col>
                                        <FormControl
                                            type="text"
                                            name="nomCouleur"
                                            value={couleurToBeEdited.nomCouleur}
                                            onChange={handleInputChangeNewColor}
                                            autoFocus
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Nombre de metres lineaires
                                    </Col>

                                    <Col>
                                        <FormControl
                                            type="text"
                                            name="metreLineaire"
                                            value={couleurToBeEdited.metreLineaire}
                                            onChange={handleInputChangeNewColor}
                                            autoFocus
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col> <Button onClick={saveColor}>Sauvegarder</Button></Col>
                                    <Col><Button onClick={hideEditingColor}>Annuler</Button></Col>

                                </Row>
                                <br/>
                            </>
                        )
                    }

                    <Row>
                        <Col>
                            <Button onClick={editCouleurs} variant="primary">
                                Ajouter une couleur
                            </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Button onClick={saveProfilFetch} variant="success">
                                Sauvegarder le profil

                            </Button>
                        </Col>
                    </Row>
                </>
            )}
            <Modal show={showModalAjoutOk} onHide={handleCloseModalAjoutOk}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajout réussi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            Ajout réussi
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Code barre
                        </Col>
                        <Col>
                            <div id='barcode' style={{display: 'inline-block', padding: '0', margin: '0'}}>
                                <Barcode value={profilSaved.id.toString()} format="CODE39"/>
                            </div>
                        </Col>
                        <Col>
                            <Button onClick={handleDownloadClick}>
                                Télécharger
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Référence :

                        </Col>
                        <Col>
                            {profilSaved.referenceProduit}

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Prix au mètre linéaire :
                        </Col>
                        <Col>
                            {profilSaved.prixUnitaire} €
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            Nombre de mètres linéaires
                        </Col>
                        <Col>
                            {profilSaved.quantiteOuMl} m
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            Prix total
                        </Col>
                        <Col>
                            {profilSaved.quantiteOuMl*profilSaved.prixUnitaire} €
                        </Col>
                    </Row>
                    <br/>
                    {profilSaved.couleurs.length > 0 && (
                        <Table striped bordered>
                            <thead>
                            <tr>
                                <th>Couleur</th>
                                <th>Quantité</th>
                                <th>Sous total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {profilSaved.couleurs.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        {item.nomCouleur}
                                    </td>
                                    <td>
                                        {item.metreLineaire}
                                    </td>
                                    <td>
                                        {item.metreLineaire * profil.prixUnitaire} €
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>


                    )}
                    <Row></Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModalAjoutOk}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default GenererObjet;
