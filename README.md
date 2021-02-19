<h1 align="center"> Cyan Challenge </h1>

<p align="center"><img src="https://img.shields.io/static/v1?label=react&message=framework&color=blue&style=flat&logo=REACT"/>
<img src="https://img.shields.io/static/v1?label=styled-components&message=lib&color=pink&style=flat&logo=STYLED-COMPONENTS"/>
<img src="https://img.shields.io/static/v1?label=axios&message=lib&color=black&style=flat&logo=AXIOS"/>
<img src="https://img.shields.io/static/v1?label=router&message=lib&color=blue&style=flat&logo=ROUTER"/>
<img src="https://img.shields.io/static/v1?label=leaflet&message=lib&color=blue&style=flat&logo=LEAFLET"/></p>



## Descrição do Projeto
<p align="justify"> O challenge da Cyan é projeto fullstack que realizamos de ponta a ponta, este é o repositório do FrontEnd. </p>
<p align="justify"> O objetivo foi criar uma aplicação que possa criar usinas, colheitas, fazendas e talhões e mostra-las em um mapa.</p>
<p align="justify">As APIs da aplicação foram elaboradas por mim e publicadas no Heroku, database PostgreSql hospedada pelo Heroku também.</p>

#### Status do Projeto: Em desenvolvimento :warning:

### O que a aplicação é capaz de fazer :checkered_flag:
- Como usuário: :ok_woman:
    - Logar
    - Acessar/Criar Usinas.
    - Acessar/Criar Colheitas.
    - Acessar/Criar Fazendas.
    - Acessar a lista de talões.
    - Acessar o talhão no mapa.
    - Filtrar usinas por nome.
    - Filtrar as colheitas pelo código, data da colheita e data do plantio.
    - Filtrar as Fazendas por código e nome.
    - Filtrar os talhões pelo código.
    
### O que ainda quero implementar :checkered_flag:
    - Adicionar talhões utilizando mapa, com a biblioteca react-leaflet-draw
    - Corrigir bugs de filtros.
    - Implementar cadastro de novos usuários e permissões.
    - Inserir botão de deletar usinas, colheitas, fazendas e talhões.
    - Testes de integração e unitários.
    
## Deploy da Aplicação pelo s3 da AWS: :dash:

> http://cyan-challenge.s3-website-us-east-1.amazonaws.com/
<p>Conta de acesso:</p>
<p>Usuário: miyabara </p>
<p>senha: 1234567 </p>
<p> Peço somente para não cadastrar novos talhões. </p>

## Pré-requisitos :warning:

- [Node](https://nodejs.org/en/download/)

## Como rodar a aplicação :arrow_forward:
    1. Faça o clone do projeto
    2. Acesse a pasta na qual foi clonado
    3. `npm install` para instalar todas as dependências
    4. `npm run start` para rodas localmente o projeto
    5. `npm run build` para gerar uma versão estática do projeto (que ficará na pasta `build`)
    
## Libs utilizadas :books:

- React.js
- Router
- Styled-Components
- Axios
- Material-ui
- DayJS
- LeafletJS
- Jest

## Contato
- [Linkedin](https://www.linkedin.com/in/diegomiyabara/)
