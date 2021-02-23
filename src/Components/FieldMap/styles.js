import {Map} from 'react-leaflet';
import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

export const StyledMapContainer = styled(Map)`
    flex-grow: 1;
`

export const Title = styled.p`

`

export const Button = styled.button`
    height: 40px;
    width: 130px;
    border-radius: 10px;
    background-color: #323232;
    color: #FFF;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    :hover {
        background-color: #FFF;
        color: #323232;
    }
    align-self: center;
`