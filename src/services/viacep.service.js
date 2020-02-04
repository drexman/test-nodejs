const fetch = require('node-fetch');
function ViaCep()
{}

ViaCep.prototype.search = (cep, callback, errorcallback) => {
    fetch('https://viacep.com.br/ws/'+cep+'/json')
    .then(res => res.json())
    .then(data => {
        callback(data);
    })
    .catch(err=> {
        errorcallback(err);
    });

}

module.exports = ViaCep;