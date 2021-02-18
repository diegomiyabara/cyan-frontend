import React from 'react';
import Header from '../Header';
import {MainContainer, TitleContainer, Logo} from './styles'

function HomePage() {
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