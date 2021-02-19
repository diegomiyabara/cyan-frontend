import React, {useEffect, useState} from 'react';
import Header from '../Header';
import { useHistory } from 'react-router-dom';
import { MainContainer, MainPaper, StyledPaper, Title, FilterContainer, Button } from './styles'
import {TextField} from '@material-ui/core'
import axios from 'axios';
import useForm from '../../Hooks/useForm'

function MillsPage() {
    const history  = useHistory();
    const [mills, setMills] = useState([]);
    const [render, setRender] = useState(false)
    const {form, onChange, resetForm} = useForm({millHash:"", millName: ""})
    const handleInputChange = event => {
        const {name, value} = event.target
        onChange(name, value)
    }

    const acessToken = window.localStorage.getItem("acessToken")
    const baseURL = "https://fierce-inlet-34109.herokuapp.com"
    const authAxios = axios.create({
        baseURL,
        headers: {
            Authorization: `Bearer ${acessToken}`
        }
    })
    
    useEffect(() => {
        if(acessToken === null){
            history.push("/login")
        } else {
            authAxios.get(`/mills`)
            .then((res) => {
                setMills(res.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
        }
    },[history, acessToken])

    const handleFilter = (e) => {
        e.preventDefault();
        authAxios.get(`/mills/?name=${form.millHash}`)
        .then((res) => {
            setMills(res.data)
            resetForm()
        })
    }

    const goToHarvestPage = (millId)  => {
        history.push(`/harvests/${millId}`)
    }

    const changeRender = (boolean) => {
        setRender(boolean)
    } 

    const submitNewMill = (e) => {
        e.preventDefault();
        const body  = {
            name: form.millName
        }
        authAxios.post(`/mills`, body)
        .then((res) => {
            window.alert(`Usina ${form.millName} cadastrada com sucesso!`)
            setRender(false)
        })
        .catch((err) => {
            window.alert(`Não foi possível cadastrar a usina, contate o administrador.`)
            setRender(false)
        })
    }

    const renderPage = () => {
        if(render === false) {
            return(
                <MainContainer>
                    <Header/>
                    <MainPaper>
                    <Title>Usinas</Title>
                    <form onSubmit={handleFilter}>
                        <FilterContainer>
                            <TextField 
                                label="Nome da Usina" 
                                variant="outlined"
                                type="text"
                                name="millHash"
                                placeholder="Busque pelo nome do álbum"
                                value={form.millHash}
                                onChange={handleInputChange}
                                fullWidth={true}
                            />
                            <Button>Filtrar</Button>
                            <Button onClick={handleFilter}>Limpar Filtros</Button>
                            <Button onClick={() => changeRender(true)}>Cadastrar novo</Button>
                        </FilterContainer>
                    </form>  
                    {mills.map((mill) => {
                        return(
                            <StyledPaper key={mill.id} onClick={() => goToHarvestPage(mill.id)}>
                                <p>Usina: {mill.name}</p>
                            </StyledPaper>
                        )
                    })}
                    </MainPaper>
                </MainContainer>
            )
        } else {
            return(
                <MainContainer>
                    <Header/>
                    <MainPaper>
                        <Title>Cadastrar nova Usina</Title>
                        <form onSubmit={submitNewMill}>
                            <FilterContainer>
                                <TextField 
                                    label="Nome da Usina" 
                                    variant="outlined"
                                    type="text"
                                    name="millName"
                                    placeholder="Nome da Usina"
                                    value={form.millName}
                                    onChange={handleInputChange}
                                    fullWidth={true}
                                />
                                <Button>Cadastrar</Button>
                                <Button onClick={() => changeRender(false)}>Voltar</Button>
                            </FilterContainer>
                        </form>
                    </MainPaper>
                </MainContainer>
            )
        }
    }

    return (
        renderPage()
    )
}

export default MillsPage