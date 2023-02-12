import React, { useState, useEffect, useRef, useContext } from "react";
import { LoginContext } from '../../context/ContextProvider';
import { updateQuantity } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';
import { ButtonGroup, Button } from "@mui/material";
import { styled } from '@mui/system';

const Component = styled(ButtonGroup)`
    margin-top: 30px;
`;

const StyledButton = styled(Button)`
    border-radius: 50%;
`;

const GroupedButton = ({id, quantity}) => {
    // const [ counter, setCounter ] = useState(quantity);
    const { account } = useContext(LoginContext);
    const dispatch = useDispatch();
    // //useRef is used to prevent useEffect from running on componentDidMount
    // const isMounted = useRef(false);

    // useEffect(()=>{
    //     if (isMounted.current) {
    //         console.log("counter changed, useEffect called");
    //         dispatch(updateQuantity(id, counter));
    //     } else {
    //         isMounted.current = true;
    //     }
    // }, [counter, dispatch]);

    return (
        <Component>
            {/* <StyledButton onClick={() => setCounter(counter => counter - 1 )} disabled={counter == 0}>-</StyledButton> */}
            <StyledButton onClick={() => dispatch(updateQuantity(account?.email, id, quantity-1))} disabled={quantity == 0}>-</StyledButton>
            {/* <Button disabled>{counter}</Button> */}
            <Button disabled>{quantity}</Button>
            {/* <StyledButton onClick={() => setCounter(counter => counter + 1 )}>+</StyledButton> */}
            <StyledButton onClick={() => dispatch(updateQuantity(account?.email, id, quantity+1))}>+</StyledButton>
        </Component>
    );
}

export default GroupedButton;