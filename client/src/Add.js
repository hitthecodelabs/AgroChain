import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"
import { Card, Button, Alert } from 'react-bootstrap';

function Add() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])

    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [ORD, setORD] = useState();
    const [OrdName, setOrdName] = useState();
    const [OrdDes, setOrdDes] = useState();
    const [OrdStage, setOrdStage] = useState();


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
    const handlerChangeNameORD = (event) => {
        setOrdName(event.target.value);
    }
    const handlerChangeDesORD = (event) => {
        setOrdDes(event.target.value);
    }
    const handlerSubmitORD = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addOrder(OrdName, OrdDes).send({ from: currentaccount });
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
                <Card.Header as="h5">Agregar orden:</Card.Header>
                <Card.Body>
                    <form onSubmit={handlerSubmitORD} className="form-inline d-flex align-items-center">
                        <input className="form-control-sm mr-2" type="text" onChange={handlerChangeNameORD} placeholder="Nombre del cargamento" required />
                        <input className="form-control-sm mr-2" type="text" onChange={handlerChangeDesORD} placeholder="Descripción del cargamento" required />
                        <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitORD}>Registrar</button>
                    </form>
                </Card.Body>
            </Card>

            <Card className="step-card">
                <Card.Header as="h5">Órdenes:</Card.Header>
                <Card.Body>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Orden</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Estado Actual</th>
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
        </div>
    )
}

export default Add
