import React from 'react'
import ConnectButton from './ConnectButton';
import { useHistory, useState } from "react-router-dom";

function Home() {
  const history = useHistory();
  const [showConnectButton, setShowConnectButton] = useState(false);

  const redirect_to_roles = () => {
    setShowConnectButton(true);
  }
  const redirect_to_add = () => {
    setShowConnectButton(true);
  }
  const redirect_to_supply = () => {
    setShowConnectButton(true);
  }
  const redirect_to_track = () => {
    setShowConnectButton(true);
  }
  const connect = () => {
    history.push('/connect');
  }
  
  return (
      <div>
        <h3>Pitahaya Supply Chain Flow</h3>
        <br />
        <h6>(Nota: En este contexto, <u>Owner</u> es quien manda a correr el entorno web, con los contratos inteligentes.)</h6>
        <h5>Step 1: Owner deberá registrar a los Productores, Procesadores, Distribuidores y Mayoristas</h5>
        <h6>(Note: This is a one time step. Skip to step 2 if already done)</h6>
        <button onClick={redirect_to_roles} className="btn btn-outline-primary btn-sm">Register</button>
        <br />
        <h5>Step 2: Owner should order cargamentos</h5>
        <button onClick={redirect_to_add} className="btn btn-outline-primary btn-sm">Order cargamentos</button>
        <br />
        <h5>Step 3: Control Supply Chain</h5>
        <button onClick={redirect_to_supply} className="btn btn-outline-primary btn-sm">Control Supply Chain</button>
        <br />
        <hr />
        <br />
        <h5><b>Track</b> the cargamentos:</h5>
        <button onClick={redirect_to_track} className="btn btn-outline-primary btn-sm">Trazar cargamentos</button>
        {showConnectButton && <ConnectButton onClick={connect} />}
      </div>
    );
}

export default Home