import {Button, Col, Form, Row} from "react-bootstrap";
import Barcode from "react-barcode";
import {ChangeEvent, SetStateAction, useState} from "react";
import React from 'react';
import html2canvas from "html2canvas";

const Generatecodebarre = () => {
    const [codeAGenerer, setCodeAGenerer] = useState('');
    const [valeur, setValeur] = useState('');

    //valeur :
    //20446147
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // Mettre à jour l'état avec la nouvelle valeur saisie
        setCodeAGenerer(event.target.value);
    };

    function onClickGenerate() {
        setValeur(codeAGenerer);
    }
    function handleDownload() {
        const barcodeDiv = document.getElementById('barcode');
        if (barcodeDiv) {
            html2canvas(barcodeDiv).then((canvas) => {
                const link = document.createElement('a');
                link.download = 'barcode'+codeAGenerer+'.png';
                link.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                link.click();
            });
        }
    }

    return (
        <>
            <br/>
            <br/>
            <br/>
            <br/>

            <Form>
                <Row>

                    <Form.Group as={Row}>
                        <Col>
                            <Form.Label>
                                Code de référence produit
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type='text' placeholder='Valeur' value={codeAGenerer}
                                          onChange={handleChange}/>
                        </Col>
                        <Col>
                            <Button onClick={onClickGenerate}>
                                Générer
                            </Button>
                        </Col>

                    </Form.Group>
                </Row>
            </Form>
            <div id='barcode' style={{ display: 'inline-block', padding: '0', margin: '0' }}>
                <Barcode value={valeur} format="CODE39"></Barcode>
            </div>
            <Button onClick={handleDownload}>
                Telecharger
            </Button>
        </>
    )
}
export default Generatecodebarre;