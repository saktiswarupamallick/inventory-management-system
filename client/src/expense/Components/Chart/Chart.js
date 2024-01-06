import React from 'react'
import {Chart as ChartJs, 
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const {incomes, expenses} = useGlobalContext()

    const data = {
        labels: incomes.map((inc) =>{
            const {date} = inc
            return dateFormat(date)
        }),
        datasets: [
            {
                label: 'Income',
                fill: true,
                borderColor: '#d19fe8',
                backgroundColor: '#d19fe8',
                pointBorderColor:"transparent",
                pointBorderWidth:"4",
                
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income
                        return amount
                    })
                ],
                
                tension: .7
            },
            {
                fill: true,
                label: 'Expenses',
                borderColor: '#FFA07A',
                backgroundColor: '#FFA07A',
                pointBorderColor:"transparent",
                pointBorderWidth:"4",
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense
                        return amount
                    })
                ],
               
                tension: .7
            }
        ]
    }


    return (
        <ChartStyled  >
            <Line data={data}    />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 4px solid black;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 6px;
    width:800px;
    height:100%;
   
`;

export default Chart