import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import { Card, Button, Alert } from 'react-bootstrap';

function Supply() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [ORD, setORD] = useState();
    const [OrdStage, setOrdStage] = useState();
    const [ID, setID] = useState();


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
    const loadBlockchaindata = async () => {
        setloader(true);
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const networkId = await web3.eth.net.getId();
        const networkData = SupplyChainABI.networks[networkId];
        if (networkData) {
            const supplychain = new web3.eth.Contract(SupplyChainABI.abi, networkData.address);
            setSupplyChain(supplychain);
            var i;
            const ordCtr = await supplychain.methods.pedidosCtr().call();
            const ord = {};
            const ordStage = [];
            for (i = 0; i < ordCtr; i++) {
                ord[i] = await supplychain.methods.Inventario(i + 1).call();
                ordStage[i] = await supplychain.methods.mostrarEtapa(i + 1).call();
            }
            setORD(ord);
            setOrdStage(ordStage);
            setloader(false);
        }
        else {
            window.alert('The smart contract is not deployed to current network')
        }
    }
    if (loader) {
        return (
            <div>
                <h1 className="wait">Loading...</h1>
            </div>
        )

    }
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const handlerSubmitPRODsupply = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.PRODsupply(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitProcesador = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Procesando(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitDistribuidor = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Distribuir(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitMayorista = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.Mayoreo(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitSold = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.sold(ID).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    return (
        <div className="orders">
            <Alert variant="primary">
                <b>Billetera Conectada:</b> {currentaccount}
            </Alert>

            <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm">HOME</span>

            <Card className="step-card">
                <Card.Header as="h6"><b>Etapas de la Cadena de Suministro:</b></Card.Header>
                <Card.Body>
                    <p>Etapas:  Productor -&gt; Procesador -&gt; Distribuidor -&gt; Mayorista -&gt; Consumidor Final</p>
                </Card.Body>
            </Card>

            <Card className="step-card">
                <Card.Header as="h6">Órdenes:</Card.Header>
                <Card.Body>
                    <table className="table table-sm table-dark">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Orden</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Etapa actual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(ORD).map(function (key) {
                                return (
                                    <tr key={key}>
                                        <td>{ORD[key].id}</td>
                                        <td>{ORD[key].name}</td>
                                        <td>{ORD[key].description}</td>
                                        <td>
                                            {
                                                OrdStage[key]
                                            }
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </Card.Body>
            </Card>

            {[...Array(5).keys()].map(i => (
                <Card className="step-card">
                    <Card.Header as="h5"><b>Step {i + 1}: {["Productor", "Procesador", "Distribuidor", "Mayorista", "Venta realizada"][i]}</b> (Únicamente un {["Productor", "Procesador", "Distribuidor", "Mayorista", "Mayorista"][i]} registrado puede realizar este paso.)</Card.Header>
                    <Card.Body>
                        <form onSubmit={handlerSubmitPRODsupply} className="form-group">
                            <input className="form-control-sm mb-2" type="text" onChange={handlerChangeID} placeholder="Order ID" required />
                            <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitPRODsupply}>{["Productor", "Procesador", "Distribuidor", "Mayorista", "Consumidor Final"][i]}</button>
                        </form>
                    </Card.Body>
                </Card>
            ))}
        </div>
    )
}

export default Supply
