import React from 'react'
import styled from 'styled-components'
import { dateFormat } from '../../utils/dateFormat';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons';
import Avatar from '@material-ui/core/Avatar';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';



function IncomeItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {

    const categoryIcon = () => {
        switch (category) {
            case 'salary':
                return money;
            case 'freelancing':
                return freelance
            case 'investments':
                return stocks;
            case 'stocks':
                return users;
            case 'bitcoin':
                return bitcoin;
            case 'bank':
                return card;
            case 'youtube':
                return yt;
            case 'other':
                return piggy;
            default:
                return ''
        }
    }

    const expenseCatIcon = () => {
        switch (category) {
            case 'education':
                return book;
            case 'groceries':
                return food;
            case 'health':
                return medical;
            case 'subscriptions':
                return tv;
            case 'takeaways':
                return takeaway;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'other':
                return circle;
            default:
                return ''
        }
    }

    console.log('type', type)

    return (
        <IncomeItemStyled indicator={indicatorColor}>
            <div className="icon">
                {type === 'expense' ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="content">
                
                <div className="inner-content">
                    <div className="text">
                    <h5>{title}</h5>
                        <p style={{paddingTop:"6px"}}>₹ {amount}</p>
                        <p style={{paddingTop:"6px"}}><InsertInvitationIcon style={{color:"#710193"}}/> {dateFormat(date)}</p>
                        <p style={{paddingTop:"6px"}}>
                            <ChatBubbleIcon style={{color:"#710193"}} />
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Avatar style={{backgroundColor:"#d19fe8" ,border:"3px solid black"}} >
                            <DeleteSweepIcon style={{color:"black"}}
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'black'}
                            color={'#fff'}
                            iColor={'black'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                        </Avatar>
                        
                    </div>
                </div>
            </div>
        </IncomeItemStyled>
    )
}

const IncomeItemStyled = styled.div`
    background: white;
    border: 3px solid black;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 10px;
    padding: 0.4rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: black;
    .icon{
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background: black;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.9rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default IncomeItem