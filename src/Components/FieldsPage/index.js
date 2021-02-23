import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Header from '../Header';
import axios from 'axios';
import { MainContainer, MainPaper, StyledPaper, Title, FilterContainer, Button, StyledForm } from './styles';
import {TextField} from '@material-ui/core';
import { EditControl } from 'react-leaflet-draw';
import { TileLayer, FeatureGroup } from 'react-leaflet'
import { StyledMapContainer } from '../FieldMap/styles';
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

function FieldsPage() {
    const {form, onChange, resetForm} = useForm({
        code: "", 
        newCode: ""
    });
    const history = useHistory();
    const params = useParams();
    const [fields, setFields] = useState([]);
    const [render, setRender] = useState(false)
    const [coordinates, setCoordinates] = useState([])
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
            coordinates: coordinates,
            farmId: parseInt(params.farmId)
        }
        authAxios.post(`/fields`, body)
        .then((res) => {
            window.alert(`Talhão ${form.newCode} cadastrada com sucesso!`)
            setRender(false)
        })
        .catch((err) => {
            console.log(err.message)
            window.alert("Não foi possível cadastrar a safra, contate o administrador.")
            resetForm()
        })
    }

    const _created = (e) => {
        const newcoord = e.layer._latlngs
        let coordArray = []
        newcoord[0].forEach((coord) => {
            coordArray.push([coord.lat, coord.lng])
        })

        setCoordinates(coordArray)
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
                            <StyledMapContainer center={[-27.662073449731807,-53.75909090999422]} zoom={7} scrollWheelZoom={true}>
                                <FeatureGroup>
                                <EditControl
                                    position="topright"
                                    onCreated={_created}
                                    draw={
                                        {
                                        /* rectangle: false,
                                        circle: false,
                                        circlemarker: false,
                                        marker: false,
                                        polyline: false, */
                                        }
                                    }
                />
                                </FeatureGroup>
                                <TileLayer
                                    attribution='&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </StyledMapContainer>
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