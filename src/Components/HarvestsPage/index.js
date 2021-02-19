import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Header from '../Header';
import axios from 'axios';
import { MainContainer, MainPaper, StyledPaper, Title, FilterContainer, Button } from './styles'
import {TextField} from '@material-ui/core'

function HarvestsPage() {
    const {form, onChange, resetForm} = useForm({code: "", startDate: "", endDate: ""});
    const history = useHistory();
    const params = useParams();
    const [harvests, setHarvests] = useState([]);

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
        authAxios.get(`/harvests/?millId=${params.millId}?code=${form.code}`)
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
    console.log(harvests)
    return(
        <MainContainer>
            <Header/>
            <MainPaper>
                <Title>Safras</Title>
                <form onSubmit={handleFilter}>
                    <FilterContainer>
                            <TextField 
                                label="Nome da Usina" 
                                variant="outlined"
                                type="text"
                                name="code"
                                placeholder="Busque pelo nome do álbum"
                                value={form.code}
                                onChange={handleInputChange}
                                fullWidth={true}
                            />
                            <Button>Filtrar</Button>
                            <Button onClick={handleFilter}>Limpar Filtros</Button>
                    </FilterContainer>
                </form>
                    
                {harvests.map((harvest) => {
                    return(
                        <StyledPaper key={harvest.id} onClick={() => goToFarmsPage(harvest.id)}>
                            <p>Código da Safra: {harvest.code}</p>
                            <p>Data da plantação: {harvest.startDate}</p>
                            <p>Data da colheita: {harvest.endDate}</p>
                        </StyledPaper>
                    )
                })}
                <Button onClick={goToMillsPage}>Voltar para Usinas</Button>
            </MainPaper>
        </MainContainer>
    )
}

export default HarvestsPage