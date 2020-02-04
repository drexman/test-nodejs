const fileuser_repository = require('../repositories/fileuser.repository'); 
const customer_repository = require('../repositories/customer.repository');
const address_repository = require('../repositories/address.repository');


exports.findByFileId  = async(req, res, next) => {
    var _id = req.params.id;
    var id = await fileuser_repository.getBy_Id(_id)
    try {
        var data = await customer_repository.findByFileId(id);
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            message: 'Falha ao processar sua requisição : ' + e
        });
    }
};

exports.findAll = async(req, res, next) => { 
    try {
        var data = await customer_repository.findAll();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            message: 'Falha ao processar sua requisição : ' + e
        });
    }
};

exports.update = async (req, res, next) => {
    var _id = req.params.id;
    var id = await fileuser_repository.getBy_Id(_id);
   
    try {
        var data = await customer_repository.update(id, req.body);
        obj = data[1];
        res.status(200).json({
            "_id": obj._id,
            "data_send": obj.data_send,
            "name": obj.name,
            "status": "update_info"
        });
    } catch (error) {
        res.status(500).json({
            message: 'Falha ao processar sua requisição : ' + e
        });
    }
};

exports.delete = async (req, res, next) => {

    try {
        var _id = req.params.id;
        var id = await fileuser_repository.getBy_Id(_id)
        if(id !== '')
        {
            var result = await customer_repository.findByFileId_Id(id, req.body._id);
            if(result.length > 0)
            {
                 var obj = result[0].dataValues;   
                
                await customer_repository
                .delete(id, req.body).then((row) => {
                   
                    res.status(200).json({
                        "_id": obj._id,
                        "data_send": obj.data_send,
                        "name": obj.name,
                        "status": "deleted" 
                    });
                });
            } else {
                res.status(500).json({
                    message: 'Cliente não encontrado'
                });
            }
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





