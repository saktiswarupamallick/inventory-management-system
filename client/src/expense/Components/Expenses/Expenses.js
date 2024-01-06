import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

function Expenses() {
    const {addIncome,expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])
    return (
        <ExpenseStyled>
            <InnerLayout style={{fontFamily:"League Spartan"}}>
               
                <h2 style={{ boxShadow: " black 0px 0px 0px 2px inset, rgb(128,128,128) 10px -10px 0px -3px, black 10px -10px "}} className="total-income">Total Expenditure: <span>₹{totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="incomes">
                        {expenses.map((income) => {
                            const {_id, title, amount, date, category, description, type} = income;
                            console.log(income)
                            return <IncomeItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor="green"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}

const ExpenseStyled = styled.div`
display: flex;
overflow: auto;
.total-income{
    display: flex;
    justify-content: center;
    align-items: center;
    color:black;
    background: #FCF6F9;
    border: 3px solid black;
    boxShadow: black 0px 0px 0px 2px inset, rgb(128,128,128) 10px -10px 0px -3px, black 10px -10px ;
    border-radius: 6px;
    padding: 0.6rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: .5rem;
    span{
        font-size: 1.6rem;
        font-weight: 800;
        color: green;
    }
}
.income-content{
    display: flex;
    gap: 2rem;
    .incomes{
        flex: 1;
    }
}
`;

export default Expenses