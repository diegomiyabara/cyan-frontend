import styled from 'styled-components';

export const MainContainer = styled.div`
    background-color: #E9EAEA;
    height: 100vh;
`

export const LoginContainer = styled.div`
    display: flex;
    height: 70vh;
    flex-direction: column;
    justify-content: center;
`

export const Img = styled.img`
    margin: 0 auto;
`

export const LoginBox = styled.div`
    width: 400px;
    height: 300px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    border: 2px solid white;
    border-radius: 20px;
    background-color: #F9F9F9;
    opacity: 80%;
`

export const ContainerInputs = styled.div`
    height: 130px;
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const Title = styled.p`
    margin:0;
    padding: 0;
    color: #323232;
    font-family: 'Roboto';
    font-size: 1.2rem;
`

export const Button = styled.button`
    height: 40px;
    width: 180px;
    background-color: #323232;
    color: #F9F9F9;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 1.2em;
    :hover {
        color: #F9F9F9;
        opacity: 90%;
    }
`

export const LoadingContainer = styled.div`
    margin: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;

    @keyframes bounce {
	0%, 50%, 100% {
		transform: scale(1);
		filter: blur(0px);
	}
	25% {
		transform: scale(0.6);
		filter: blur(3px);
	}
	75% {
		filter: blur(3px);
		transform: scale(1.4);
	}
}
`

export const Yellow = styled.div`
    width: 1vw;
	height: 1vw;
	border-radius: 100%;
	margin: 0.7vw;
	background-image: linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0) 100%);
    animation: bounce 1.5s 0.5s linear infinite;
    background-color: #feb60a;
`

export const Red = styled.div`
    width: 1vw;
	height: 1vw;
	border-radius: 100%;
	margin: 0.7vw;
	background-image: linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0) 100%);
    animation: bounce 1.5s 0.5s linear infinite;
    background-color: #ff0062;
    animation-delay: 0.1s;
`

export const Blue = styled.div`
    width: 1vw;
	height: 1vw;
	border-radius: 100%;
	margin: 0.7vw;
	background-image: linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0) 100%);
    animation: bounce 1.5s 0.5s linear infinite;
    background-color: #00dbf9;
    animation-delay: 0.2s;
`

export const Violet = styled.div`
    width: 1vw;
	height: 1vw;
	border-radius: 100%;
	margin: 0.7vw;
	background-image: linear-gradient(145deg, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0) 100%);
    animation: bounce 1.5s 0.5s linear infinite;
    background-color: #da00f7;
    animation-delay: 0.3s;
`