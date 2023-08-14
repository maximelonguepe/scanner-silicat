import React, { useState, useEffect } from "react";
import { Table,Button } from "react-bootstrap";
import Barcode from "react-barcode";
import {Link} from "react-router-dom";
import {apiUrl, Objet} from "./types";
const ListeObjets = () => {
    const [objets, setObjets] = useState<Objet[]>([]);
    const fetchObjets = async () => {
        try {
            const response = await fetch(apiUrl+'objets');
            const jsonData = await response.json();
            setObjets(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchObjets();
    }, []);

    return (
        <>
            <br />
            <br />
            {objets.length > 0 ? (
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
                                {item.prixUnitaire*item.quantiteOuMl}
                            </td>
                            <td>
                                <Barcode value={item.id.toString()} format="CODE39" />
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
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default ListeObjets;
