import React from 'react'
import { Line } from 'react-chartjs-2'
import './ChartComponent.scss'

type Props = {
  chartData: unknown
}

export const ChartComponent: React.FC<Props> = ({ chartData }) => {
  return (
    <div className="chart-container">
      <div className="line-chart">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              onClick: null,
            },
            scales: {
              yAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
              xAxes: [
                {
                  gridLines: {
                    display: false,
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  )
}
