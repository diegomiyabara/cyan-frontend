import React, { useEffect, useState } from 'react'
import { TileLayer, Polygon } from 'react-leaflet';
import Header from '../Header';
import { StyledMapContainer, MainContainer, Title } from './styles';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

function FieldMap() {
    const [field, setField] = useState();
    const history = useHistory();
    const params = useParams();
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
            authAxios.get(`/fieldMap/?fieldId=${params.fieldId}&farmId=${params.farmId}`)
            .then((res) => {
                setField(res.data)
            })
        }
    },[])

    const center = field && field.coordinates[0]

    return(
        <MainContainer>
            <Header/>
            <Title>Código do Talhão: {field && field.code}</Title>
            {field && <StyledMapContainer center={center} zoom={14} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {field && <Polygon positions={field.coordinates} color="#4584CC"/>}
            </StyledMapContainer>}
        </MainContainer>
        
    )
}

export default FieldMap