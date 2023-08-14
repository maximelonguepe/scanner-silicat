import {Row, Col, Form, Button, FormControl, Table} from "react-bootstrap";
import React, {ChangeEvent, useState} from "react";
import {apiUrl, Couleur, Profil} from "./types";
import Barcode from "react-barcode";
import {Link} from "react-router-dom";

const GenererObjet = () => {
    const [typeSelected, setTypeSelected] = useState('PROFIL');
    const [isCreatingCouleur, setIsCreatingCouleur] = useState(false);
    const [couleurToBeEdited, setCouleurToBeEdited]=useState<Couleur>({
        id: null, metreLineaire: 0, nomCouleur: ""

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

    const saveProfilFetch = async () => {
        try {
            const response = await fetch(apiUrl+"profils", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profil)
            });

            const data = await response.json();

            if (response.ok) {

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

    function hideEditingColor(){
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
        </>
    );
};

export default GenererObjet;
