// NavBar.js
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectTrigger } from "@/components/ui/select";
import { postGoal } from "../services/goalService";

type NavBarProps = {
  onTransactionUpdate: () => void;
};


const GoalsNavBar = ({ onTransactionUpdate }: NavBarProps) => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [savings, setSavings] = useState("");

  const handleSubmit = async () => {
    const goalData = {
      goalName,
      targetAmount: parseFloat(targetAmount),
      startDate,
      endDate,
      savings: parseFloat(savings),
    };
    const response = await postGoal(goalData);
    if (response) {
      setGoalName("");
      setTargetAmount("");
      setStartDate(null);
      setEndDate(null);
      setSavings("");
      onTransactionUpdate();
    }
  };

  return (
    <div className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Financial Goals
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">+ Add Goal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Goal Name"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                />

                <Input
                  type="number"
                  placeholder="Amount"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="w-full text-left">
                      {startDate
                        ? startDate.toLocaleDateString()
                        : "Select Start Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      onKeyDown={(e) => e.preventDefault()}
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" className="w-full text-left">
                      {endDate
                        ? endDate.toLocaleDateString()
                        : "Select End Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start">
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      onKeyDown={(e) => e.preventDefault()}
                    />
                  </PopoverContent>
                </Popover>

                <Input
                  type="number"
                  placeholder="Saved Till Now"
                  value={savings}
                  onChange={(e) => setSavings(e.target.value)}
                />
                <DialogClose asChild>
                  <Button onClick={handleSubmit} className="w-full">
                    Save Goal
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default GoalsNavBar;


