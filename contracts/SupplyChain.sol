// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SupplyChain {
    address public Owner;

    constructor() public {
        Owner = msg.sender;
    }

    modifier onlyByOwner() {
        require(msg.sender == Owner);
        _;
    }

    enum STAGE {Init, Productor, Procesador, Distribuidor, Mayorista, sold}

    uint256 public pedidosCtr = 0;
    uint256 public prodCtr = 0;
    uint256 public procCtr = 0;
    uint256 public disCtr = 0;
    uint256 public mayCtr = 0;

    struct pedido {uint256 id; string name; string description; uint256 PRODid; uint256 PROCid; uint256 DISid; uint256 MAYid; STAGE stage; }

    mapping(uint256 => pedido) public Inventario;

    function mostrarEtapa(uint256 _orderID)
        public
        view
        returns (string memory)
    {
        require(pedidosCtr > 0);
        if (Inventario[_orderID].stage == STAGE.Init)
            return "Orden en cola";
        else if (Inventario[_orderID].stage == STAGE.Productor)
            return "Orden en produccion";
        else if (Inventario[_orderID].stage == STAGE.Procesador)
            return "Orden procesada";
        else if (Inventario[_orderID].stage == STAGE.Distribuidor)
            return "Orden distribuida";
        else if (Inventario[_orderID].stage == STAGE.Mayorista)
            return "Orden a la venta";
        else if (Inventario[_orderID].stage == STAGE.sold)
            return "Orden vendida";
    }

    struct productor {address addr;uint256 id;string name;string place;}

    mapping(uint256 => productor) public PROD;

    struct procesador {address addr;uint256 id; string name; string place; }

    mapping(uint256 => procesador) public PROC;

    struct distribuidor {address addr;uint256 id; string name; string place; }

    mapping(uint256 => distribuidor) public DIS;

    struct mayorista {address addr;uint256 id; string name; string place; }

    mapping(uint256 => mayorista) public MAY;

    function addPROD(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        prodCtr++;
        PROD[prodCtr] = productor(_address, prodCtr, _name, _place);
    }

    function addProcesador(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        procCtr++;
        PROC[procCtr] = procesador(_address, procCtr, _name, _place);
    }

    function addDistribuidor(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        disCtr++;
        DIS[disCtr] = distribuidor(_address, disCtr, _name, _place);
    }

    function addMayorista(
        address _address,
        string memory _name,
        string memory _place
    ) public onlyByOwner() {
        mayCtr++;
        MAY[mayCtr] = mayorista(_address, mayCtr, _name, _place);
    }

    function PRODsupply(uint256 _orderID) public {
        require(_orderID > 0 && _orderID <= pedidosCtr);
        uint256 _id = findPROD(msg.sender);
        require(_id > 0);
        require(Inventario[_orderID].stage == STAGE.Init);
        Inventario[_orderID].PRODid = _id;
        Inventario[_orderID].stage = STAGE.Productor;
    }

    function findPROD(address _address) private view returns (uint256) {
        require(prodCtr > 0);
        for (uint256 i = 1; i <= prodCtr; i++) {
            if (PROD[i].addr == _address) return PROD[i].id;
        }
        return 0;
    }

    function Procesando(uint256 _orderID) public {
        require(_orderID > 0 && _orderID <= pedidosCtr);
        uint256 _id = findPROC(msg.sender);
        require(_id > 0);
        require(Inventario[_orderID].stage == STAGE.Productor);
        Inventario[_orderID].PROCid = _id;
        Inventario[_orderID].stage = STAGE.Procesador;
    }

    function findPROC(address _address) private view returns (uint256) {
        require(procCtr > 0);
        for (uint256 i = 1; i <= procCtr; i++) {
            if (PROC[i].addr == _address) return PROC[i].id;
        }
        return 0;
    }

    function Distribuir(uint256 _orderID) public {
        require(_orderID > 0 && _orderID <= pedidosCtr);
        uint256 _id = findDIS(msg.sender);
        require(_id > 0);
        require(Inventario[_orderID].stage == STAGE.Procesador);
        Inventario[_orderID].DISid = _id;
        Inventario[_orderID].stage = STAGE.Distribuidor;
    }

    function findDIS(address _address) private view returns (uint256) {
        require(disCtr > 0);
        for (uint256 i = 1; i <= disCtr; i++) {
            if (DIS[i].addr == _address) return DIS[i].id;
        }
        return 0;
    }

    function Mayoreo(uint256 _orderID) public {
        require(_orderID > 0 && _orderID <= pedidosCtr);
        uint256 _id = findMAY(msg.sender);
        require(_id > 0);
        require(Inventario[_orderID].stage == STAGE.Distribuidor);
        Inventario[_orderID].MAYid = _id;
        Inventario[_orderID].stage = STAGE.Mayorista;
    }

    function findMAY(address _address) private view returns (uint256) {
        require(mayCtr > 0);
        for (uint256 i = 1; i <= mayCtr; i++) {
            if (MAY[i].addr == _address) return MAY[i].id;
        }
        return 0;
    }

    function sold(uint256 _orderID) public {
        require(_orderID > 0 && _orderID <= pedidosCtr);
        uint256 _id = findMAY(msg.sender);
        require(_id > 0);
        require(_id == Inventario[_orderID].MAYid);
        require(Inventario[_orderID].stage == STAGE.Mayorista);
        Inventario[_orderID].stage = STAGE.sold;
    }

    function addOrder(string memory _name, string memory _description)
        public
        onlyByOwner()
    {
        require((prodCtr > 0) && (procCtr > 0) && (disCtr > 0) && (mayCtr > 0));
        pedidosCtr++;
        Inventario[pedidosCtr] = pedido(
            pedidosCtr,
            _name,
            _description,
            0,
            0,
            0,
            0,
            STAGE.Init
        );
    }
}