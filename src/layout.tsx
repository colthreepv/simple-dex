import type { FC } from 'react'
import { Dex } from './dex'
import Orderbook, { OrderbookProps } from './order-book'
import { OrderForm } from './order-form'

const mockOrders: OrderbookProps['orders'] = {
  buy: [
    { value: 12333, amount: 1000 },
    { value: 12400, amount: 5000 },
    { value: 12533, amount: 250 },
  ],
  current: 12300,
  sell: [
    { value: 12133, amount: 1000 },
    { value: 12200, amount: 1000 },
    { value: 12223, amount: 1000 },
  ],
}

export const Layout: FC = () => {
  return (
    <div className="container mx-auto py-4 px-4 w-full">
      <div className="flex flex-row justify-between gap-4">
        <div className="w-3/12">
          <Orderbook orders={mockOrders} />
        </div>
        <div className="w-6/12">
          <Dex />
        </div>
        <div className="w-3/12">
          <OrderForm availableBalance={10101} onOrder={() => console.log('missing submit')} />
        </div>
      </div>
    </div>
  )
}
