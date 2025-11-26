# Product Design for Book-Store-DApp

## Overview
The Book-Store-DApp is a decentralized application (DApp) that allows users to interact with a blockchain-based bookstore. Users can add books, purchase books, and view the list of available books. The application leverages Ethereum smart contracts, MetaMask integration, and a modern frontend built with Next.js and TailwindCSS.

## Objectives
- Provide a seamless user experience for interacting with the blockchain.
- Ensure secure and transparent transactions using Ethereum smart contracts.
- Offer a visually appealing and responsive UI.

## Features
### Core Features
1. **Add Books**
   - Admins can add books to the blockchain by providing details such as title, author, price, and stock.
   - The data is stored securely on the blockchain.

2. **Purchase Books**
   - Users can purchase books by specifying the book ID and quantity.
   - Payments are made in Ether, and the transaction is recorded on the blockchain.

3. **View Book List**
   - Users can view the list of available books, including details such as ID, title, author, price, and stock.

4. **Clear Book List**
   - Users can reset the displayed book list using a dedicated button.

### Additional Features
- **Dark Theme**: A visually appealing dark theme for better user experience.
- **Responsive Design**: Optimized for desktop and mobile devices.

## User Flow
1. **Connect to Contract**
   - Users connect their MetaMask wallet to the application.
   - The contract is initialized, and users can interact with the blockchain.

2. **Add Books**
   - Admins fill out the book details and submit the form.
   - The book is added to the blockchain, and the list is updated.

3. **Purchase Books**
   - Users enter the book ID and quantity.
   - The transaction is processed, and the stock is updated.

4. **View and Clear Book List**
   - Users can view the list of books and clear it if needed.

## Design Components
### UI Components
1. **Header**
   - Title: "Book Store"
   - Connect to Contract button.

2. **Add Book Form**
   - Input fields for title, author, price, and stock.
   - Submit button.

3. **Purchase Book Form**
   - Input fields for book ID and quantity.
   - Submit button.

4. **Book List**
   - Grid layout displaying book details.
   - Clear Book List button.

### Styling
- **Colors**:
  - Background: `#1a202c` (dark gray)
  - Text: `#edf2f7` (light gray)
  - Primary Buttons: `#3182ce` (blue)
  - Secondary Buttons: `#e53e3e` (red)

- **Typography**:
  - Font: Inter (Google Font)
  - Font Sizes: Responsive scaling for headings and body text.

- **Spacing**:
  - Padding and margins optimized for readability.

## Technical Architecture
### Frontend
- **Framework**: Next.js
- **Styling**: TailwindCSS
- **State Management**: React hooks

### Backend
- **Blockchain**: Ethereum
- **Smart Contracts**: Solidity
- **Deployment**: Hardhat

### Integration
- **Wallet**: MetaMask
- **Library**: ethers.js

## Future Enhancements
- Add user authentication for admin functionalities.
- Implement pagination for the book list.
- Add support for multiple payment methods.

## Conclusion
The Book-Store-DApp combines blockchain technology with a modern UI to deliver a secure and user-friendly bookstore experience. The design ensures scalability, responsiveness, and ease of use for both admins and users.