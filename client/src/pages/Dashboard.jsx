import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import ProductSummary from "../components/ProductSummary";
import {
    Box,
    Button,
    Typography,
    useTheme,
    useMediaQuery
} from "@mui/material";
import { getProducts } from "../redux/features/product/productSlice";
import Chart from '../expense/Components/Chart/Chart';
import styled from 'styled-components'
import { useGlobalContext } from '../expense/context/globalContext';
import History from '../expense/History/History';
import "./dashboard.css"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';



const Catalogue = () => {
    const dispatch = useDispatch();

    const { totalExpenses, incomes, expenses, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext()

    useEffect(() => {
        getIncomes()
        getExpenses()
    }, [])

    const { products, isLoading, isError, message } = useSelector(
        (state) => state.product
    );

    useEffect(() => {

        dispatch(getProducts());


        if (isError) {
            console.log(message);
        }
    }, [isError, message, dispatch]);



    const theme = useTheme();
    const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

    return (
        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />


            </FlexBetween>
            <ProductSummary products={products} />


            <div className="dashboard-container" style={{marginTop:"40px"}}>
                <div className="left-section">
                    <div>
                        <h2>Main Section 1</h2>
                        <div className="box-container">
                            <div className="box" style={{ border: "3px solid black",color:"black",backgroundColor:"#d19fe8",borderRadius:"10px" ,boxShadow: " black 0px 0px 0px 2px inset,  rgb(128,128,128) 10px -10px 0px -3px, black 10px -10px "}} >
                                <ShoppingCartIcon />
                                <h3>Total Revenue</h3>
                                <p style={{ color: 'black' }}>
                                    ₹ {totalIncome()}
                                </p>
                            </div>
                            <div style={{ border: "3px solid black" ,color:"black", backgroundColor:"yellow" ,borderRadius:"10px", boxShadow: " black 0px 0px 0px 2px inset,  rgb(128,128,128) 10px -10px 0px -3px, black 10px -10px "}} className="box">
                            <ShoppingCartIcon />
                                <h3>Total Expense</h3>
                                <p style={{ color: 'black' }}>
                                    ₹ {totalExpenses()}
                                </p>
                            </div>
                            <div style={{ border: "3px solid black" ,color:"black", backgroundColor:"#FFA07A" ,borderRadius:"10px", boxShadow: " black 0px 0px 0px 2px inset,  rgb(128,128,128) 10px -10px 0px -3px, black 10px -10px "}} className="box">
                            <ShoppingCartIcon />
                                <h3>Total Balance</h3>
                                <p style={{ color: 'black' }}>
                                    ₹ {totalBalance()}
                                </p>
                            </div>
                        </div>
                        <div className="chart-container"><Chart /></div>

                    </div>
                </div>
                <div className="right-section">
                    <div className="history-con">
                        <History />
                        <h2 style={{ color: 'black' }} className="salary-title">Min <span>Income</span>Max</h2>
                        <div className="salary-item">
                            <p style={{ color: 'black' }}>
                                ₹{Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p style={{ color: 'black' }}>
                                ₹{Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 style={{ color: 'black' }} className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p style={{ color: 'black' }}>
                                ₹{Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p style={{ color: 'black' }}>
                                ₹{Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Box >
    )
}


const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    width: 100%;
`;


const DashboardStyled = styled.div`
    .stats-con{
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem; 
        
                
        .chart-con{
            grid-column: 1 / 4;
            height: 400px;
            .amount-con{
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 2rem;
                margin-top: 2rem;
                .income, .expense{ 
                    grid-column: span 2;
                   
                }
               
            }
        }

        .history-con{
            grid-column: 4 / -1;
            h2{
                margin: 1rem 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .salary-title{
                font-size: 1.2rem;
                span{
                    font-size: 1.8rem;
                }
            }
            .salary-item{
                background: #FCF6F9;
                border: 3px solid black;
                box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
                padding: 1rem;
                border-radius: 6px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                p{
                    font-weight: 600;
                    font-size: 1.6rem;
                }
            }
        }
    }
`;

export default Catalogue