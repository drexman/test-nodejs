# test-nodejs

Foi criado novo sistema baseando na arquitetura REST com propósito melhorar na agilidade do cadastro de clientes através do upload dos arquivos, a fim automatizar processo de cadastro. Com API em funcionamento, o usuario poderá acessar os serviços do aplicativo através do protocolo HTTP, permitindo assim realizar uma consulta de seus clientes com requisição get, realizar os cadastros através do upload dos arquivos, atualizações e remoções dos registros.

# Instruções de como instalar e testar

Será necessário instalação da plataforma nodejs v12.14.1(já está incluso npm 6.13.4) para funcionamento do API.

Link: https://nodejs.org/en/download/

Ferramenta para teste em API.

Link: https://www.postman.com/


Para inicialização do API:

Primeiramente, será necessário acessar no diretório do arquivo(diretório/test-nodejs).

Executar seguinte comando: 
npm start



Para as acessar todos os serviços do API, os urls dos serviços são:

POST método do recebimento de arquivos http://localhost:3000/fileuser/upload
Obs: Aceita multi-part.

entrada:
form-data
KEY: files VALUE: DonaldTrump_xpto123.csv

saída:
conteúdo json 

GET consulta de informações http://localhost:3000/customer/{código-usuario}

entrada:
sem conteúdo

saída:
conteúdo json 

PUT atualização do cliente  http://localhost:3000/customer/{código-usuario}

entrada:
raw JSON

{
    "_id": 1,
    "name": "Valor alterado"
}

saída:
{
    "_id": 1,
    "name": "Valor alterado",
    "date_sent": "2019-10-11 13:30:20",
    "status": "update_info"
}


DELETE remoção do cliente http://localhost:3000/customer/{código-usuario}

entrada:
raw JSON
{
    "_id": {código-cliente}
}

saída:
{
    "_id": 1,
    "data_send": "2019-10-11 13:30:20",
    "name": "James Bond",
    "status": "deleted"
}

DELETE remoção do usuário e todos os registros vinculados http://localhost:3000/fileuser/{código-usuario}

entrada:
sem conteúdo

saída:
[
    {
        "_id": 1,
        "data_send": null,
        "name": "James Bond",
        "status": "deleted"
    },
    {
        "_id": 2,
        "data_send": null,
        "name": "Chuck Norris",
        "status": "deleted"
    }
]

Obs: É necessário uso do ferramenta postman para realizar os testes dos seriços
