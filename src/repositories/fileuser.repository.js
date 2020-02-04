const db = require('../config/db.config.js');
const Fileuser = db.fileuser;
const sequelize = db.sequelize;

exports.getBy_Id = async (id) => {
    
    var array = await sequelize.query('SELECT id FROM fileUsers where _id= (:id)',{
        replacements: {id: id},
        type: db.sequelize.QueryTypes.SELECT
    });
    if(array.length > 0)
    {
        return array[0].id;
    } else {
        return 0;
    }
}

exports.findById = async(id) => {
    const res = await Fileuser.findAll({
        attributes:['_id','name', 'data_send'],
        where: {
            _id: id
        }
    });
    return res;
}

exports.create = async (id, name, filename) => {
    const res = await Fileuser.create({
        _id: id,
        name: name,
        file_name: filename
    });
    return res;
}

exports.delete = async (id) => {
    
    const res =  await Fileuser.destroy({
        where: {
            id: id
        }   
    });
    return res;
}