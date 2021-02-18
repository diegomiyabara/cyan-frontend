import React from "react";
import { useHistory } from "react-router-dom";
import { MainContainer, Logo, ButtonContainer, Button, SideContainer } from  './styles'

function Header() {
    const history = useHistory();
    const goToLoginPage = () => {
        history.push("/login");
    }

    const goToHomePage = () => {
        history.push("/")
    }

    const handleLogout = () => {
        window.localStorage.clear();
        history.push("/");
        window.location.reload();
    }

    const renderButton  = () => {
        const acessToken = window.localStorage.getItem("acessToken");
        if(!acessToken) {
            return(
                <ButtonContainer>
                    <Button onClick={goToLoginPage}>Login</Button>
                </ButtonContainer>
            )
        } else {
            return(
                <ButtonContainer>
                    <Button  onClick={handleLogout}>Logout</Button>
                </ButtonContainer>
            )
        }
    }
    return(
        <MainContainer>
                <Logo src="https://cyan-agro.com/wp-content/uploads/2018/09/cyan-logo-transp.png" alt="cyan-logo" onClick={goToHomePage}/>
                {renderButton()}
        </MainContainer>        
    )
}   

export default Header