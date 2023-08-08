import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Consommable, Objet, Profil} from "./types";
import {Button, Col, FormControl, FormGroup, Row} from "react-bootstrap";
import Barcode from "react-barcode";

const DetailObjet = () => {
    const [loading, setLoading] = useState(true);
    const [objet, setObjet] = useState<Objet | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [consommable, setConsommable] = useState<Consommable | null>(null);
    const [profil, setProfil] = useState<Profil | null>(null)

    const [editingPUConsommable, setEditingPUConsommable] = useState(false);
    const [editingReferenceConsommable, setEditingReferenceConsommable] = useState(false);
    const [editingQuantiteConsommable, setEditingQuantiteConsommable] = useState(false);

    const fetchObjet = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/objets/get?id=${id}`);
            const jsonData = await response.json();
            console.log(jsonData);
            setObjet(jsonData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Erreur lors du chargement de l'objet.");
            setLoading(false);
        }
    };

    const fetchConsommable = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/consommables/get?id=${id}`);
            const jsonData = await response.json();
            console.log(jsonData);
            setConsommable(jsonData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Erreur lors du chargement de l'objet.");
            setLoading(false);
        }
    };

    const fetchProfil = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/profils/get?id=${id}`);
            const jsonData = await response.json();

            setProfil(jsonData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Erreur lors du chargement de l'objet.");
            setLoading(false);
        }
    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    useEffect(() => {
        if (id) {
            fetchObjet(id);
        }
    }, [id]);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setConsommable((prevObject) => ({
            ...prevObject!,
            [name]: value
        }));
    };

    useEffect(() => {
        if (objet) {

            if (objet.type === "CONSOMMABLE") {
                console.log('consommable');
                fetchConsommable(objet.id.toString());
            } else if (objet.type === "PROFIL") {
                console.log('profil');
                fetchProfil(objet.id.toString());
            }
        }
    }, [objet]);


    const handleInputConsommableRefBlur = () => {
        setEditingReferenceConsommable(false);
    };

    const handleInputConsommablePUBlur = () => {
        setEditingPUConsommable(false);
    };

    const handleInputConsommableQuantiteBlur = () => {
        setEditingQuantiteConsommable(false);
    };
    const handleEditClickConsommableRef = () => {
        setEditingReferenceConsommable(true);
    };

    const handleEditClickConsommablePU = () => {
        setEditingPUConsommable(true);
    };

    const handleEditClickConsommableQuantite = () => {
        setEditingQuantiteConsommable(true);
    };
    return (
        <>
            <br/>
            <br/>
            <br/>
            {loading && <p>Chargement en cours...</p>}
            {error && <p>{error}</p>}
            {consommable && (
                <>
                    <Row>

                    </Row>
                    <Row>
                        <Col>
                            Référence :
                        </Col>
                        <Col>


                            {
                                editingReferenceConsommable ? (

                                    <FormControl
                                        type="text"
                                        name="referenceProduit"
                                        value={consommable.referenceProduit}
                                        onChange={handleInputChange}
                                        onBlur={handleInputConsommableRefBlur}
                                        autoFocus
                                    />
                                ) : (
                                    <span>{consommable.referenceProduit}</span>

                                )
                            }
                        </Col>
                        <Col>
                            <Button onClick={handleEditClickConsommableRef} variant="primary">
                                Modifier
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Prix unitaire :
                        </Col>
                        <Col>
                            {
                                editingPUConsommable ? (
                                    <>
                                        <FormControl
                                            type="text"
                                            name="prixUnitaire"
                                            value={consommable.prixUnitaire}
                                            onChange={handleInputChange}
                                            onBlur={handleInputConsommablePUBlur}
                                            autoFocus
                                        />
                                    </>
                                ) : (
                                    <span>{consommable.prixUnitaire}</span>

                                )
                            }

                            €
                        </Col>
                        <Col>
                            <Button onClick={handleEditClickConsommablePU} variant="primary">
                                Modifier
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Quantité :
                        </Col>
                        <Col>
                            <span>
                                {consommable.quantiteOuMl}
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Row>
                            <Col>
                                Sous total :
                            </Col>
                            <Col>
                                <span>
                                {consommable.quantiteOuMl * consommable.prixUnitaire}
                                </span>
                                €
                            </Col>
                        </Row>
                    </Row>
                    <Row>
                        <Col>
                            Qr code :

                        </Col>
                        <Col>
                            <Barcode value={consommable.id.toString()} format="CODE39"/>
                        </Col>
                    </Row>
                    <Row>
                        <Button>Sauvegarder Modifications</Button>
                    </Row>

                </>
            )}
            {profil && (
                <>
                    <Row>
                        <Col>

                            Référence : <span>{profil.referenceProduit}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Qr code :

                        </Col>
                        <Col>
                            <Barcode value={profil.id.toString()} format="CODE39"/>
                        </Col>
                    </Row>
                    <Row>
                        <Button>Sauvegarder Modifications</Button>
                    </Row>

                </>
            )
            }


        </>
    );
};

export default DetailObjet;
