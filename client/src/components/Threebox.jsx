import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useGlobalContext } from '../expense/context/globalContext';

const Threebox = () => {
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
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor="#ffffff"
      border= "2px solid black"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: "#1A1A1A" }}>
          {title}
        </Typography>
        <Avatar
            sx={{
              backgroundColor: '#ED7014',
              height: 46,
              width: 46
            }}
          >
            <SvgIcon sx={{
              backgroundColor: '#ED7014',
              height: 26,
              width: 26
            }}>
              {icon}
            </SvgIcon>
          </Avatar>
      </FlexBetween>

      <Typography
        variant="h6"
        fontWeight="600"
        sx={{ color: "#1A1A1A" }}
      >
        {count}
      </Typography>
      <FlexBetween gap="1rem">
        
        <Typography sx={{ color: "#1A1A1A" }}>{description}</Typography>
      </FlexBetween>
    </Box>
  )
}

export default Threebox