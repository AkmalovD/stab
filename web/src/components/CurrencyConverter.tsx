import { convertCurrency, formatCurrency, getMockExchangeRates } from '@/utils/calculations';
import React, { useState } from 'react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [copied, setCopied] = useState<boolean>(false);
  const [showMultiple, setShowMultiple] = useState<boolean>(false);

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  ];

  const presetAmounts = [100, 500, 1000, 5000, 10000];

  const convertedAmount = convertCurrency(amount || 0, fromCurrency, toCurrency);
  const exchangeRate = getMockExchangeRates()[fromCurrency]?.[toCurrency] || 1;

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleCopy = async () => {
    const text = `${formatCurrency(amount, fromCurrency)} = ${formatCurrency(convertedAmount, toCurrency)}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getOtherCurrencies = () => {
    return currencies.filter(c => c.code !== fromCurrency && c.code !== toCurrency).slice(0, 3);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#0d98ba]/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#0d171b]">
          Currency Converter
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-[#4c809a] uppercase tracking-wide mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '') {
                setAmount(0);
              } else {
                const numValue = Number(value);
                if (!isNaN(numValue) && numValue >= 0) {
                  setAmount(numValue);
                }
              }
            }}
            onBlur={(e) => {
              if (!e.target.value || Number(e.target.value) <= 0) {
                setAmount(1000);
              }
            }}
            min="0"
            step="0.01"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] text-[#0d171b] font-medium mb-3"
            placeholder="Enter amount"
          />
          <div className="flex items-center gap-2 flex-wrap">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#f8fafc] text-[#0d98ba] border border-[#0d98ba]/20 hover:bg-[#0d98ba] hover:text-white transition-colors"
              >
                {preset.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#4c809a] uppercase tracking-wide mb-2">
              From
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] text-[#0d171b] font-medium"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#4c809a] uppercase tracking-wide mb-2">
              To
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d98ba] focus:border-[#0d98ba] text-[#0d171b] font-medium"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-[#f8fafc] rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <span className="text-xs text-[#4c809a] font-medium uppercase tracking-wide">Result</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white text-[#0d98ba] border border-[#0d98ba]/20 hover:bg-[#0d98ba] hover:text-white transition-colors"
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="text-3xl font-bold text-[#0d171b] mb-2">
            {formatCurrency(convertedAmount, toCurrency)}
          </div>
          <div className="text-sm text-[#4c809a] mb-3">
            {formatCurrency(amount, fromCurrency)} = {formatCurrency(convertedAmount, toCurrency)}
          </div>
          <div className="text-xs text-[#4c809a] font-medium pt-3 border-t border-gray-200">
            Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
          </div>
        </div>

        {showMultiple && (
          <div className="bg-[#f8fafc] rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#0d98ba]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <span className="text-xs text-[#4c809a] font-medium uppercase tracking-wide">Other Currencies</span>
              </div>
            </div>
            <div className="space-y-3">
              {getOtherCurrencies().map((currency) => {
                const converted = convertCurrency(amount, fromCurrency, currency.code);
                return (
                  <div key={currency.code} className="flex items-center justify-between py-3 px-4 bg-white rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#0d171b]">{currency.code}</span>
                      <span className="text-xs text-[#4c809a]">{currency.name}</span>
                    </div>
                    <span className="font-bold text-[#0d171b]">{formatCurrency(converted, currency.code)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowMultiple(!showMultiple)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-lg bg-white text-[#0d98ba] border border-[#0d98ba]/20 hover:bg-[#0d98ba] hover:text-white transition-colors"
        >
          <span>{showMultiple ? 'Hide' : 'Show'} Other Currencies</span>
          <svg 
            className={`w-4 h-4 transition-transform ${showMultiple ? 'rotate-180' : ''}`} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        <div className="text-xs text-[#4c809a] text-center pt-2 border-t border-gray-100">
          Exchange rates are approximate and for reference only
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;