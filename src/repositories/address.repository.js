const db = require('../config/db.config.js');

const Address = db.address;


exports.create = async (data) => {
    var res = await Address.create({
        district : data.district,
        street : data.street,
        states : data.states
    });
    return res;
};

exports.delete = async(customerid) => {
    const res =  await Customer.destroy({
        where: {
            fk_customerid: customerid
        }, 
    });
    return res;
}