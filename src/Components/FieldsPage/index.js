import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Header from '../Header';
import axios from 'axios';
import { MainContainer, MainPaper, StyledPaper, Title, FilterContainer, Button, StyledForm } from './styles';
import {TextField} from '@material-ui/core';


function FieldsPage() {
    const {form, onChange, resetForm} = useForm({
        code: "", 
        newCode: "",
        coordinates: ""
    });
    const history = useHistory();
    const params = useParams();
    const [fields, setFields] = useState([]);
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
            authAxios.get(`/fields/?farmId=${params.farmId}`)
            .then((res) => {
                setFields(res.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
        }
    }, [acessToken, history, params, baseURL])

    const handleFilter = (e) => {
        e.preventDefault();
        authAxios.get(`/fields/?farmId=${params.farmId}&code=${form.code}`)
        .then((res) => {
            setFields(res.data)
            resetForm()
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    const goToFieldsPage = (fieldId)  => {
        history.push(`/fieldmap/${fieldId}/${params.farmId}`)
    }

    const goToMillsPage = () => {
        history.push(`/mills`)
    }

    const changeRender = (boolean) => {
        setRender(boolean)
    }

    const submitNewField = (e) => {
        e.preventDefault();
        const body = {
            code: form.newCode,
            coordinates: form.coordinates,
            farmId: parseInt(params.farmId)
        }
        authAxios.post(`/fields`, body)
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
                        <Title>Talhões</Title>
                        <form onSubmit={handleFilter}>
                            <FilterContainer>
                                    <TextField 
                                        label="Código do Talhão" 
                                        variant="outlined"
                                        type="text"
                                        name="code"
                                        placeholder="Código do Talhão"
                                        value={form.code}
                                        onChange={handleInputChange}
                                    />
                                    <div>
                                    <Button>Filtrar</Button>
                                    <Button onClick={handleFilter}>Limpar Filtros</Button>
                                    <Button onClick={() => changeRender(true)}>Cadastrar Talhão</Button>
                                    </div>

                            </FilterContainer>
                        </form>
                            
                        {fields.length === 0 ? <h4>Nenhum talhão encontrado!</h4> : fields.map((field) => {
                            return(
                                <StyledPaper key={field.id} onClick={() => goToFieldsPage(field.id)}>
                                    <p>Código do Talhão: {field.code}</p>
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
                        <Title>Cadastrar novo Talhão</Title>
                        <FilterContainer>
                        <StyledForm onSubmit={submitNewField}>
                            <TextField 
                                label="Código do Talhão" 
                                variant="outlined"
                                type="text"
                                name="newCode"
                                placeholder="Código do Talhão"
                                value={form.newCode}
                                onChange={handleInputChange}
                                fullWidth={true}
                            />
                            <TextField
                                label="Coordenadas"
                                variant="outlined"
                                type="text"
                                name="coordinates"
                                value={form.coordinates}
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

export default FieldsPage