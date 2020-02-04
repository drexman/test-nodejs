const db = require('../config/db.config.js');
const Customer = db.customer;
const Address = db.address;
const sequelize = db.sequelize;

exports.findByFileId = async(fileuserid) => {
    const res = await Customer.findAll({
        attributes:['_id','name', 'CEP', 'CPF','data_send'],
        include: [{
            model: Address,
            attributes: ['district', 'street','states']
        }],

        where:{
            fk_fileuserid: fileuserid
        }
    });
    return res;
} 

exports.findByFileId_Id = async(fileuserid, id) => {
    const res = await Customer.findAll({
        attributes:['_id','name', 'CEP', 'CPF','data_send'],
        include: [{
            model: Address,
            attributes: ['district', 'street','states']
        }],

        where:{
            fk_fileuserid: fileuserid,
            _id: id 
        }
    });
    return res;
} 

exports.findAll = async() => {
    const res = await Customer.findAll({
        attributes:['_id','name', 'CEP', 'CPF', 'data_send'],
        include: [{
            model: Address,
            attributes: ['district', 'street','states']
        }]
    });

    return res;
}

exports.create = async(datas) => {
    const res = await Customer.create({
        _id: datas.id,
        name: datas.name,
        CEP: datas.CEP,
        CPF: datas.CPF
    });
    return res;
}

exports.update = async (id, datas) => {

    const res = await Customer.update(datas,{
        where: {
            fk_fileuserid: id,
            _id: datas._id
        },
        returning: true,
        plain: true
    });
    return res;
}


exports.delete = async (id, datas) => {

    const res =  await Customer.destroy({
        where: {
            fk_fileuserid: id,
            _id: datas._id
        }, 
    });
    return res;
}