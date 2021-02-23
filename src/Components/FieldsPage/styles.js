import { Paper, TextField } from '@material-ui/core';
import styled from 'styled-components';

export const MainContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`

export const MainPaper = styled(Paper)`
    margin: 25px;
    flex-grow: 1;
`

export const Title = styled.h1`
    color: #323232;
`

export const StyledPaper = styled(Paper)`
    margin: 12px 80px;
    padding: 8px;
    cursor: pointer;
`

export const FilterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 16px auto;
    width: 55%;
`

export const Button = styled.button`
    height: 40px;
    width: 180px;
    margin: 10px 5px;
    align-self: center;
    background-color: #323232;
    color: #F9F9F9;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    :hover {
        color: #F9F9F9;
        opacity: 90%;
    }
`

export const StyledForm = styled.form`
    width: 80%;
    display: flex;
    flex-direction: column;
    height: 65vh;
    justify-content: space-around;
`