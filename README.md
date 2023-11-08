# AgroChain - Agro Product Track

AgroChain is a cutting-edge decentralized application (DApp) tailored for the agro-industry, with a specific focus on pitahaya (dragon fruit). This blockchain-based local tracking system is built using ReactJS, Solidity, Truffle, and Ganache to simulate a real Ethereum blockchain environment. The platform is designed to be utilized by stakeholders across the supply chain, including producers, processors, manufacturers, transporters, and retailers, ensuring transparency and integrity in the pitahaya product lifecycle.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction
The AgroChain project aims to revolutionize the agro-industry supply chain for pitahaya by introducing a transparent and verifiable tracking system built on blockchain technology. The use of a local Ganache environment allows for simulating real blockchain behavior, enabling a secure and predictable platform for all parties involved in the lifecycle of pitahaya.

## Features
- Real-time tracking of pitahaya from farm to table.
- Decentralized and transparent ledger for recording all transactions.
- Smart contracts that encode roles and activities of each stakeholder.
- Simulated Ethereum blockchain environment for development and testing.
- Intuitive ReactJS frontend for easy interaction with the supply chain.

## Technologies
- ReactJS
- Solidity
- Truffle Suite
- Ganache
- Web3.js

## Installation
To get started with AgroChain, you need to set up your local development environment:

1. Clone the repository:
```bash
git clone https://github.com/hitthecodelabs/AgroChain.git
```
2. Navigate to the project directory:
```bash
cd AgroChain
```
3. Install the necessary dependencies:
```bash
npm install
```

## Configuration
Make sure you have Ganache installed and running before you start the application. Update the truffle-config.js with the correct settings to match your local Ganache setup, typically found at http://localhost:7545.

# Usage
Compile and migrate your smart contracts with Truffle using the following commands:

```bash
truffle compile
truffle migrate
```

Then, to run the ReactJS frontend:

```bash
npm start
```

The application will now be accessible via http://localhost:3000.

## Contributing
Contributions to AgroChain are welcome! Here's how you can contribute:

Fork the repository on GitHub.
Create a new branch for your proposed feature or fix.
Commit your changes with an informative description.
Push your branch and submit a pull request.
We appreciate your input!

## License
AgroChain - Pitahaya Track is open source software licensed under the MIT License. See the LICENSE file for more details.
