// CryptoOrder.tsx
import React, { useState } from 'react'

type TabType = 'Buy' | 'Sell'

interface CryptoOrderProps {
  availableBalance: number
  onOrder: (type: TabType, value: number, quantity: number) => void
}

export const OrderForm: React.FC<CryptoOrderProps> = ({ availableBalance, onOrder }) => {
  const [tab, setTab] = useState<TabType>('Buy')
  const [value, setValue] = useState(0)
  const [quantity, setQuantity] = useState(0)

  const handlePercentageClick = (percentage: number) => {
    setQuantity((availableBalance * percentage) / 100)
  }

  const handleOrderClick = () => {
    onOrder(tab, value, quantity)
  }

  return (
    <div className="p-4 bg-slate-800 shadow-md rounded-md">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            tab === 'Buy' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setTab('Buy')}
        >
          Buy
        </button>
        <button
          className={`px-4 py-2 ml-2 rounded ${tab === 'Sell' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setTab('Sell')}
        >
          Sell
        </button>
      </div>
      <input
        type="number"
        placeholder="Value"
        className="mb-4 w-full p-2 border border-gray-300 rounded"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
      />
      <input
        type="number"
        placeholder="Quantity"
        className="mb-4 w-full p-2 border border-gray-300 rounded"
        value={quantity}
        onChange={(e) => setQuantity(parseFloat(e.target.value))}
      />
      <div className="mb-4">
        {['25%', '50%', '75%', '100%'].map((percentage) => (
          <button
            key={percentage}
            className="px-4 py-2 mr-2 rounded bg-blue-500 text-white"
            onClick={() => handlePercentageClick(parseFloat(percentage))}
          >
            {percentage}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <label className="text-slate-200">Available balance: {availableBalance} USD</label>
      </div>
      <input
        type="text"
        readOnly
        className="mb-4 w-full p-2 border border-gray-300 rounded"
        value={`Order size: ${value * quantity} USD`}
      />
      <button
        className={`w-full px-4 py-2 rounded ${tab === 'Buy' ? 'bg-green-500' : 'bg-red-500'} text-white`}
        onClick={handleOrderClick}
      >
        {tab}
      </button>
    </div>
  )
}
