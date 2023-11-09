import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Web3 from "web3";
import SupplyChainABI from "./artifacts/SupplyChain.json"

function Track() {
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
    const [PROD, setPROD] = useState();
    const [PROC, setPROC] = useState();
    const [DIS, setDIS] = useState();
    const [MAY, setMAY] = useState();
    const [TrackTillVenta, showTrackTillVenta] = useState(false);
    const [TrackTillMay, showTrackTillMay] = useState(false);
    const [TrackTillDist, showTrackTillDist] = useState(false);
    const [TrackTillProc, showTrackTillProc] = useState(false);
    const [TrackTillProd, showTrackTillProd] = useState(false);
    const [TrackTillOrd, showTrackTillOrd] = useState(false);

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
                ord[i + 1] = await supplychain.methods.Inventario(i + 1).call();
                ordStage[i + 1] = await supplychain.methods.mostrarEtapa(i + 1).call();
            }
            setORD(ord);
            setOrdStage(ordStage);
            const prodCtr = await supplychain.methods.prodCtr().call();
            const prod = {};
            for (i = 0; i < prodCtr; i++) {
                prod[i + 1] = await supplychain.methods.PROD(i + 1).call();
            }
            setPROD(prod);
            const procCtr = await supplychain.methods.procCtr().call();
            const proc = {};
            for (i = 0; i < procCtr; i++) {
                proc[i + 1] = await supplychain.methods.PROC(i + 1).call();
            }
            setPROC(proc);
            const disCtr = await supplychain.methods.disCtr().call();
            const dis = {};
            for (i = 0; i < disCtr; i++) {
                dis[i + 1] = await supplychain.methods.DIS(i + 1).call();
            }
            setDIS(dis);
            const mayCtr = await supplychain.methods.mayCtr().call();
            const may = {};
            for (i = 0; i < mayCtr; i++) {
                may[i + 1] = await supplychain.methods.MAY(i + 1).call();
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
    if (TrackTillVenta) {
        return (
            <div className="container-xl">
                <article className="col-4">
                    <h3><b><u>Orden:</u></b></h3>
                    <span><b>Order ID: </b>{ORD[ID].id}</span>
                    <br />
                    <span><b>Nombre:</b> {ORD[ID].name}</span>
                    <br />
                    <span><b>Descripión: </b>{ORD[ID].description}</span>
                    <br />
                    <span><b>Estado actual: </b>{OrdStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3">
                        <h4><u>Productor:</u></h4>
                        <p><b>ID: </b>{PROD[ORD[ID].PRODid].id}</p>
                        <p><b>Nombre:</b> {PROD[ORD[ID].PRODid].name}</p>
                        <p><b>Locación: </b>{PROD[ORD[ID].PRODid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Procesador:</u></h4>
                        <p><b>ID: </b>{PROC[ORD[ID].PROCid].id}</p>
                        <p><b>Nombre:</b> {PROC[ORD[ID].PROCid].name}</p>
                        <p><b>Locación: </b>{PROC[ORD[ID].PROCid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Distribuidor:</u></h4>
                        <p><b>ID: </b>{DIS[ORD[ID].DISid].id}</p>
                        <p><b>Nombre:</b> {DIS[ORD[ID].DISid].name}</p>
                        <p><b>Locación: </b>{DIS[ORD[ID].DISid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Mayorista:</u></h4>
                        <p><b>ID: </b>{MAY[ORD[ID].MAYid].id}</p>
                        <p><b>Nombre:</b> {MAY[ORD[ID].MAYid].name}</p>
                        <p><b>Locación: </b>{MAY[ORD[ID].MAYid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Orden vendida</u></h4>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillVenta(false);
                }} className="btn btn-outline-success btn-sm">Trazar otra orden</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillMay) {
        return (
            <div className="container-xl">
                <article className="col-4">
                    <h3><b><u>Orden:</u></b></h3>
                    <span><b>ID: </b>{ORD[ID].id}</span>
                    <br />
                    <span><b>Nombre:</b> {ORD[ID].name}</span>
                    <br />
                    <span><b>Descripción: </b>{ORD[ID].description}</span>
                    <br />
                    <span><b>Estado actual: </b>{OrdStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3">
                        <h4><u>Entregado por:</u></h4>
                        <p><b>ID: </b>{PROD[ORD[ID].PRODid].id}</p>
                        <p><b>Nombre:</b> {PROD[ORD[ID].PRODid].name}</p>
                        <p><b>Locación: </b>{PROD[ORD[ID].PRODid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Procesado por:</u></h4>
                        <p><b>ID: </b>{PROC[ORD[ID].PROCid].id}</p>
                        <p><b>Nombre:</b> {PROC[ORD[ID].PROCid].name}</p>
                        <p><b>Locación: </b>{PROC[ORD[ID].PROCid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Distribuido por:</u></h4>
                        <p><b>ID: </b>{DIS[ORD[ID].DISid].id}</p>
                        <p><b>Nombre:</b> {DIS[ORD[ID].DISid].name}</p>
                        <p><b>Locación: </b>{DIS[ORD[ID].DISid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Recibido por:</u></h4>
                        <p><b>ID: </b>{MAY[ORD[ID].MAYid].id}</p>
                        <p><b>Nombre:</b> {MAY[ORD[ID].MAYid].name}</p>
                        <p><b>Locación: </b>{MAY[ORD[ID].MAYid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillMay(false);
                }} className="btn btn-outline-success btn-sm">Trazar otra orden</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillDist) {
        return (
            <div className="container-xl">
                <article className="col-4">
                    <h3><b><u>Orden:</u></b></h3>
                    <span><b>ID: </b>{ORD[ID].id}</span>
                    <br />
                    <span><b>Nombre:</b> {ORD[ID].name}</span>
                    <br />
                    <span><b>Descripción: </b>{ORD[ID].description}</span>
                    <br />
                    <span><b>Estado actual: </b>{OrdStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3">
                        <h4><u>Entregado por:</u></h4>
                        <p><b>ID: </b>{PROD[ORD[ID].PRODid].id}</p>
                        <p><b>Nombre:</b> {PROD[ORD[ID].PRODid].name}</p>
                        <p><b>Locación: </b>{PROD[ORD[ID].PRODid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Procesado por:</u></h4>
                        <p><b>ID: </b>{PROC[ORD[ID].PROCid].id}</p>
                        <p><b>Nombre:</b> {PROC[ORD[ID].PROCid].name}</p>
                        <p><b>Locación: </b>{PROC[ORD[ID].PROCid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Distribuido por:</u></h4>
                        <p><b>ID: </b>{DIS[ORD[ID].DISid].id}</p>
                        <p><b>Nombre:</b> {DIS[ORD[ID].DISid].name}</p>
                        <p><b>Locación: </b>{DIS[ORD[ID].DISid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillDist(false);
                }} className="btn btn-outline-success btn-sm">Trazar otra orden</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillProc) {
        return (
            <div className="container-xl">
                <article className="col-4">
                    <h3><b><u>Orden:</u></b></h3>
                    <span><b>ID: </b>{ORD[ID].id}</span>
                    <br />
                    <span><b>Nombre:</b> {ORD[ID].name}</span>
                    <br />
                    <span><b>Descripción: </b>{ORD[ID].description}</span>
                    <br />
                    <span><b>Estado actual: </b>{OrdStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3">
                        <h4><u>Entregado por:</u></h4>
                        <p><b>ID: </b>{PROD[ORD[ID].PRODid].id}</p>
                        <p><b>Npmbre:</b> {PROD[ORD[ID].PRODid].name}</p>
                        <p><b>Locación: </b>{PROD[ORD[ID].PRODid].place}</p>
                    </article>
                    <span>&#10132;</span>
                    <article className="col-3">
                        <h4><u>Procesado por:</u></h4>
                        <p><b>ID: </b>{PROC[ORD[ID].PROCid].id}</p>
                        <p><b>Nombre:</b> {PROC[ORD[ID].PROCid].name}</p>
                        <p><b>Locación: </b>{PROC[ORD[ID].PROCid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillProc(false);
                }} className="btn btn-outline-success btn-sm">Trazar otra orden</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillProd) {
        return (
            <div className="container-xl">
                <article className="col-4">
                    <h3><b><u>Orden:</u></b></h3>
                    <span><b>ID: </b>{ORD[ID].id}</span>
                    <br />
                    <span><b>Nombre:</b> {ORD[ID].name}</span>
                    <br />
                    <span><b>Descripión: </b>{ORD[ID].description}</span>
                    <br />
                    <span><b>Estado actual: </b>{OrdStage[ID]}</span>
                </article>
                <hr />
                <br />
                <section className="row">

                    <article className="col-3">
                        <h4><u>Entregado por:</u></h4>
                        <p><b>ID: </b>{PROD[ORD[ID].PRODid].id}</p>
                        <p><b>Nombre:</b> {PROD[ORD[ID].PRODid].name}</p>
                        <p><b>Locación: </b>{PROD[ORD[ID].PRODid].place}</p>
                    </article>
                </section>
                <button onClick={() => {
                    showTrackTillProd(false);
                }} className="btn btn-outline-success btn-sm">Trazar otra orden</button>
                <span onClick={() => {
                    history.push('/')
                }} className="btn btn-outline-danger btn-sm"> HOME</span>
            </div >
        )
    }
    if (TrackTillOrd) {
        return (
            <div className="container-xl">
                <article className="col-4">
                    <h3><b><u>Orden:</u></b></h3>
                    <span><b>ID: </b>{ORD[ID].id}</span>
                    <br />
                    <span><b>Nombre:</b> {ORD[ID].name}</span>
                    <br />
                    <span><b>Descripión: </b>{ORD[ID].description}</span>
                    <br />
                    <span><b>Estado actual: </b>{OrdStage[ID]}</span>
                    <hr />
                    <br />
                    <h5>Orden no procesada al momento</h5>
                    <button onClick={() => {
                        showTrackTillOrd(false);
                    }} className="btn btn-outline-success btn-sm">Trazar otra orden</button>
                    <span onClick={() => {
                        history.push('/')
                    }} className="btn btn-outline-danger btn-sm"> HOME</span>
                </article>
                {/* <section className="row">
                    
                    <article className="col-3">
                        <h4><u>Entregado por:</u></h4>
                        <p><b>ID: </b>{PROD[ORD[ID].PRODid].id}</p>
                        <p><b>Nombre:</b> {PROD[ORD[ID].PRODid].name}</p>
                        <p><b>Locación: </b>{PROD[ORD[ID].PRODid].place}</p>
                    </article>
                </section> */}
            </div >
        )
    }
    const handlerChangeID = (event) => {
        setID(event.target.value);
    }
    const redirect_to_home = () => {
        history.push('/')
    }
    const handlerSubmit = async (event) => {
        event.preventDefault();
        var ctr = await SupplyChain.methods.pedidosCtr().call();
        if (!((ID > 0) && (ID <= ctr)))
            alert("ID no existente!");
        else {
            // eslint-disable-next-line
            if (ORD[ID].stage == 5)
                showTrackTillVenta(true);
            // eslint-disable-next-line
            else if (ORD[ID].stage == 4)
                showTrackTillMay(true);
            // eslint-disable-next-line
            else if (ORD[ID].stage == 3)
                showTrackTillDist(true);
            // eslint-disable-next-line
            else if (ORD[ID].stage == 2)
                showTrackTillProc(true);
            // eslint-disable-next-line
            else if (ORD[ID].stage == 1)
                showTrackTillProd(true);
            else
                showTrackTillOrd(true);

        }
    }

    return (
        <div>
            <span onClick={redirect_to_home} className="btn btn-outline-danger btn-sm">HOME</span>
            <br />
            <span><b>Billetera Conectada:  </b> {currentaccount}</span>
            <br />
            <br />
            <table className="table table-sm table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Orden</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Estado actual</th>
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
            <h5>Ingresar ID para iniciar trazabilidad</h5>

            <form onSubmit={handlerSubmit}>
                <input className="form-control-sm" type="text" onChange={handlerChangeID} placeholder="Ingresar ID" required />
                <button className="btn btn-outline-success btn-sm" onSubmit={handlerSubmit}>Trazar</button>
            </form>
        </div>
    )
}

export default Track
