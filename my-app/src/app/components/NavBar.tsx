"use client";
import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import SideBar from "../components/SideBar";
import { Button } from "@/components/ui/button";
import { Filter, FileDown } from "lucide-react";
import DashBoardSummary from "../components/DashBoardSummary";
import { TransactionTable } from "../components/TransactionTable";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
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
  const [categories, setCategories] = useState([
    "Salary",
  ]);
  const [date, setDate] = useState<Date | null>(null);
  const [description, setDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
   const [transactions, setTransactions] = useState<Itransaction[]>([]);

  useEffect(() => {
    handleAddTransaction();
  }, []);

const handleAddTransaction = async () => {
const response = await getTransaction()
setTransactions(response);
const uniqueCategory: string[] = Array.from(
  new Set(response.map((transaction: Itransaction) => transaction.category))
);
console.log("Unique: ", uniqueCategory)
setCategories(uniqueCategory)
}
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
         transaction.date
           ? new Date(transaction.date).toLocaleDateString()
           : "",
         110,
         yOffset
       );
       doc.text(transaction.description || "", 140, yOffset);
     });

     doc.save("Transaction_Summary.pdf");
   };


  const handleSubmit = async () => {
    const transactionData = {
      type,
      amount: parseFloat(amount),
      category,
      date,
      description,
    };
    console.log("Transaction:", transactionData);
    const response = await transaction(transactionData);
    if (response) {
      onTransactionUpdate();
    }
  };
  return (
    <div>
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="primary" onClick={handleAddTransaction}>
                  + Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Transaction</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Select
                    value={type}
                    onValueChange={(value) => setType(value)}
                  >
                    <SelectTrigger className="w-full">
                      {type
                        ? type.charAt(0).toUpperCase() + type.slice(1)
                        : "Select Type"}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />

                  {/* <Select
                    value={category}
                    onValueChange={(value) => {
                      if (value !== "add_new") {
                        setCategory(value);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                        <SelectItem
                          value="add_new"
                          onClick={() =>
                            addCategory(prompt("Enter new category:"))
                          }
                        >
                          + Add Category
                        </SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </Select> */}
                  <Select
                    value={category}
                    onValueChange={(value) => {
                      if (value === "add_new") {
                        setIsAddingCategory(true);
                      } else {
                        setCategory(value);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      {category || "Select Category"}
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                      <SelectItem value="add_new">+ Add Category</SelectItem>
                    </SelectContent>
                  </Select>
                  {isAddingCategory && (
                    <div className="flex gap-2">
                      <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter new category"
                      />
                      <Button onClick={handleAddCategory}>Add</Button>
                    </div>
                  )}

                  {/* <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="w-full">
                        {date ? date.toLocaleDateString() : "Select Date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start">
                      <Calendar
                        selected={date || undefined}
                        onSelect={(selectedDate: Date | undefined) =>
                          setDate(selectedDate || null)
                        }
                      />
                    </PopoverContent>
                  </Popover> */}

                  <div className="relative">
                    <Select
                      value={date ? date.toLocaleDateString() : ""}
                      onValueChange={() => {}} // This is just for show, we'll use the Popover
                    >
                      <SelectTrigger className="w-full">
                        {date ? date.toLocaleDateString() : "Select Date"}
                      </SelectTrigger>
                    </Select>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full absolute top-0 left-0 h-full opacity-0"
                        >
                          Select
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start">
                        {/* <Calendar
                          selected={date || undefined}
                          onSelect={(selectedDate: Date | undefined) =>
                            setDate(selectedDate || null)
                          }
                        /> */}
                        <DatePicker
                          selected={date}
                          onChange={(date) => setDate(date)}
                          onKeyDown={(e) => {
                            e.preventDefault();
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <DialogClose asChild>
                    <Button onClick={handleSubmit} className="w-full">
                      Save Transaction
                    </Button>
                  </DialogClose>
                </div>
                {/* <DialogClose asChild>
                  <Button variant="secondary" className="mt-4 w-full">
                    Close
                  </Button>
                </DialogClose> */}
              </DialogContent>
            </Dialog>
            <Button
              onClick={handleExportPDF}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <FileDown />
              Export
            </Button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default NavBar