'use client'

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ChevronDown, DollarSign, Lightbulb, PieChart, Plus, RotateCcw, TrendingUp, Wallet, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface BudgetData {
  monthlyIncome: number;
  totalSavings: number;
  scholarships: number;
  tuitionFees: number;
  rent: number;
  food: number;
  transport: number;
  leisure: number;
  customExpenses: { id: string; name: string; amount: number }[];
}

export default function Budget() {
  const [currency, setCurrency] = useState('USD ($)');
  const [budget, setBudget] = useState<BudgetData>({
    monthlyIncome: 0,
    totalSavings: 0,
    scholarships: 0,
    tuitionFees: 0,
    rent: 0,
    food: 0,
    transport: 0,
    leisure: 0,
    customExpenses: [],
  });

  // Modal state for adding custom expense
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  const totalExpenses = budget.tuitionFees + budget.rent + budget.food + budget.transport + budget.leisure +
    budget.customExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  const monthlyBalance = budget.monthlyIncome - totalExpenses;
  const isPositive = monthlyBalance >= 0;

  const handleInputChange = (field: keyof BudgetData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setBudget({ ...budget, [field]: numValue });
  };

  // Focus name input when modal opens
  useEffect(() => {
    if (isModalOpen && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isModalOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  const openModal = () => {
    setNewExpenseName('');
    setNewExpenseAmount('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewExpenseName('');
    setNewExpenseAmount('');
  };

  const handleAddExpense = () => {
    if (newExpenseName.trim()) {
      const amount = parseFloat(newExpenseAmount) || 0;
      setBudget({
        ...budget,
        customExpenses: [...budget.customExpenses, { id: Date.now().toString(), name: newExpenseName.trim(), amount }],
      });
      closeModal();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newExpenseName.trim()) {
      handleAddExpense();
    }
  };

  const removeCustomExpense = (id: string) => {
    setBudget({
      ...budget,
      customExpenses: budget.customExpenses.filter(exp => exp.id !== id),
    });
  };

  const handleReset = () => {
    setBudget({
      monthlyIncome: 0,
      totalSavings: 0,
      scholarships: 0,
      tuitionFees: 0,
      rent: 0,
      food: 0,
      transport: 0,
      leisure: 0,
      customExpenses: [],
    });
  };

  const getExpensePercentage = (amount: number) => {
    if (totalExpenses === 0) return 0;
    return (amount / totalExpenses) * 100;
  };

  return (
    <>
      <Header />
      <main className="flex-1 px-4 md:px-10 lg:px-40 py-10 mt-16 min-h-screen bg-white">
        <div className="layout-content-container mx-auto flex max-w-7xl flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-wrap justify-between gap-4 items-center">
            <div className="flex flex-col gap-2">
              <p className="text-[#0d171b] text-4xl font-bold">
                My Study Abroad Budget Planner
              </p>
              <p className="text-[#4c809a] text-lg">
                Plan your finances to make your dream of studying abroad a reality.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-[#0d171b]" htmlFor="currency">
                Currency:
              </label>
              <select
                className="form-select min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] border-2 border-gray-200 bg-white focus:border-[#0d98ba] h-12 text-sm px-4 font-medium transition-all hover:border-gray-300"
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option>USD ($)</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>JPY</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column - Input Forms */}
            <div className="lg:col-span-3 flex flex-col gap-6">
              {/* Income & Savings Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#0d98ba]/20 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-[#0d98ba]" />
                  </div>
                  <h2 className="text-[#0d171b] text-2xl font-bold">
                    Income & Savings
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col group">
                    <div className="flex items-center gap-2 pb-2">
                      <p className="text-[#0d171b] text-sm font-semibold">Monthly Income</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                      <input
                        type="number"
                        className="form-input w-full rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] h-14 pl-8 pr-4 text-lg font-medium transition-all group-hover:border-gray-300"
                        placeholder="1,200"
                        value={budget.monthlyIncome || ''}
                        onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                      />
                    </div>
                  </label>
                  <label className="flex flex-col group">
                    <div className="flex items-center gap-2 pb-2">
                      <p className="text-[#0d171b] text-sm font-semibold">Total Savings</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                      <input
                        type="number"
                        className="form-input w-full rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] h-14 pl-8 pr-4 text-lg font-medium transition-all group-hover:border-gray-300"
                        placeholder="8,000"
                        value={budget.totalSavings || ''}
                        onChange={(e) => handleInputChange('totalSavings', e.target.value)}
                      />
                    </div>
                  </label>
                  <label className="flex flex-col col-span-1 md:col-span-2 group">
                    <div className="flex items-center gap-2 pb-2">
                      <p className="text-[#0d171b] text-sm font-semibold">Scholarships/Grants</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                      <input
                        type="number"
                        className="form-input w-full rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] h-14 pl-8 pr-4 text-lg font-medium transition-all group-hover:border-gray-300"
                        placeholder="2,500"
                        value={budget.scholarships || ''}
                        onChange={(e) => handleInputChange('scholarships', e.target.value)}
                      />
                    </div>
                  </label>
                </div>
              </div>

              {/* Monthly Expenses Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#0d98ba]/20 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[#0d98ba]" />
                  </div>
                  <h2 className="text-[#0d171b] text-2xl font-bold">
                    Monthly Expenses
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <label className="flex flex-col group">
                    <div className="flex items-center gap-2 pb-2">
                      <p className="text-[#0d171b] text-sm font-semibold">Tuition Fees (monthly)</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                      <input
                        type="number"
                        className="form-input w-full rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] h-14 pl-8 pr-4 text-lg font-medium transition-all group-hover:border-gray-300"
                        placeholder="1,500"
                        value={budget.tuitionFees || ''}
                        onChange={(e) => handleInputChange('tuitionFees', e.target.value)}
                      />
                    </div>
                  </label>
                  <label className="flex flex-col group">
                    <div className="flex items-center gap-2 pb-2">
                      <p className="text-[#0d171b] text-sm font-semibold">Rent / Accommodation</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                      <input
                        type="number"
                        className="form-input w-full rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] h-14 pl-8 pr-4 text-lg font-medium transition-all group-hover:border-gray-300"
                        placeholder="700"
                        value={budget.rent || ''}
                        onChange={(e) => handleInputChange('rent', e.target.value)}
                      />
                    </div>
                  </label>
                  <label className="flex flex-col group">
                    <div className="flex items-center gap-2 pb-2">
                      <p className="text-[#0d171b] text-sm font-semibold">Food & Groceries</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                      <input
                        type="number"
                        className="form-input w-full rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] h-14 pl-8 pr-4 text-lg font-medium transition-all group-hover:border-gray-300"
                        placeholder="400"
                        value={budget.food || ''}
                        onChange={(e) => handleInputChange('food', e.target.value)}
                      />
                    </div>
                  </label>
                  <label className="flex flex-col group">
                    <div className="flex items-center gap-2 pb-2">
                      <p className="text-[#0d171b] text-sm font-semibold">Transport</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                      <input
                        type="number"
                        className="form-input w-full rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] h-14 pl-8 pr-4 text-lg font-medium transition-all group-hover:border-gray-300"
                        placeholder="80"
                        value={budget.transport || ''}
                        onChange={(e) => handleInputChange('transport', e.target.value)}
                      />
                    </div>
                  </label>
                  <label className="flex flex-col group">
                    <div className="flex items-center gap-2 pb-2">
                      <p className="text-[#0d171b] text-sm font-semibold">Leisure & Entertainment</p>
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                      <input
                        type="number"
                        className="form-input w-full rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] h-14 pl-8 pr-4 text-lg font-medium transition-all group-hover:border-gray-300"
                        placeholder="150"
                        value={budget.leisure || ''}
                        onChange={(e) => handleInputChange('leisure', e.target.value)}
                      />
                    </div>
                  </label>

                  {/* Custom Expenses */}
                  {budget.customExpenses.map((expense) => (
                    <div key={expense.id} className="flex flex-col group">
                      <div className="flex items-center gap-2 pb-2">
                        <p className="text-[#0d171b] text-sm font-semibold">{expense.name}</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                          <input
                            type="number"
                            className="form-input w-full rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] h-14 pl-8 pr-4 text-lg font-medium transition-all group-hover:border-gray-300"
                            value={expense.amount}
                            onChange={(e) => {
                              const newExpenses = budget.customExpenses.map(exp =>
                                exp.id === expense.id ? { ...exp, amount: parseFloat(e.target.value) || 0 } : exp
                              );
                              setBudget({ ...budget, customExpenses: newExpenses });
                            }}
                          />
                        </div>
                        <button
                          onClick={() => removeCustomExpense(expense.id)}
                          className="w-14 h-14 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center transition-all hover:scale-105"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={openModal}
                    className="flex items-center justify-center mt-7 gap-3 rounded-xl border-2 border-dashed border-gray-300 h-14 text-gray-600 hover:bg-[#0d98ba]/5 hover:border-[#0d98ba] transition-all hover:scale-[1.02] group"
                  >
                    <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-semibold">Add Custom Expense</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="flex-1 min-w-[160px] sm:flex-none cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-[#0d98ba] text-white text-base font-bold shadow-lg hover:shadow-xl hover:bg-[#0b889f] transition-all flex gap-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="truncate">Update Budget</span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 min-w-[160px] sm:flex-none cursor-pointer items-center justify-center rounded-xl h-14 px-8 bg-white text-[#0d171b] text-base font-bold hover:bg-gray-50 transition-all flex gap-2 border-2 border-gray-200"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span className="truncate">Reset</span>
                </button>
              </div>
            </div>

            {/* Right Column - Overview */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Financial Overview Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#0d98ba]/20 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
                    <PieChart className="w-5 h-5 text-[#0d98ba]" />
                  </div>
                  <h2 className="text-[#0d171b] text-2xl font-bold">
                    Financial Overview
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col gap-1 p-4 rounded-xl bg-[#0d98ba]/10 border border-[#0d98ba]/20">
                    <p className="text-sm text-[#0d98ba] font-medium">Total Income</p>
                    <p className="text-2xl font-bold text-[#0d171b]">
                      ${budget.monthlyIncome.toLocaleString()}/mo
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-sm text-gray-600 font-medium">Total Expenses</p>
                    <p className="text-2xl font-bold text-[#0d171b]">
                      ${totalExpenses.toLocaleString()}/mo
                    </p>
                  </div>
                </div>

                {/* Balance Display */}
                <div
                  className={`flex flex-col gap-1 p-4 rounded-xl border-2 mb-6 ${isPositive
                      ? 'bg-[#0d98ba]/5 border-[#0d98ba]'
                      : 'bg-gray-50 border-gray-300'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${isPositive ? 'text-[#0d98ba]' : 'text-gray-700'}`}>
                      Estimated Monthly Balance
                    </p>
                  </div>
                  <p className={`text-3xl font-bold ${isPositive ? 'text-[#0d98ba]' : 'text-gray-700'}`}>
                    ${Math.abs(monthlyBalance).toLocaleString()}
                  </p>
                  <p className={`text-xs ${isPositive ? 'text-[#0d98ba]' : 'text-gray-600'}`}>
                    {isPositive ? 'You have a projected surplus.' : 'You have a projected deficit.'}
                  </p>
                </div>

                {/* Expense Breakdown */}
                <h3 className="text-[#0d171b] text-lg font-bold mb-4">
                  Expense Breakdown
                </h3>
                <div className="flex flex-col gap-3">
                  {budget.tuitionFees > 0 && (
                    <>
                      <div className="flex justify-between items-center text-sm">
                        <p className="text-gray-600">Tuition Fees</p>
                        <p className="font-medium text-[#0d171b]">${budget.tuitionFees.toLocaleString()}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#0d98ba] h-2 rounded-full transition-all"
                          style={{ width: `${getExpensePercentage(budget.tuitionFees)}%` }}
                        ></div>
                      </div>
                    </>
                  )}

                  {budget.rent > 0 && (
                    <>
                      <div className="flex justify-between items-center text-sm pt-2">
                        <p className="text-gray-600">Rent</p>
                        <p className="font-medium text-[#0d171b]">${budget.rent.toLocaleString()}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#0d98ba] h-2 rounded-full transition-all"
                          style={{ width: `${getExpensePercentage(budget.rent)}%` }}
                        ></div>
                      </div>
                    </>
                  )}

                  {budget.food > 0 && (
                    <>
                      <div className="flex justify-between items-center text-sm pt-2">
                        <p className="text-gray-600">Food & Groceries</p>
                        <p className="font-medium text-[#0d171b]">${budget.food.toLocaleString()}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#0d98ba] h-2 rounded-full transition-all"
                          style={{ width: `${getExpensePercentage(budget.food)}%` }}
                        ></div>
                      </div>
                    </>
                  )}

                  {budget.transport > 0 && (
                    <>
                      <div className="flex justify-between items-center text-sm pt-2">
                        <p className="text-gray-600">Transport</p>
                        <p className="font-medium text-[#0d171b]">${budget.transport.toLocaleString()}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#0d98ba] h-2 rounded-full transition-all"
                          style={{ width: `${getExpensePercentage(budget.transport)}%` }}
                        ></div>
                      </div>
                    </>
                  )}

                  {budget.leisure > 0 && (
                    <>
                      <div className="flex justify-between items-center text-sm pt-2">
                        <p className="text-gray-600">Leisure & Entertainment</p>
                        <p className="font-medium text-[#0d171b]">${budget.leisure.toLocaleString()}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#0d98ba] h-2 rounded-full transition-all"
                          style={{ width: `${getExpensePercentage(budget.leisure)}%` }}
                        ></div>
                      </div>
                    </>
                  )}

                  {budget.customExpenses.map((expense) => expense.amount > 0 && (
                    <div key={expense.id}>
                      <div className="flex justify-between items-center text-sm pt-2">
                        <p className="text-gray-600">{expense.name}</p>
                        <p className="font-medium text-[#0d171b]">${expense.amount.toLocaleString()}</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div
                          className="bg-[#0d98ba] h-2 rounded-full transition-all"
                          style={{ width: `${getExpensePercentage(expense.amount)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Savings Tips */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#0d98ba]/20 p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-[#0d98ba]" />
                  </div>
                  <h2 className="text-[#0d171b] text-2xl font-bold">
                    Savings Tips
                  </h2>
                </div>
                <div className="flex flex-col gap-3">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all">
                      <h3 className="font-medium text-sm text-[#0d171b]">Saving on Groceries</h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="mt-2 p-4 text-sm text-gray-600 bg-gray-50 rounded-xl border border-gray-200">
                      Look for student discounts at local supermarkets, buy generic brands, and plan your meals
                      for the week to avoid impulse buys.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all">
                      <h3 className="font-medium text-sm text-[#0d171b]">Student Discounts</h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="mt-2 p-4 text-sm text-gray-600 bg-gray-50 rounded-xl border border-gray-200">
                      Always carry your student ID! Many restaurants, shops, museums, and public transport systems
                      offer significant discounts for students.
                    </p>
                  </details>
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all">
                      <h3 className="font-medium text-sm text-[#0d171b]">Managing Bank Fees</h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="mt-2 p-4 text-sm text-gray-600 bg-gray-50 rounded-xl border border-gray-200">
                      Research banks that offer student accounts with low or no international transaction fees.
                      Using a local bank in your host country can often be the cheapest option.
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Custom Expense Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" />

          {/* Modal */}
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#0d171b]">Add Custom Expense</h3>
              <p className="text-sm text-gray-500 mt-1">Create a new expense category for your budget</p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
              {/* Expense Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="expense-name" className="text-sm font-semibold text-[#0d171b]">
                  Expense Name
                </label>
                <input
                  ref={nameInputRef}
                  id="expense-name"
                  type="text"
                  placeholder="e.g., Gym Membership, Phone Bill"
                  className="w-full rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] h-12 px-4 text-base transition-all hover:border-gray-300"
                  value={newExpenseName}
                  onChange={(e) => setNewExpenseName(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>

              {/* Expense Amount */}
              <div className="flex flex-col gap-2">
                <label htmlFor="expense-amount" className="text-sm font-semibold text-[#0d171b]">
                  Monthly Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input
                    id="expense-amount"
                    type="number"
                    placeholder="0"
                    className="w-full rounded-xl text-[#0d171b] focus:outline-0 focus:ring-2 focus:ring-[#0d98ba] focus:ring-offset-2 border-2 border-gray-200 bg-white focus:border-[#0d98ba] h-12 pl-8 pr-4 text-base transition-all hover:border-gray-300"
                    value={newExpenseAmount}
                    onChange={(e) => setNewExpenseAmount(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 h-12 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpense}
                disabled={!newExpenseName.trim()}
                className="flex-1 h-12 rounded-xl bg-[#0d98ba] text-white font-semibold shadow-lg hover:shadow-xl hover:bg-[#0b889f] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:hover:bg-[#0d98ba]"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
