"use client";

import React, { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  Globe,
  Upload,
  Save,
  RotateCcw,
  Shield,
  DollarSign,
  Percent,
  Clock,
  Bell,
  FileText,
  Download,
  HardDrive,
  Key,
  Server,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

interface CompanyProfile {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  licenseNumber: string;
  taxNumber: string;
}

interface TaxSetting {
  id: string;
  name: string;
  rate: number;
  type: "percentage" | "fixed";
  applicableTo: string[];
  enabled: boolean;
}

interface EmailConfig {
  smtpHost: string;
  smtpPort: string;
  senderEmail: string;
  senderName: string;
  encryption: "tls" | "ssl" | "none";
  apiKey: string;
  showApiKey: boolean;
}

interface CurrencySetting {
  baseCurrency: string;
  symbol: string;
  decimalPlaces: number;
  dateFormat: string;
  timezone: string;
  autoUpdateRates: boolean;
}

const mockCompanyProfile: CompanyProfile = {
  name: "TravelPro Agency LLC",
  address: "123 Muscat Street, Al Khuwair",
  city: "Muscat",
  country: "Oman",
  phone: "+968 24 123456",
  email: "info@travelpro.om",
  website: "www.travelpro.om",
  licenseNumber: "TRV-2021-0042",
  taxNumber: "OMN-VAT-987654321",
};

const mockTaxSettings: TaxSetting[] = [
  {
    id: "1",
    name: "VAT",
    rate: 5,
    type: "percentage",
    applicableTo: ["Flights", "Hotels", "Transport", "Visa"],
    enabled: true,
  },
  {
    id: "2",
    name: "Service Charge",
    rate: 3,
    type: "percentage",
    applicableTo: ["Flights", "Hotels"],
    enabled: true,
  },
  {
    id: "3",
    name: "Tourism Tax",
    rate: 2,
    type: "percentage",
    applicableTo: ["Hotels"],
    enabled: false,
  },
];

const mockEmailConfig: EmailConfig = {
  smtpHost: "smtp.travelpro.om",
  smtpPort: "587",
  senderEmail: "noreply@travelpro.om",
  senderName: "TravelPro Agency",
  encryption: "tls",
  apiKey: "sk-••••••••••••••••••••••••",
  showApiKey: false,
};

const mockCurrencySettings: CurrencySetting = {
  baseCurrency: "OMR",
  symbol: "﷼",
  decimalPlaces: 3,
  dateFormat: "DD/MM/YYYY",
  timezone: "Asia/Muscat (GMT+4)",
  autoUpdateRates: true,
};

const currencies = [
  { code: "OMR", name: "Omani Rial", symbol: "﷼" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "QAR", name: "Qatari Riyal", symbol: "﷼" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(mockCompanyProfile);
  const [taxSettings, setTaxSettings] = useState<TaxSetting[]>(mockTaxSettings);
  const [emailConfig, setEmailConfig] = useState<EmailConfig>(mockEmailConfig);
  const [currencySettings, setCurrencySettings] = useState<CurrencySetting>(mockCurrencySettings);
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const tabs = [
    { id: "company", label: "Company Profile", icon: Building2 },
    { id: "tax", label: "Tax & VAT", icon: Percent },
    { id: "email", label: "Email & SMS", icon: Mail },
    { id: "currency", label: "Currency & Format", icon: DollarSign },
    { id: "backup", label: "Backup & System", icon: HardDrive },
  ];

  const handleSave = () => {
    setSaveMessage("Settings saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const updateCompanyField = (field: keyof CompanyProfile, value: string) => {
    setCompanyProfile((prev) => ({ ...prev, [field]: value }));
  };

  const toggleTaxSetting = (id: string) => {
    setTaxSettings((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)),
    );
  };

  const updateEmailField = (field: keyof EmailConfig, value: string) => {
    setEmailConfig((prev) => ({ ...prev, [field]: value }));
  };

  const updateCurrencyField = (field: keyof CurrencySetting, value: string | boolean | number) => {
    setCurrencySettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings & Configuration</h1>
          <p className="text-sm text-gray-500 mt-1">
            Wednesday, 12 August 2026
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveMessage && (
            <span className="text-sm text-green-600 font-medium flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              {saveMessage}
            </span>
          )}
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="border-b border-gray-200 px-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Company Profile */}
          {activeTab === "company" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Company Profile</h3>
                  <p className="text-sm text-gray-500">Update your business information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={companyProfile.name}
                    onChange={(e) => updateCompanyField("name", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                  <input
                    type="text"
                    value={companyProfile.licenseNumber}
                    onChange={(e) => updateCompanyField("licenseNumber", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={companyProfile.address}
                    onChange={(e) => updateCompanyField("address", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={companyProfile.city}
                    onChange={(e) => updateCompanyField("city", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={companyProfile.country}
                    onChange={(e) => updateCompanyField("country", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={companyProfile.phone}
                      onChange={(e) => updateCompanyField("phone", e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      value={companyProfile.email}
                      onChange={(e) => updateCompanyField("email", e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={companyProfile.website}
                      onChange={(e) => updateCompanyField("website", e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax Number</label>
                  <input
                    type="text"
                    value={companyProfile.taxNumber}
                    onChange={(e) => updateCompanyField("taxNumber", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tax & VAT */}
          {activeTab === "tax" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Tax & VAT Settings</h3>
                  <p className="text-sm text-gray-500">Configure taxes applied to bookings and services</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm">
                  <Plus className="w-4 h-4" />
                  Add Tax Rule
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicable To</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {taxSettings.map((tax) => (
                        <tr key={tax.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Percent className="w-4 h-4 text-purple-600" />
                              </div>
                              <span className="text-sm font-medium text-gray-900">{tax.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">{tax.rate}{tax.type === "percentage" ? "%" : " fixed"}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium capitalize">{tax.type}</span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {tax.applicableTo.map((item) => (
                                <span key={item} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{item}</span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => toggleTaxSetting(tax.id)}
                              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${tax.enabled ? "bg-green-600" : "bg-gray-200"}`}
                            >
                              <span className={`inline-block h-3 w-3 rounded-full bg-white transition-transform ${tax.enabled ? "translate-x-5" : "translate-x-1"}`} />
                            </button>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                                <Eye className="w-4 h-4 text-gray-400" />
                              </button>
                              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
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

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-blue-900">VAT Compliance Note</h4>
                    <p className="text-sm text-blue-700 mt-1">Ensure VAT rates comply with local regulations. Current OMAN VAT standard rate is 5% as per Royal Decree No. 49/2021.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email & SMS */}
          {activeTab === "email" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email & SMS Configuration</h3>
                  <p className="text-sm text-gray-500">Manage communication channels and notifications</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-sm">
                  <Bell className="w-4 h-4" />
                  Test Connection
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    SMTP Configuration
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Host</label>
                      <input
                        type="text"
                        value={emailConfig.smtpHost}
                        onChange={(e) => updateEmailField("smtpHost", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMTP Port</label>
                      <input
                        type="text"
                        value={emailConfig.smtpPort}
                        onChange={(e) => updateEmailField("smtpPort", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sender Email</label>
                      <input
                        type="email"
                        value={emailConfig.senderEmail}
                        onChange={(e) => updateEmailField("senderEmail", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sender Name</label>
                      <input
                        type="text"
                        value={emailConfig.senderName}
                        onChange={(e) => updateEmailField("senderName", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Encryption</label>
                      <select
                        value={emailConfig.encryption}
                        onChange={(e) => updateEmailField("encryption", e.target.value)}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="tls">TLS</option>
                        <option value="ssl">SSL</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Key className="w-4 h-4 text-gray-400" />
                    API Configuration
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
                      <div className="relative">
                        <input
                          type={showApiKey ? "text" : "password"}
                          value={emailConfig.apiKey}
                          onChange={(e) => updateEmailField("apiKey", e.target.value)}
                          className="w-full px-3 py-2 pr-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMS Provider</label>
                      <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Twilio</option>
                        <option>Nexmo (Vonage)</option>
                        <option>Clickatell</option>
                        <option>Custom API</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SMS Sender ID</label>
                      <input
                        type="text"
                        defaultValue="TravelPro"
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900">Notification Templates</h4>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SMS</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { event: "Booking Confirmed", email: true, sms: true, modified: "2 days ago" },
                        { event: "Payment Received", email: true, sms: true, modified: "1 week ago" },
                        { event: "Visa Approved", email: true, sms: false, modified: "3 days ago" },
                        { event: "Flight Reminder", email: true, sms: true, modified: "1 week ago" },
                        { event: "Document Expiry", email: true, sms: true, modified: "2 weeks ago" },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.event}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${item.email ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                              {item.email ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                              {item.email ? "Enabled" : "Disabled"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${item.sms ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                              {item.sms ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                              {item.sms ? "Enabled" : "Disabled"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">{item.modified}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Currency & Format */}
          {activeTab === "currency" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Currency & Display Format</h3>
                  <p className="text-sm text-gray-500">Configure default currency and regional settings</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Base Currency</h4>
                      <p className="text-xs text-gray-500">Primary currency for transactions</p>
                    </div>
                  </div>
                  <select
                    value={currencySettings.baseCurrency}
                    onChange={(e) => updateCurrencyField("baseCurrency", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Currency Symbol</h4>
                      <p className="text-xs text-gray-500">Display symbol for base currency</p>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={currencySettings.symbol}
                    onChange={(e) => updateCurrencyField("symbol", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Decimal Places</h4>
                      <p className="text-xs text-gray-500">Precision for currency values</p>
                    </div>
                  </div>
                  <select
                    value={currencySettings.decimalPlaces}
                    onChange={(e) => updateCurrencyField("decimalPlaces", e.target.value === "3")}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="2">2 (Standard)</option>
                    <option value="3">3 (Gulf Region)</option>
                  </select>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Date Format</h4>
                      <p className="text-xs text-gray-500">Preferred date display format</p>
                    </div>
                  </div>
                  <select
                    value={currencySettings.dateFormat}
                    onChange={(e) => updateCurrencyField("dateFormat", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Timezone</h4>
                      <p className="text-xs text-gray-500">Regional time zone</p>
                    </div>
                  </div>
                  <select
                    value={currencySettings.timezone}
                    onChange={(e) => updateCurrencyField("timezone", e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Asia/Muscat (GMT+4)">Asia/Muscat (GMT+4)</option>
                    <option value="Asia/Dubai (GMT+4)">Asia/Dubai (GMT+4)</option>
                    <option value="Asia/Riyadh (GMT+3)">Asia/Riyadh (GMT+3)</option>
                    <option value="UTC">UTC</option>
                  </select>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                        <Server className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">Auto-Update Rates</h4>
                        <p className="text-xs text-gray-500">Fetch live exchange rates daily</p>
                      </div>
                    </div>
                    <button
                      onClick={() => updateCurrencyField("autoUpdateRates", !currencySettings.autoUpdateRates)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${currencySettings.autoUpdateRates ? "bg-green-600" : "bg-gray-200"}`}
                    >
                      <span className={`inline-block h-3 w-3 rounded-full bg-white transition-transform ${currencySettings.autoUpdateRates ? "translate-x-5" : "translate-x-1"}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Backup & System */}
          {activeTab === "backup" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Backup & System Preferences</h3>
                  <p className="text-sm text-gray-500">Data backup and general system configuration</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-gray-400" />
                    Data Backup
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Last Backup</p>
                        <p className="text-xs text-gray-500">August 11, 2026 — 02:00 AM</p>
                      </div>
                      <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-1 rounded-full">Successful</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Backup Size</p>
                        <p className="text-xs text-gray-500">2.4 GB</p>
                      </div>
                      <span className="text-xs text-gray-500 font-medium">Compressed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                        <Download className="w-4 h-4" />
                        Backup Now
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                        <Upload className="w-4 h-4" />
                        Restore
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    System Preferences
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Auto-backup daily</span>
                      <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-green-600">
                        <span className="inline-block h-3 w-3 rounded-full bg-white translate-x-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Two-factor authentication</span>
                      <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-green-600">
                        <span className="inline-block h-3 w-3 rounded-full bg-white translate-x-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Session timeout (30 min)</span>
                      <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-3 w-3 rounded-full bg-white translate-x-1" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Maintenance mode</span>
                      <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-3 w-3 rounded-full bg-white translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
