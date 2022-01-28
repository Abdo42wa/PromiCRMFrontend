import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { weekNumber } from 'weeknumber'
import moment from 'moment'

function LastMonthProducts(props) {

    return (
        <div>
        {/* map throug data array. return only weekNumbers for labels */}
            <Bar
                // style={{height: '50px', width: '50px'}}
                data={{
                    labels: props.data.map(item => moment(item.completionDate).format('YYYY/MM/DD')),
                    datasets: [{
                        label: 'Padarytu produktų kiekis',
                        data: props.data.map(item => item.quantity),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }],
                }}
                height={100}
                width={300}
                options={{
                    // maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }}
            />
        </div>
    )
}

export default LastMonthProducts