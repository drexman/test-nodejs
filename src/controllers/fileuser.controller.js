const _ = require('lodash');
const csv = require('csv-parser');
const fs = require('fs');
const multer = require('multer');
const ViaCep = require('../services/viacep.service');
const Utils = require('../utils/utils');
const fileFilter = require('../helpers/fileFilter');

const fileuser_repository = require('../repositories/fileuser.repository'); 
const customer_repository = require('../repositories/customer.repository');
const address_repository = require('../repositories/address.repository');

exports.uploadfiles = async (req, res, next) => {
    _.forEach(req.files, (el,index,arr) => {
        var originalname = el.originalname;
        var filename = el.filename;
        var orig_spl = originalname.split('_');

        var nome = orig_spl[0];
        var codigoIdentificador = orig_spl[1];
        codigoIdentificador = codigoIdentificador.substring(0,codigoIdentificador.indexOf('.'));

        if(nome.indexOf('-') !== -1)
        {
            var x = nome.split('-');
            nome = x[0] + ' ' + x[1];
        } else {

            var matches = nome.match(/[A-Z]/g);
            for(var i = 0; i < matches.length; i++)
            {
                if(i > 0)
                {
                    var char = matches[i]; 
                    var index = nome.indexOf(char);
                    nome = nome.substring(0,index) + " " + nome.substring(index);
                }
            }

            fileuser_repository
            .create(codigoIdentificador, nome, filename)
            .then(fileuser => {
                const final_result = [];
                var filename = fileuser.dataValues.file_name;
                fs.createReadStream("upload/" + filename)
                .pipe(csv())
                .on("data", data => final_result.push(data))
                .on("end", () => {
                  _.forEach(final_result, (el,index,arr)=> {
                    var nome = el.Nome;
                    var utils = new Utils();
                    var cep = utils.leftPad(el.CEP,8);
                    var viacep = new ViaCep();
                    viacep.search(cep, 
                        function(result){
                            if(result.hasOwnProperty('logradouro'))
                            {
                                customer_repository.create({
                                    id: index + 1,
                                    name: nome,
                                    CEP: el.CEP,
                                    CPF: el.CPF
                                }).then((customer) => {
                                    customer.setFileuser(fileuser);
                                    address_repository.create({
                                        district : result.bairro,
                                        street : result.logradouro,
                                        states : result.localidade
                                    }).then(address => {
                                        customer.setAddress(address); 
                                        res.status(200).json(fileuser.dataValues);
                                    }).catch((e) => function(){
                                        res.status(500).json({
                                            error: e.errors
                                        });
                                    });
                                })

                            }
                        },
                        function(e){
                            res.status(500).json({
                                error: e.errors
                            });
                        }
                    );
                    
                  });

                });
            }).catch(e => {
                res.status(500).json({
                    error: e.errors
                });
            });       
        }
    });
};

exports.delete = async (req, res, next) => {
   
    try {
        var _id = req.params.id;
        var id = await fileuser_repository.getBy_Id(_id)
        var datas = await customer_repository.findByFileId(id);
        if(id !== '')
        {
            let lista = [];
            _.forEach(datas, (el,index,arr)=>{
                lista.push({
                    "_id": el.dataValues._id,
                    "data_send": el.dataValues.data_send,
                    "name": el.dataValues.name,
                    "status": "deleted" 
                })
            });
            
            await fileuser_repository.delete(id).then((row) => {
                res.status(200).json(lista);
            });
            
        }else {
            res.status(500).json({
                message: 'Usuário não encontrado'
            });
        }
        
    } catch (e) {
        res.status(500).json({
            message: 'Falha ao processar sua requisição : ' + e
        });
    }
};