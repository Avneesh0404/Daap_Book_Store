# Book-Store-DApp

## Overview
A decentralized application for managing a blockchain-based bookstore. Users can add books, purchase books, and view the list of available books.

## Features
- Add books with details like title, author, price, and stock.
- Purchase books using Ether.
- View the list of available books.

## Getting Started

### Prerequisites
- Node.js
- MetaMask extension
- Hardhat

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/masterpranay1/Book-Store-DApp.git
   cd Book-Store-DApp
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Smart Contract Deployment
Deploy the smart contract to the local Hardhat network:
```bash
npx hardhat run --network localhost scripts/deploy.ts
```

### Running the Application
Start the Next.js development server:
```bash
npm run dev
```
Access the application at `http://localhost:3000`.

## Usage
1. **Add Books**: Fill in the book details and click "Add Book".
2. **Purchase Books**: Enter the book ID and quantity, then click "Purchase".
3. **View Books**: See the list of available books.

## Technologies Used
- **Frontend**: Next.js, TailwindCSS
- **Blockchain**: Ethereum, Solidity
- **Tools**: Hardhat, MetaMask, ethers.js

## License
This project is licensed under the MIT License.
