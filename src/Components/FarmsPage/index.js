import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Header from '../Header';
import axios from 'axios';
import { MainContainer, MainPaper, StyledPaper, Title, FilterContainer, Button, StyledForm } from './styles'
import {TextField} from '@material-ui/core'

function FarmsPage() {
    const {form, onChange, resetForm} = useForm({
        code: "", 
        name: "", 
        newCode: "",
        newName: "",
    });
    const history = useHistory();
    const params = useParams();
    const [farms, setFarms] = useState([]);
    const [render, setRender] = useState(false)
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
        if(!acessToken) {
            history.push("/login")
        } else {
            authAxios.get(`/farms/?harvestId=${params.harvestId}`)
            .then((res) => {
                setFarms(res.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
        }
    }, [acessToken, history, params, baseURL])

    const handleFilter = (e) => {
        e.preventDefault();
        authAxios.get(`/farms/?harvestId=${params.harvestId}&name=${form.name}&code=${form.code}`)
        .then((res) => {
            setFarms(res.data)
            resetForm()
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    const goToFieldsPage = (farmId)  => {
        history.push(`/fields/${farmId}`)
    }

    const goToMillsPage = () => {
        history.push(`/mills`)
    }

    const changeRender = (boolean) => {
        setRender(boolean)
    }

    const submitNewFarm = (e) => {
        e.preventDefault();
        const body = {
            name: form.newName,
            code: form.newCode,
            harvestId: parseInt(params.harvestId)
        }
        authAxios.post(`/farms`, body)
        .then((res) => {
            window.alert(`Fazenda ${form.newName} cadastrada com sucesso!`)
            setRender(false)
        })
        .catch((err) => {
            console.log(err.message)
            window.alert("Não foi possível cadastrar a safra, contate o administrador.")
            resetForm()
        })
    }

    const renderPage = () => {
        if (render === false) {
            return(
                <MainContainer>
                    <Header/>
                    <MainPaper>
                        <Title>Fazendas</Title>
                        <form onSubmit={handleFilter}>
                            <FilterContainer>
                                    <TextField 
                                        label="Código da Fazenda" 
                                        variant="outlined"
                                        type="text"
                                        name="code"
                                        placeholder="Código da Fazenda"
                                        value={form.code}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        label="Nome da Fazenda"
                                        variant="outlined"
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleInputChange}
                                        fullWidth={false}
                                    />
                                    <div>
                                    <Button>Filtrar</Button>
                                    <Button onClick={handleFilter}>Limpar Filtros</Button>
                                    <Button onClick={() => changeRender(true)}>Cadastrar Fazenda</Button>
                                    </div>

                            </FilterContainer>
                        </form>
                            
                        {farms.length === 0 ? <h4>Nenhuma fazenda cadastrada!</h4> : farms.map((farm) => {
                            return(
                                <StyledPaper key={farm.id} onClick={() => goToFieldsPage(farm.id)}>
                                    <p>Código da Fazenda: {farm.code}</p>
                                    <p>Nome da Fazenda: {farm.name}</p>
                                </StyledPaper>
                            )
                        })}
                        <Button onClick={goToMillsPage}>Voltar para Usinas</Button>
                    </MainPaper>
                </MainContainer>
            )
        }else {
            return(
                <MainContainer>
                    <Header/>
                    <MainPaper>
                        <Title>Cadastrar nova Fazenda</Title>
                        <FilterContainer>
                        <StyledForm onSubmit={submitNewFarm}>
                            <TextField 
                                label="Código da Fazenda" 
                                variant="outlined"
                                type="text"
                                name="newCode"
                                placeholder="Código da Fazenda"
                                value={form.newCode}
                                onChange={handleInputChange}
                                fullWidth={true}
                            />
                            <TextField
                                label="Nome da Fazenda"
                                variant="outlined"
                                type="text"
                                name="newName"
                                value={form.newName}
                                onChange={handleInputChange}
                                fullWidth={true}
                            />
                            <div>
                            <Button>Cadastrar</Button>
                            <Button onClick={() => changeRender(false)}>Voltar</Button>
                            </div>
                            
                        </StyledForm>
                        </FilterContainer>
                    </MainPaper>
                </MainContainer>
            )
        }
    }

    return(
        renderPage()
    )
}

export default FarmsPage