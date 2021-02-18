import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import {MainContainer, LoginContainer, LoginBox, ContainerInputs, Title, Button, LoadingContainer, Yellow, Red, Blue, Violet} from './styles'
import Header from '../Header'
import {TextField} from '@material-ui/core'
import useForm from '../../Hooks/useForm'

function LoginPage() {
    const history = useHistory();
    const [render, setRender] = useState(false)
    const baseUrl = "https://fierce-inlet-34109.herokuapp.com"
    const {form, onChange, resetForm} = useForm({username:"", password: ""})
    const handleInputChange = event => {
        const {name, value} = event.target
        onChange(name, value)
    }
    
    useEffect(() => {
        const token = window.localStorage.getItem("token")
        if(token !== null){
            history.push("/albuns")
        }
    },[history])

    const renderButton = () => {
        if(!render) {
            return (
                <Button>Fazer Login</Button>
            )
        } else {
            return(
                <LoadingContainer><Yellow></Yellow><Red></Red><Blue></Blue><Violet></Violet></LoadingContainer>
            )
        }
    }

    const handleLogin = (event) => {
        event.preventDefault()
        setRender(true)
        const body = {
            username: form.username,
            password: form.password
        }
        axios.post(`${baseUrl}/login`, body)
        .then(response => {
            window.localStorage.setItem("acessToken", response.data.token)
            history.push("/mills")
        })
        .catch(err => {
            alert("Usuário/email ou senha inválidos!")
            setRender(false)
            resetForm()
        })  
    }
    return(
        <MainContainer>
            <Header/>
            <LoginContainer>
                <LoginBox>
                    <Title>Inicie sua sessão</Title>
                    <form onSubmit={handleLogin}>
                        <ContainerInputs>
                            <TextField 
                                label="Login" 
                                variant="outlined"
                                type="text"
                                name="username"
                                placeholder="Digite seu usuário ou E-mail"
                                value={form.username}
                                required
                                onChange={handleInputChange}
                            />
                            <br></br>
                            <TextField  
                                label="Senha" 
                                variant="outlined"                      
                                type="password" 
                                name="password"
                                placeholder="Digite sua senha"
                                value={form.password} 
                                required
                                onChange={handleInputChange}
                            />
                        </ContainerInputs>
                        <br></br>
                        {renderButton()}
                    </form>
                </LoginBox>
            </LoginContainer>
        </MainContainer>
    )
}

export default LoginPage