import React, { useState, useEffect } from 'react';
import Web3 from "web3";

import 'bootstrap/dist/css/bootstrap.min.css';

// import SupplyChainABI from "./artifacts/SupplyChain.json";
import { useHistory } from "react-router-dom";
import { Card, Button, Alert } from 'react-bootstrap';
import './Home.css'; // 

function Home() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])
    const [currentaccount, setCurrentaccount] = useState("");
    // eslint-disable-next-line
    const [loader, setloader] = useState(true);
    const redirect_to_roles = () => {
        history.push('/roles')
    }
    const redirect_to_add = () => {
        history.push('/add')
    }
    const redirect_to_supply = () => {
        history.push('/supply')
    }
    const redirect_to_track = () => {
        history.push('/track')
    }
    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
    }
    
    const loadWeb3 = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert(
                "Non-Ethereum browser detected. You should consider trying MetaMask!"
            );
        }
    };

    return (
        <div className="home">
            <Alert variant="primary">
                <b>Billetera conectada:</b> {currentaccount}
            </Alert>
            
            <Card className="step-card">
                <Card.Header as="h5" className="header-title">Pitahaya Supply Chain Flow</Card.Header>
                <Card.Body>
                    <Card.Title>Step 1: Admin deberá registrar a los Productores, Procesadores, Distribuidores y Mayoristas</Card.Title>
                    <Card.Text>
                        Nota: En este contexto, <b>Admin</b> es quien manda a correr el entorno web, con los contratos inteligentes.
                    </Card.Text>
                    <Button variant="primary" onClick={redirect_to_roles}>Registrar</Button>
                </Card.Body>
            </Card>

            <Card className="step-card">
                <Card.Body>
                    <Card.Title>Step 2: Realizar pedidos</Card.Title>
                    <Button variant="primary" onClick={redirect_to_add}>Ordenar</Button>
                </Card.Body>
            </Card>

            <Card className="step-card">
                <Card.Body>
                    <Card.Title>Step 3: Actualizar cadena de suministro</Card.Title>
                    <Button variant="primary" onClick={redirect_to_supply}>Actualizar</Button>
                </Card.Body>
            </Card>

            <hr />

            <Card className="step-card">
                <Card.Header as="h5">Trazabilidad de pedidos</Card.Header>
                <Card.Body>
                    <Button variant="primary" onClick={redirect_to_track}>Seguimiento</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Home
