import React, {useEffect}from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import {MainContainer, TitleContainer, Logo} from './styles'

function HomePage() {
    const history  = useHistory();
    
    useEffect(() => {
        const acessToken = window.localStorage.getItem("acessToken")
        if(acessToken !== null){
            history.push("/mills")
        }
    },[history])

    return(
        <MainContainer>
            <Header/>
            <TitleContainer>
                <h2>Aplicação produzida com base no desafio Cyan Agroanalytics!</h2>
                <Logo src="https://cyan-agro.com/wp-content/uploads/2018/09/cyan-logo-transp.png"/>
            </TitleContainer>
            
        </MainContainer>
    )
}

export default HomePage