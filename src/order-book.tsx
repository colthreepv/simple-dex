import React from 'react'

interface Order {
  value: number
  amount: number
}

export interface OrderbookProps {
  orders: {
    buy: Order[]
    current: number
    sell: Order[]
  }
}

const Orderbook: React.FC<OrderbookProps> = ({ orders }) => {
  const { buy, current, sell } = orders

  const renderOrder = (order: Order) => {
    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="text-right">{order.value}</div>
        <div className="text-left">{order.amount}</div>
      </div>
    )
  }

  return (
    <div className="bg-slate-800 border border-gray-300 rounded-lg p-4">
      <div className="divide-y divide-gray-300">
        <div className="pb-2">
          {buy.map((order, index) => (
            <div key={index} className="text-green-500">
              {renderOrder(order)}
            </div>
          ))}
        </div>
        <div className="py-2 text-center font-bold">{current}</div>
        <div className="pt-2">
          {sell.map((order, index) => (
            <div key={index} className="text-red-500">
              {renderOrder(order)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orderbook
