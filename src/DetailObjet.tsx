import {useLocation} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {Accessoire, apiUrl, Consommable, Couleur, Objet, Profil} from "./types";
import {Button, Col, FormControl, FormGroup, Row, Table} from "react-bootstrap";
import Barcode from "react-barcode";
import html2canvas from "html2canvas";
import {generateHeaderDelete, generateHeaderGet, generateHeaderPut} from "./HeadersUtils";

const DetailObjet = () => {
    const [loading, setLoading] = useState(true);
    const [objet, setObjet] = useState<Objet | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [consommable, setConsommable] = useState<Consommable | null>(null);
    const [profil, setProfil] = useState<Profil | null>(null)
    const [accessoire, setAccessoire] = useState<Accessoire | null>(null)

    const [isEditingColors, setIsEditingColors] = useState(false);
    const [editingPU, setEditingPU] = useState(false);
    const [editingReference, setEditingReference] = useState(false);
    const [editingQuantite, setEditingQuantite] = useState(false);
    const [couleurToBeEdited, setCouleurToBeEdited] = useState<Couleur>({
        id: null,
        nomCouleur: "",
        metreLineaire: 0,
    });
    const fetchObjet = async (id: string) => {
        try {
            const headers = generateHeaderGet()
            const response = await fetch(apiUrl + `objets/get?id=${id}`,{
                method: 'GET',
                headers: headers
            });
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
            const headers = generateHeaderGet()
            const response = await fetch(apiUrl + `consommables/get?id=${id}`,{
                method: 'GET',
                headers: headers
            });
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
            const headers = generateHeaderGet()
            const response = await fetch(apiUrl + `profils/get?id=${id}`,{
                method: 'GET',
                headers: headers
            });
            const jsonData = await response.json();
            console.log('fetch')
            setProfil(jsonData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Erreur lors du chargement de l'objet.");
            setLoading(false);
        }
    };

    const fetchAccessoire = async (id: string) => {
        try {
            const headers = generateHeaderGet()
            const response = await fetch(apiUrl + `accessoires/get?id=${id}`,{
                method: 'GET',
                headers: headers
            });
            const jsonData = await response.json();
            console.log(jsonData);
            setAccessoire(jsonData);
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
                link.download = 'barcode' + objet?.id + '.png';
                link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                link.click();
            });
        }
    };

    const deleteCouleurFetch = async (idCouleur: number | null) => {
        try {
            const response = await fetch(apiUrl + `couleurs?id=${idCouleur}`, {
                method: 'DELETE',
                headers: generateHeaderDelete()
            });

            if (response.ok) {
                if (objet) {
                    if(objet.type==="PROFIL"){
                        fetchProfil(objet?.id.toString());
                    } else if (objet.type === "ACCESSOIRE"){
                        fetchAccessoire(objet?.id.toString());
                    }
                    renderDetails();
                }
            } else {
                console.error('Delete request failed');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    const updateConsommable = async () => {
        try {
            // Mettez à jour les propriétés nécessaires de l'objet

            const response = await fetch(apiUrl + 'consommables', {
                method: 'PUT',
                headers: generateHeaderPut(),
                body: JSON.stringify(consommable),
            });

            if (response.ok) {

                // Vous pouvez appeler fetchData() pour récupérer les données mises à jour après le PUT
            } else {
                console.error('Erreur lors de la mise à jour de l\'objet.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };


    const updateProfil = async () => {
        try {
            // Mettez à jour les propriétés nécessaires de l'objet
            const response = await fetch(apiUrl + 'profils', {
                method: 'PUT',
                headers: generateHeaderPut(),
                body: JSON.stringify(profil),
            });

            if (response.ok) {
                console.log('Objet mis à jour avec succès.');
                if (objet) {
                    fetchProfil(objet.id.toString());
                    renderDetails();
                }
                // Vous pouvez appeler fetchData() pour récupérer les données mises à jour après le PUT
            } else {
                console.error('Erreur lors de la mise à jour de l\'objet.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };


    const updateAccessoire = async () => {
        try {
            // Mettez à jour les propriétés nécessaires de l'objet
            const response = await fetch(apiUrl + 'accessoires', {
                method: 'PUT',
                headers: generateHeaderPut(),
                body: JSON.stringify(accessoire),
            });

            if (response.ok) {
                console.log('Objet mis à jour avec succès.');
                if (objet) {
                    fetchAccessoire(objet.id.toString());
                    renderDetails();
                }
                // Vous pouvez appeler fetchData() pour récupérer les données mises à jour après le PUT
            } else {
                console.error('Erreur lors de la mise à jour de l\'objet.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };
    const updateProfilWithCouleur = async () => {
        try {
            // Mettez à jour les propriétés nécessaires de l'objet
            let updatedProfil = null;
            if (profil) {
                updatedProfil = {
                    ...profil,
                    couleurs: [
                        ...profil.couleurs,
                        couleurToBeEdited
                    ]
                };
            }

            console.log('old value');
            const response = await fetch(apiUrl + 'profils', {
                method: 'PUT',
                headers: generateHeaderPut(),
                body: JSON.stringify(updatedProfil),
            });

            if (response.ok) {
                console.log('Objet mis à jour avec succès.');
                if (objet) {
                    fetchProfil(objet.id.toString());
                    renderDetails();
                }
                // Vous pouvez appeler fetchData() pour récupérer les données mises à jour après le PUT
            } else {
                console.error('Erreur lors de la mise à jour de l\'objet.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };

    const updateAccessoireWithCouleur = async () => {
        try {
            // Mettez à jour les propriétés nécessaires de l'objet
            let updatedAccessoire = null;
            if (accessoire) {
                updatedAccessoire = {
                    ...accessoire,
                    couleurs: [
                        ...accessoire.couleurs,
                        couleurToBeEdited
                    ]
                };
            }

            console.log('old value');
            const response = await fetch(apiUrl + 'accessoires', {
                method: 'PUT',
                headers: generateHeaderPut(),
                body: JSON.stringify(updatedAccessoire),
            });

            if (response.ok) {
                console.log('Objet mis à jour avec succès.');
                if (objet) {
                    fetchAccessoire(objet.id.toString());
                    renderDetails();
                }
                // Vous pouvez appeler fetchData() pour récupérer les données mises à jour après le PUT
            } else {
                console.error('Erreur lors de la mise à jour de l\'objet.');
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };
    function saveColor() {
        addingColorInArray();
        updateProfilWithCouleur();
        setIsEditingColors(false);
    }

    function saveColorAccessoire() {
        addingColorInArrayAccessoire();
        updateAccessoireWithCouleur();
        setIsEditingColors(false);
    }

    function hideEditingColor() {
        setIsEditingColors(false);
        setCouleurToBeEdited({
            id: null,
            nomCouleur: "",
            metreLineaire: 0,
        })
    }

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


    const handleInputChangeProfil = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setProfil((prevObject) => ({
            ...prevObject!,
            [name]: value
        }));
    };

    const handleInputChangeAccessoire = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setAccessoire((prevObject) => ({
            ...prevObject!,
            [name]: value
        }));
    };
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

    const addingColorInArrayAccessoire = () => {
        setAccessoire((prevProfil) => {
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


    const handleInputChangeNewColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCouleurToBeEdited((prevObject) => ({
            ...prevObject!,
            [name]: value
        }));
    };

    useEffect(() => {
        if (objet) {
            if (objet.type === "CONSOMMABLE") {
                setConsommable(objet)
            } else if (objet.type === "PROFIL") {
                fetchProfil(objet.id.toString());
            } else if (objet.type === "ACCESSOIRE") {
                fetchAccessoire(objet.id.toString());
            }
        }
    }, [objet]);


    const handleInputConsommableRefBlur = () => {
        setEditingReference(false);
    };
    const handleInputProfilRefBlur = () => {
        setEditingReference(false);
    };

    const handleInputAccessoireRefBlur = () => {
        setEditingReference(false);
    };
    const handleInputPUBlur = () => {
        setEditingPU(false);
    };

    const handleInputConsommableQuantiteBlur = () => {
        setEditingQuantite(false);
    };
    const handleEditClickRef = () => {
        setEditingReference(true);
    };

    const handleEditClickConsommablePU = () => {
        setEditingPU(true);
    };

    const handleEditClickConsommableQuantite = () => {
        setEditingQuantite(true);
    };

    function handleSaveModif() {
        if (objet?.type === 'CONSOMMABLE') {
            updateConsommable();
        } else if (objet?.type === 'PROFIL') {
            console.log("update profil");
            updateProfil();
        } else if (objet?.type === 'ACCESSOIRE') {
            console.log("update accessoire");
            updateAccessoire();
        }
    }

    function editColors() {
        setIsEditingColors(true);
    }

    const deleteCouleur = (id: number | null) => {
        deleteCouleurFetch(id);
    };
    const renderDetails = () => {
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
                                    editingReference ? (

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
                                <Button onClick={handleEditClickRef} variant="primary">
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
                                    editingPU ? (
                                        <>
                                            <FormControl
                                                type="text"
                                                name="prixUnitaire"
                                                value={consommable.prixUnitaire}
                                                onChange={handleInputChange}
                                                onBlur={handleInputPUBlur}
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
                                    editingQuantite ?
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
                                <div id='barcode' style={{display: 'inline-block', padding: '0', margin: '0'}}>
                                    <Barcode value={consommable.id.toString()} format="CODE39"/>
                                    <div>
                                        {consommable.referenceProduit}
                                    </div>
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
                                Référence :
                            </Col>
                            <Col>


                                {editingReference ?
                                    (
                                        <FormControl
                                            type="text"
                                            name="referenceProduit"
                                            value={profil.referenceProduit}
                                            onChange={handleInputChangeProfil}
                                            onBlur={handleInputProfilRefBlur}
                                            autoFocus
                                        />
                                    ) : (
                                        <span>{profil.referenceProduit}</span>

                                    )
                                }
                            </Col>
                            <Col>
                                <Button onClick={handleEditClickRef}>Modifier</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Prix au metre linéaire :
                            </Col>
                            <Col>
                                {
                                    editingPU ? (
                                        <FormControl
                                            type="text"
                                            name="prixUnitaire"
                                            value={profil.prixUnitaire}
                                            onChange={handleInputChangeProfil}
                                            onBlur={handleInputPUBlur}
                                            autoFocus
                                        />
                                    ) : (
                                        <span>
                                            {profil?.prixUnitaire}
                                        </span>
                                    )
                                }
                            </Col>
                            <Col>
                                <Button onClick={handleEditClickConsommablePU} variant="primary">
                                    Modifier
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Longueur totale :
                            </Col>
                            <Col>
                                <span>{profil.quantiteOuMl}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Code barre :

                            </Col>
                            <Col>
                                <div id='barcode' style={{display: 'inline-block', padding: '0', margin: '0'}}>
                                    <Barcode value={profil.id.toString()} format="CODE39"/>
                                    <div>
                                        {profil.referenceProduit}
                                    </div>
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
                                Couleurs et tailles :
                            </Col>
                        </Row>
                        {
                            profil.couleurs.length > 0 ?
                                (
                                    <Table striped bordered>

                                        <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th>Quantité</th>
                                            <th>
                                                Action
                                            </th>
                                            <th>
                                                Sous total
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {profil.couleurs.map(
                                            (item) => (

                                                <tr>

                                                    <td>


                                                        {item.nomCouleur}

                                                    </td>


                                                    <td>
                                                        {item.metreLineaire}
                                                    </td>

                                                    <td>
                                                        <Button
                                                            onClick={() => deleteCouleur(item.id)}>Supprimer</Button>
                                                    </td>
                                                    <td>
                                                        {item.metreLineaire * profil.prixUnitaire}€
                                                    </td>
                                                </tr>

                                            )
                                        )}
                                        </tbody>
                                    </Table>) :
                                (<></>)
                        }

                        <br/>
                        <br/>

                        <Row>
                            {
                                isEditingColors ? (
                                    <>
                                        <Row>
                                            <Col>
                                                Nom couleur
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
                                                Nombre de metres linéaires
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
                                    </>

                                ) : (
                                    <>
                                        <Col>
                                            <Button onClick={editColors}>
                                                Ajouter une couleur
                                            </Button>
                                        </Col>
                                    </>
                                )
                            }

                        </Row>
                        <br/>
                        <br/>
                        <Row>
                            <Col>
                                <Button onClick={handleSaveModif}>Sauvegarder Modifications</Button>
                            </Col>

                        </Row>

                    </>
                )
                }

                {accessoire && (
                    <>
                        <Row>
                            <Col>
                                Référence :
                            </Col>
                            <Col>


                                {editingReference ?
                                    (
                                        <FormControl
                                            type="text"
                                            name="referenceProduit"
                                            value={accessoire.referenceProduit}
                                            onChange={handleInputChangeAccessoire}
                                            onBlur={handleInputAccessoireRefBlur}
                                            autoFocus
                                        />
                                    ) : (
                                        <span>{accessoire.referenceProduit}</span>

                                    )
                                }
                            </Col>
                            <Col>
                                <Button onClick={handleEditClickRef}>Modifier</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Prix unitaire :
                            </Col>
                            <Col>
                                {
                                    editingPU ? (
                                        <FormControl
                                            type="text"
                                            name="prixUnitaire"
                                            value={accessoire.prixUnitaire}
                                            onChange={handleInputChangeAccessoire}
                                            onBlur={handleInputPUBlur}
                                            autoFocus
                                        />
                                    ) : (
                                        <span>
                                            {accessoire?.prixUnitaire}
                                        </span>
                                    )
                                }
                            </Col>
                            <Col>
                                <Button onClick={handleEditClickConsommablePU} variant="primary">
                                    Modifier
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Quantité totale :
                            </Col>
                            <Col>
                                <span>{accessoire.quantiteOuMl}</span>
                            </Col>
                            <Col>
                                u
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Prix total :
                            </Col>
                            <Col>
                                <span>{accessoire.quantiteOuMl * accessoire.prixUnitaire}</span>
                            </Col>
                            <Col>
                                €
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Code barre :

                            </Col>
                            <Col>
                                <div id='barcode' style={{display: 'inline-block', padding: '0', margin: '0'}}>
                                    <Barcode value={accessoire.id.toString()} format="CODE39"/>
                                    <div>
                                        {accessoire.referenceProduit}
                                    </div>
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
                                Couleurs et tailles :
                            </Col>
                        </Row>
                        {
                            accessoire.couleurs.length > 0 ?
                                (
                                    <Table striped bordered>

                                        <thead>
                                        <tr>
                                            <th>Nom</th>
                                            <th>Quantité</th>
                                            <th>
                                                Action
                                            </th>
                                            <th>
                                                Sous total
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {accessoire.couleurs.map(
                                            (item) => (

                                                <tr>

                                                    <td>


                                                        {item.nomCouleur}

                                                    </td>


                                                    <td>
                                                        {item.metreLineaire}
                                                    </td>

                                                    <td>
                                                        <Button
                                                            onClick={() => deleteCouleur(item.id)}>Supprimer</Button>
                                                    </td>
                                                    <td>
                                                        {item.metreLineaire * accessoire.prixUnitaire}€
                                                    </td>
                                                </tr>

                                            )
                                        )}
                                        </tbody>
                                    </Table>) :
                                (<></>)
                        }

                        <br/>
                        <br/>

                        <Row>
                            {
                                isEditingColors ? (
                                    <>
                                        <Row>
                                            <Col>
                                                Nom couleur
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
                                                Nombre de metres linéaires
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
                                            <Col> <Button onClick={saveColorAccessoire}>Sauvegarder</Button></Col>
                                            <Col><Button onClick={hideEditingColor}>Annuler</Button></Col>

                                        </Row>
                                    </>

                                ) : (
                                    <>
                                        <Col>
                                            <Button onClick={editColors}>
                                                Ajouter une couleur
                                            </Button>
                                        </Col>
                                    </>
                                )
                            }

                        </Row>
                        <br/>
                        <br/>
                        <Row>
                            <Col>
                                <Button onClick={handleSaveModif}>Sauvegarder Modifications</Button>
                            </Col>

                        </Row>

                    </>
                )
                }

            </>
        );
    };
    return (renderDetails())
};

export default DetailObjet;
