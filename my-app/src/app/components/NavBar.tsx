"use client";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTransaction, transaction } from "../services/transactionService";
import { Itransaction } from "../interfaces/interfaces";

type NavBarProps = {
  onTransactionUpdate: () => void;
  title: string;
};

function NavBar({ onTransactionUpdate, title }: NavBarProps) {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(["Salary"]);
  const [date, setDate] = useState<Date | null>(null);
  const [description, setDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [transactions, setTransactions] = useState<Itransaction[]>([]);

  useEffect(() => {
    handleAddTransaction();
  }, []);

  const handleAddTransaction = async () => {
    const response = await getTransaction();
    setTransactions(response);
    const uniqueCategory: string[] = Array.from(
      new Set(response.map((transaction: Itransaction) => transaction.category))
    );
    setCategories(uniqueCategory);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory);
      setCategory(newCategory);
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  const addCategory = (newCategory: string | null) => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Transaction Summary", 20, 20);

    doc.setFontSize(12);
    let yOffset = 30;
    doc.text("Type", 20, yOffset);
    doc.text("Amount", 50, yOffset);
    doc.text("Category", 80, yOffset);
    doc.text("Date", 110, yOffset);
    doc.text("Description", 140, yOffset);

    transactions.forEach((transaction, index) => {
      yOffset += 10;
      doc.text(transaction.type, 20, yOffset);
      doc.text(transaction.amount.toString(), 50, yOffset);
      doc.text(transaction.category, 80, yOffset);
      doc.text(
        transaction.date ? new Date(transaction.date).toLocaleDateString() : "",
        110,
        yOffset
      );
      doc.text(transaction.description || "", 140, yOffset);
    });

    doc.save("Transaction_Summary.pdf");
  };

  const handleSubmit = async () => {
    const transactionData: Itransaction = {
      type,
      amount: parseFloat(amount) || 0,
      category,
      date: date || new Date(),
      description,
    };
    const response = await transaction(transactionData);
    if (response) {
      onTransactionUpdate();
    }
  };

  return (
    <div className="p-6">
      <header className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              document
                .getElementById("add-transaction-modal")
                ?.classList.remove("hidden")
            }
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            + Add Transaction
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-gray-500 text-white px-4 py-2 flex items-center gap-2 rounded-md hover:bg-gray-600"
          >
            Export
          </button>
        </div>
      </header>
      <div
        id="add-transaction-modal"
        className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <h3 className="text-lg font-bold mb-4">Add Transaction</h3>
          <div className="space-y-4">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                const numericValue = input.value.replace(/[^0-9]/g, ""); 
                setAmount(numericValue || "0"); 
              }}
              className="w-full px-4 py-2 border rounded-md"
            />
            <div>
              <select
                value={category}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue === "add_new") {
                    setIsAddingCategory(true);
                  } else if (!selectedValue && categories.length > 0) {
                    setCategory(categories[categories.length - 1]); 
                  } else {
                    setCategory(selectedValue);
                  }
                }}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="add_new">+ Add New Category</option>
              </select>
              {isAddingCategory && (
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-md"
                  />
                  <button
                    onClick={handleAddCategory}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
            <DatePicker
              selected={date || new Date()}
              onChange={(date) => setDate(date || new Date())}
              className="w-full px-4 py-2 border rounded-md"
              placeholderText="Select Date"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  document
                    .getElementById("add-transaction-modal")
                    ?.classList.add("hidden")
                }
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSubmit(); 
                  document
                    .getElementById("add-transaction-modal")
                    ?.classList.add("hidden"); 
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
