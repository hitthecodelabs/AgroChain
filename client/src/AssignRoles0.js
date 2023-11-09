import React, { useState, useEffect } from 'react';
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json";
import { useHistory } from "react-router-dom";
import './Home.css';

function AssignRoles() {
    const history = useHistory()
    useEffect(() => {
        loadWeb3();
        loadBlockchaindata();
    }, [])
    const [currentaccount, setCurrentaccount] = useState("");
    const [loader, setloader] = useState(true);
    const [SupplyChain, setSupplyChain] = useState();
    const [PRODname, setPRODname] = useState();
    const [PROCname, setPROCname] = useState();
    const [DISname, setDISname] = useState();
    const [MAYname, setMAYname] = useState();
    const [PRODplace, setPRODplace] = useState();
    const [PROCplace, setPROCplace] = useState();
    const [DISplace, setDISplace] = useState();
    const [MAYplace, setMAYplace] = useState();
    const [PRODaddress, setPRODaddress] = useState();
    const [PROCaddress, setPROCaddress] = useState();
    const [DISaddress, setDISaddress] = useState();
    const [MAYaddress, setMAYaddress] = useState();
    const [PROD, setPROD] = useState();
    const [PROC, setPROC] = useState();
    const [DIS, setDIS] = useState();
    const [MAY, setMAY] = useState();

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
            const prodCtr = await supplychain.methods.prodCtr().call();
            const prod = {};
            for (i = 0; i < prodCtr; i++) {
                prod[i] = await supplychain.methods.PROD(i + 1).call();
            }
            setPROD(prod);
            const procCtr = await supplychain.methods.procCtr().call();
            const proc = {};
            for (i = 0; i < procCtr; i++) {
                proc[i] = await supplychain.methods.PROC(i + 1).call();
            }
            setPROC(proc);
            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (i = 0; i < disCtr; i++) {
                dis[i] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);
            const mayCtr = await supplychain.methods.mayCtr().call();
            const may = {};
            for (i = 0; i < mayCtr; i++) {
                may[i] = await supplychain.methods.MAY(i + 1).call();
            }
            setMAY(may);
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
    const handlerChangeAddressPROD = (event) => {
        setPRODaddress(event.target.value);
    }
    const handlerChangePlacePROD = (event) => {
        setPRODplace(event.target.value);
    }
    const handlerChangeNamePROD = (event) => {
        setPRODname(event.target.value);
    }
    const handlerChangeAddressPROC = (event) => {
        setPROCaddress(event.target.value);
    }
    const handlerChangePlacePROC = (event) => {
        setPROCplace(event.target.value);
    }
    const handlerChangeNamePROC = (event) => {
        setPROCname(event.target.value);
    }
    const handlerChangeAddressDIS = (event) => {
        setDISaddress(event.target.value);
    }
    const handlerChangePlaceDIS = (event) => {
        setDISplace(event.target.value);
    }
    const handlerChangeNameDIS = (event) => {
        setDISname(event.target.value);
    }
    const handlerChangeAddressMAY = (event) => {
        setMAYaddress(event.target.value);
    }
    const handlerChangePlaceMAY = (event) => {
        setMAYplace(event.target.value);
    }
    const handlerChangeNameMAY = (event) => {
        setMAYname(event.target.value);
    }
    const handlerSubmitPROD = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addPROD(PRODaddress, PRODname, PRODplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitPROC = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addProcesador(PROCaddress, PROCname, PROCplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitDIS = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addDistribuidor(DISaddress, DISname, DISplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }
    const handlerSubmitMAY = async (event) => {
        event.preventDefault();
        try {
            var reciept = await SupplyChain.methods.addMayorista(MAYaddress, MAYname, MAYplace).send({ from: currentaccount });
            if (reciept) {
                loadBlockchaindata();
            }
        }
        catch (err) {
            alert("An error occured!!!")
        }
    }



    return (
        <div>
            <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm">HOME</span>
            <br />
            <span><b>Billetera Conectada:  </b> {currentaccount}</span>
            <br />
            <br />
                
            <h4>Productores:</h4>
            <form onSubmit={handlerSubmitPROD}>
                <input className="form-control-sm" type="text" onChange={handlerChangeAddressPROD} placeholder="Billetera Asignada" required />
                <input className="form-control-sm" type="text" onChange={handlerChangeNamePROD} placeholder="Productor" required />
                <input className="form-control-sm" type="text" onChange={handlerChangePlacePROD} placeholder="Locación" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitPROD}>Registrar</button>
            </form>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Lugar</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(PROD).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{PROD[key].id}</td>
                                <td>{PROD[key].name}</td>
                                <td>{PROD[key].place}</td>
                                <td>{PROD[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <h4>Procesadores:</h4>
            <form onSubmit={handlerSubmitPROC}>
                <input className="form-control-sm" type="text" onChange={handlerChangeAddressPROC} placeholder="Billetera Asignada" required />
                <input className="form-control-sm" type="text" onChange={handlerChangeNamePROC} placeholder="Procesador" required />
                <input className="form-control-sm" type="text" onChange={handlerChangePlacePROC} placeholder="Locación" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitPROC}>Registrar</button>
            </form>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Lugar</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(PROC).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{PROC[key].id}</td>
                                <td>{PROC[key].name}</td>
                                <td>{PROC[key].place}</td>
                                <td>{PROC[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h4>Distribudores:</h4>
            <form onSubmit={handlerSubmitDIS}>
                <input className="form-control-sm" type="text" onChange={handlerChangeAddressDIS} placeholder="Billetera Asignada" required />
                <input className="form-control-sm" type="text" onChange={handlerChangeNameDIS} placeholder="Distribuidor" required />
                <input className="form-control-sm" type="text" onChange={handlerChangePlaceDIS} placeholder="Locación" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitDIS}>Registrar</button>
            </form>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Lugar</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(DIS).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{DIS[key].id}</td>
                                <td>{DIS[key].name}</td>
                                <td>{DIS[key].place}</td>
                                <td>{DIS[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h4>Mayoristas:</h4>
            <form onSubmit={handlerSubmitMAY}>
                <input className="form-control-sm" type="text" onChange={handlerChangeAddressMAY} placeholder="Billetera Asignada" required />
                <input className="form-control-sm" type="text" onChange={handlerChangeNameMAY} placeholder="Mayorista" required />
                <input className="form-control-sm" type="text" onChange={handlerChangePlaceMAY} placeholder="Locación" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmitMAY}>Registrar</button>
            </form>
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Lugar</th>
                        <th scope="col">Ethereum Address</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(MAY).map(function (key) {
                        return (
                            <tr key={key}>
                                <td>{MAY[key].id}</td>
                                <td>{MAY[key].name}</td>
                                <td>{MAY[key].place}</td>
                                <td>{MAY[key].addr}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AssignRoles
