import {useLocation} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Consommable, Objet, Profil} from "./types";
import {Button, Col, FormControl, FormGroup, Row} from "react-bootstrap";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";

const DetailObjet = () => {
    const [loading, setLoading] = useState(true);
    const [objet, setObjet] = useState<Objet | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [consommable, setConsommable] = useState<Consommable | null>(null);
    const [profil, setProfil] = useState<Profil | null>(null)
    const qrCodeRef = useRef(null);

    const [editingPUConsommable, setEditingPUConsommable] = useState(false);
    const [editingReferenceConsommable, setEditingReferenceConsommable] = useState(false);
    const [editingQuantiteConsommable, setEditingQuantiteConsommable] = useState(false);

    const fetchObjet = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/api/objets/get?id=${id}`);
            const jsonData = await response.json();
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
    const handleDownloadClick = () => {
        const barcodeDiv = document.getElementById('barcode');
        if (barcodeDiv) {
            html2canvas(barcodeDiv).then((canvas) => {
                const link = document.createElement('a');
                link.download = 'barcode'+objet?.id+'.png';
                link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                link.click();
            });
        }
    };
    const updateConsommable = async () => {
        try {
            // Mettez à jour les propriétés nécessaires de l'objet

            const response = await fetch('http://localhost:8080/api/consommables', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(consommable),
            });

            if (response.ok) {
                console.log('Objet mis à jour avec succès.');
                // Vous pouvez appeler fetchData() pour récupérer les données mises à jour après le PUT
            } else {
                console.error('Erreur lors de la mise à jour de l\'objet.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
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
                fetchConsommable(objet.id.toString());
            } else if (objet.type === "PROFIL") {
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

    function handleSaveModif() {
        if (objet?.type === 'CONSOMMABLE') {
            updateConsommable();
        }
    }

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
                            {
                                editingQuantiteConsommable ?
                                    (<>
                                        <FormControl
                                            type="text"
                                            name="quantiteOuMl"
                                            value={consommable.quantiteOuMl}
                                            onChange={handleInputChange}
                                            onBlur={handleInputConsommableQuantiteBlur}
                                            autoFocus
                                        />
                                    </>) : <span> {consommable.quantiteOuMl}</span>
                            }
                        </Col>
                        <Col>
                            <Button onClick={handleEditClickConsommableQuantite} variant="primary">
                                Modifier
                            </Button>
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
                            Code barre:

                        </Col>
                        <Col>
                        <div id='barcode'>
                            <Barcode value={consommable.id.toString()} format="CODE39"/>

                        </div>

                        </Col>
                        <Col>
                            <Button onClick={handleDownloadClick}>
                                Télécharger
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Button onClick={handleSaveModif}>Sauvegarder Modifications</Button>
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

                </>
            )
            }


        </>
    );
};

export default DetailObjet;
