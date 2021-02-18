import styled from 'styled-components'

export const MainContainer  = styled.div`
    display: flex;
    background-color: #4584CC;
    color: #FFF;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
`

export const Logo = styled.img`
    height: 100%;
    cursor: pointer;
`

export const ButtonContainer = styled.div`

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
`
