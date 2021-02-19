import {MapContainer} from 'react-leaflet';
import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

export const StyledMapContainer = styled(MapContainer)`
    flex-grow: 1;
`

export const Title = styled.p`

`