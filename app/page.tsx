"use client";
import { useState, useEffect } from "react";
import atm_abi from "../artifacts/contracts/BookStore.sol/BookStore.json";
import { ethers } from "ethers";

export default function Home() {
  const contractAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
  const contractABI = atm_abi.abi;

  const [contract, setContract] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    price: "",
    stock: "",
  });
  const [bookId, setBookId] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const connectToContract = async () => {
    try {
      //@ts-ignore
      await window.ethereum.enable();

      // @ts-ignore
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contract);
      console.log("Contract connected!");
    } catch (error) {
      console.error("Error connecting to the contract:", error);
    }
  };

  const fetchBooks = async () => {
    if (!contract) return;
    try {
      const bookCount = await contract.bookIdCounter();
      const fetchedBooks = [];
      for (let i = 1; i <= bookCount; i++) {
        const book = await contract.getBook(i);
        fetchedBooks.push({
          id: book[0].toString(),
          title: book[1],
          author: book[2],
          price: ethers.utils.formatEther(book[3]),
          stock: ethers.BigNumber.from(book[4]).toNumber(),
        });
      }
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async () => {
    if (!contract) return;
    try {
      await contract.addBook(
        bookData.title,
        bookData.author,
        ethers.utils.parseEther(bookData.price),
        bookData.stock
      );
      alert("Book added successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

const purchaseBook = async () => {
  if (!contract) return alert("Contract not connected");
  try {
    // Fetch the book details from blockchain
    const book = await contract.books(bookId);
    const bookPrice = book.price; // price in wei
    const totalCost = bookPrice.mul(quantity); // total = price * quantity

    console.log("Book price (wei):", bookPrice.toString());
    console.log("Total cost (wei):", totalCost.toString());

    // ✅ Send the exact total cost (in wei)
    const transaction = await contract.purchaseBook(bookId, quantity, {
      value: totalCost,
    });

    await transaction.wait();
    alert("Book purchased successfully!");
    fetchBooks();
  } catch (error) {
    console.error("Error purchasing book:", error);
    alert("Purchase failed. Check console for details.");
  }
};


  useEffect(() => {
    if (contract) fetchBooks();
  }, [contract]);

  return (
    <main className="min-h-screen px-8 py-12 bg-gray-900 text-gray-100">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-blue-400">Book Store</h1>
        {!contract && (
          <button
            onClick={connectToContract}
            className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600"
          >
            Connect to Contract
          </button>
        )}
      </header>

      {contract && (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add a Book</h2>
            <label className="block mb-2">Title:</label>
            <input
              type="text"
              value={bookData.title}
              onChange={(e) =>
                setBookData({ ...bookData, title: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
            />
            <label className="block mt-4 mb-2">Author:</label>
            <input
              type="text"
              value={bookData.author}
              onChange={(e) =>
                setBookData({ ...bookData, author: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
            />
            <label className="block mt-4 mb-2">Price:</label>
            <input
              type="text"
              value={bookData.price}
              onChange={(e) =>
                setBookData({ ...bookData, price: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
            />
            <label className="block mt-4 mb-2">Stock:</label>
            <input
              type="number"
              value={bookData.stock}
              onChange={(e) =>
                setBookData({ ...bookData, stock: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
            />
            <button
              onClick={addBook}
              className="mt-6 bg-green-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-600"
            >
              Add Book
            </button>
          </div>

          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Purchase a Book</h2>
            <label className="block mb-2">Book ID:</label>
            <input
              type="number"
              value={bookId}
              onChange={(e) => setBookId(Number(e.target.value))}
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
            />
            <label className="block mt-4 mb-2">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full p-2 rounded bg-gray-700 text-gray-100"
            />
            <button
              onClick={purchaseBook}
              className="mt-6 bg-yellow-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-yellow-600"
            >
              Purchase
            </button>
          </div>

          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Book List</h2>
            <div className="space-y-4">
              {books.map((book) => (
                <div key={book.id} className="p-4 bg-gray-700 rounded-lg">
                  <h3 className="text-lg font-bold text-blue-300">
                    {book.title}
                  </h3>
                  <p className="text-gray-400">ID: {book.id}</p>
                  <p className="text-gray-400">Author: {book.author}</p>
                  <p className="text-gray-400">Price: {book.price} ETH</p>
                  <p className="text-gray-400">Stock: {book.stock}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setBooks([])}
              className="mt-6 bg-red-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-600"
            >
              Clear Book List
            </button>
          </div>
        </section>
      )}
    </main>
  );
}
