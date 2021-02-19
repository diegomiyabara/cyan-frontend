import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Header from '../Header';
import axios from 'axios';
import { MainContainer, MainPaper, StyledPaper, Title, FilterContainer, Button, StyledForm } from './styles'
import {TextField} from '@material-ui/core'
import dayjs from 'dayjs';

function HarvestsPage() {
    const today = dayjs()
    dayjs.locale('pt-br')
    const {form, onChange, resetForm} = useForm({
        code: "", 
        startDate: today.format("YYYY-MM-DD"), 
        endDate: today.format("YYYY-MM-DD"),
        newCode: "",
        newStartDate: today.format("YYYY-MM-DD"),
        newEndDate:today.format("YYYY-MM-DD")
    });
    const history = useHistory();
    const params = useParams();
    const [harvests, setHarvests] = useState([]);
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
            authAxios.get(`/harvests/?millId=${params.millId}`)
            .then((res) => {
                setHarvests(res.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
        }
    }, [acessToken, history, params, baseURL])

    const handleFilter = (e) => {
        e.preventDefault();
        authAxios.get(`/harvests/?millId=${params.millId}&code=${form.code}`)
        .then((res) => {
            setHarvests(res.data)
            resetForm()
        })
    }

    const goToFarmsPage = (harvestId)  => {
        history.push(`/farms/${harvestId}`)
    }

    const goToMillsPage = () => {
        history.push(`/mills`)
    }

    const changeRender = (boolean) => {
        setRender(boolean)
    }

    const submitNewHarvest = (e) => {
        e.preventDefault();
        const body = {
            code: form.newCode,
            startDate: form.newStartDate,
            endDate: form.newEndDate
        }
        authAxios.post(`/harvests?millId=${params.millId}`, body)
        .then((res) => {
            window.alert(`Safra ${form.newCode} cadastrada com sucesso!`)
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
                        <Title>Safras</Title>
                        <form onSubmit={handleFilter}>
                            <FilterContainer>
                                    <TextField 
                                        label="Código da Safra" 
                                        variant="outlined"
                                        type="text"
                                        name="code"
                                        placeholder="Código da Safra"
                                        value={form.code}
                                        onChange={handleInputChange}
                                        fullWidth={false}
                                    />
                                    <TextField
                                        label="Data do Plantio"
                                        variant="outlined"
                                        type="date"
                                        name="startDate"
                                        value={form.startDate}
                                        onChange={handleInputChange}
                                        fullWidth={false}
                                    />
                                    <TextField
                                        label="Data da Colheita"
                                        variant="outlined"
                                        type="date"
                                        name="endDate"
                                        value={form.endDate}
                                        onChange={handleInputChange}
                                        fullWidth={false}
                                    />
                                    <Button>Filtrar</Button>
                                    <Button onClick={handleFilter}>Limpar Filtros</Button>
                                    <Button onClick={() => changeRender(true)}>Cadastrar Safra</Button>
                            </FilterContainer>
                        </form>
                            
                        {harvests.length === 0 ? <h4>Nenhuma safra cadastrada!</h4> : harvests.map((harvest) => {
                            return(
                                <StyledPaper key={harvest.id} onClick={() => goToFarmsPage(harvest.id)}>
                                    <p>Código da Safra: {harvest.code}</p>
                                    <p>Data da plantação: {dayjs(harvest.startDate).format("DD/MM/YYYY")}</p>
                                    <p>Data da colheita: {dayjs(harvest.endDate).format("DD/MM/YYYY")}</p>
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
                        <Title>Cadastrar nova Safra</Title>
                        <FilterContainer>
                        <StyledForm onSubmit={submitNewHarvest}>
                            <TextField 
                                label="Código da Safra" 
                                variant="outlined"
                                type="text"
                                name="newCode"
                                placeholder="Código da Safra"
                                value={form.newCode}
                                onChange={handleInputChange}
                                fullWidth={true}
                            />
                            <TextField
                                label="Data do Plantio"
                                variant="outlined"
                                type="date"
                                name="newStartDate"
                                value={form.newStartDate}
                                onChange={handleInputChange}
                                fullWidth={true}
                            />
                            <TextField
                                label="Data da Colheita"
                                variant="outlined"
                                type="date"
                                name="newEndDate"
                                value={form.newEndDate}
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

export default HarvestsPage