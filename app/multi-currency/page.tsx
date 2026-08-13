"use client";

import React, { useState } from "react";
import {
  DollarSign,
  RefreshCw,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  Clock,
  Globe,
  Settings,
  Search,
  X,
  Save,
} from "lucide-react";

interface ExchangeRate {
  id: string;
  currency: string;
  code: string;
  rate: number;
  previousRate: number;
  lastUpdated: string;
  autoUpdate: boolean;
  change: number;
}

interface ConversionHistory {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  rate: number;
  timestamp: string;
}

const mockRates: ExchangeRate[] = [
  { id: "1", currency: "US Dollar", code: "USD", rate: 0.385, previousRate: 0.384, lastUpdated: "2026-08-13 09:00", autoUpdate: true, change: 0.26 },
  { id: "2", currency: "Euro", code: "EUR", rate: 0.445, previousRate: 0.447, lastUpdated: "2026-08-13 09:00", autoUpdate: true, change: -0.45 },
  { id: "3", currency: "British Pound", code: "GBP", rate: 0.302, previousRate: 0.301, lastUpdated: "2026-08-13 09:00", autoUpdate: true, change: 0.33 },
  { id: "4", currency: "Saudi Riyal", code: "SAR", rate: 1.025, previousRate: 1.025, lastUpdated: "2026-08-13 09:00", autoUpdate: true, change: 0.00 },
  { id: "5", currency: "UAE Dirham", code: "AED", rate: 1.018, previousRate: 1.017, lastUpdated: "2026-08-13 09:00", autoUpdate: true, change: 0.10 },
  { id: "6", currency: "Indian Rupee", code: "INR", rate: 32.45, previousRate: 32.50, lastUpdated: "2026-08-13 09:00", autoUpdate: true, change: -0.15 },
  { id: "7", currency: "Qatari Riyal", code: "QAR", rate: 1.012, previousRate: 1.011, lastUpdated: "2026-08-13 09:00", autoUpdate: true, change: 0.10 },
  { id: "8", currency: "Kuwaiti Dinar", code: "KWD", rate: 0.119, previousRate: 0.119, lastUpdated: "2026-08-13 09:00", autoUpdate: true, change: 0.00 },
];

const mockConversionHistory: ConversionHistory[] = [
  { id: "1", fromCurrency: "OMR", toCurrency: "USD", amount: 1000, result: 385, rate: 0.385, timestamp: "2026-08-13 10:23" },
  { id: "2", fromCurrency: "USD", toCurrency: "OMR", amount: 5000, result: 12987, rate: 0.385, timestamp: "2026-08-13 09:15" },
  { id: "3", fromCurrency: "OMR", toCurrency: "EUR", amount: 2500, result: 1112.5, rate: 0.445, timestamp: "2026-08-12 16:45" },
  { id: "4", fromCurrency: "GBP", toCurrency: "OMR", amount: 1200, result: 3973.5, rate: 0.302, timestamp: "2026-08-12 14:20" },
];

export default function MultiCurrencyPage() {
  const [fromCurrency, setFromCurrency] = useState("OMR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("1000");
  const [convertedAmount, setConvertedAmount] = useState("385");
  const [rates, setRates] = useState<ExchangeRate[]>(mockRates);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRate, setNewRate] = useState({ currency: "", code: "", rate: "" });

  const currencies = [
    { code: "OMR", name: "Omani Rial", symbol: "﷼" },
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
    { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "QAR", name: "Qatari Riyal", symbol: "﷼" },
    { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك" },
    { code: "BHD", name: "Bahraini Dinar", symbol: "د.ب" },
  ];

  const convert = () => {
    const rate = mockRates.find((r) => r.code === toCurrency)?.rate || 1;
    const result = (parseFloat(amount) * rate).toFixed(2);
    setConvertedAmount(result);
  };

  const filteredRates = rates.filter(
    (r) =>
      r.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addRate = () => {
    if (!newRate.currency || !newRate.code || !newRate.rate) return;
    const rateEntry: ExchangeRate = {
      id: Date.now().toString(),
      currency: newRate.currency,
      code: newRate.code.toUpperCase(),
      rate: parseFloat(newRate.rate),
      previousRate: parseFloat(newRate.rate),
      lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " "),
      autoUpdate: true,
      change: 0,
    };
    setRates([...rates, rateEntry]);
    setNewRate({ currency: "", code: "", rate: "" });
    setShowAddForm(false);
  };

  const removeRate = (id: string) => {
    setRates(rates.filter((r) => r.id !== id));
  };

  const refreshRates = () => {
    setRates((prev) =>
      prev.map((r) => ({
        ...r,
        rate: +(r.rate * (1 + (Math.random() - 0.5) * 0.02)).toFixed(3),
        previousRate: r.rate,
        lastUpdated: new Date().toISOString().slice(0, 16).replace("T", " "),
        change: +(Math.random() * 2 - 1).toFixed(2),
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Multi-Currency & Exchange Rates</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refreshRates}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Rates
          </button>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Currency
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Base Currency</p>
              <p className="text-2xl font-bold text-gray-900">OMR</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Omani Rial</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Currencies</p>
              <p className="text-2xl font-bold text-gray-900">{rates.length}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Tracked pairs</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Auto-Update</p>
              <p className="text-2xl font-bold text-green-600">{rates.filter((r) => r.autoUpdate).length}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Daily auto-sync enabled</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-2xl font-bold text-gray-900">09:00</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Today, GMT+4</p>
        </div>
      </div>

      {/* Currency Converter */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5 text-blue-600" />
            Currency Converter
          </h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div className="flex gap-2">
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-32 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {currencies.map((c) => (
                    <option key={c.code} value={c.code}>{c.code}</option>
                  ))}
                </select>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Amount"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={() => {
                  setFromCurrency(toCurrency);
                  setToCurrency(fromCurrency);
                  setAmount(convertedAmount);
                  setConvertedAmount(amount);
                }}
                className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="flex gap-2">
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-32 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {currencies.map((c) => (
                    <option key={c.code} value={c.code}>{c.code}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={convertedAmount}
                  readOnly
                  className="flex-1 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700 font-medium focus:outline-none"
                />
              </div>
            </div>
            <button
              onClick={convert}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
            >
              Convert
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Exchange Rates Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Exchange Rates</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search currencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Currency</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate (to OMR)</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Previous</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Auto-Update</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRates.map((rate) => (
                  <tr key={rate.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 text-xs font-bold">
                          {rate.code}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{rate.currency}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">{rate.rate.toFixed(3)}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 text-right">{rate.previousRate.toFixed(3)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${rate.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {rate.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {rate.change >= 0 ? "+" : ""}{rate.change}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{rate.lastUpdated}</td>
                    <td className="px-4 py-3 text-center">
                      <button className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${rate.autoUpdate ? "bg-green-600" : "bg-gray-200"}`}>
                        <span className={`inline-block h-3 w-3 rounded-full bg-white transition-transform ${rate.autoUpdate ? "translate-x-5" : "translate-x-1"}`} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <Settings className="w-4 h-4 text-gray-400" />
                        </button>
                        <button onClick={() => removeRate(rate.id)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Conversion History */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Conversions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate Used</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockConversionHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.fromCurrency}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.toCurrency}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">{item.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-green-600 text-right font-medium">{item.result.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 text-right">{item.rate.toFixed(3)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Currency Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Add New Currency</h2>
              <button onClick={() => setShowAddForm(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency Name</label>
                  <input
                    type="text"
                    value={newRate.currency}
                    onChange={(e) => setNewRate({ ...newRate, currency: e.target.value })}
                    placeholder="e.g. Japanese Yen"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency Code</label>
                  <input
                    type="text"
                    value={newRate.code}
                    onChange={(e) => setNewRate({ ...newRate, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. JPY"
                    maxLength={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Exchange Rate (to OMR)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={newRate.rate}
                    onChange={(e) => setNewRate({ ...newRate, rate: e.target.value })}
                    placeholder="0.000"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                Cancel
              </button>
              <button onClick={addRate} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                <Save className="w-4 h-4" />
                Add Currency
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
