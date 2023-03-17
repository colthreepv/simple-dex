import { createChart, ColorType, IChartApi, CandlestickData } from 'lightweight-charts'
import React, { useEffect, useRef } from 'react'

interface ChartColors {
  backgroundColor?: string
  lineColor?: string
  textColor?: string
  areaTopColor?: string
  areaBottomColor?: string
}

interface BTCChartProps {
  data: CandlestickData[]
  colors?: ChartColors
  timeFrame?: { from: number; to: number }
}

export const BTCChart: React.FC<BTCChartProps> = ({
  data,
  colors: {
    backgroundColor = 'rgba(30, 41, 59)',
    lineColor = '#2962FF',
    textColor = 'white',
    areaTopColor = '#2962FF',
    areaBottomColor = 'rgba(41, 98, 255, 0.28)',
  } = {},
  timeFrame,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chart = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth })
    }

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
    })
    chart.timeScale().fitContent()

    const candleSeries = chart.addCandlestickSeries({
      upColor: 'rgba(255, 144, 0, 1)',
      downColor: '#000',
      borderDownColor: 'rgba(255, 144, 0, 1)',
      borderUpColor: 'rgba(255, 144, 0, 1)',
      wickDownColor: 'rgba(255, 144, 0, 1)',
      wickUpColor: 'rgba(255, 144, 0, 1)',
    })
    candleSeries.setData(data)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)

      chart.remove()
    }
  }, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor])

  return <div className="w-full" ref={chartContainerRef} />
}
