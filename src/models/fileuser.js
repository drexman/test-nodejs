module.exports = (sequelize, type) => {

    var Fileuser =  sequelize.define('fileuser', {

        id: {
            type: type.UUID,
            defaultValue: type.UUIDV1,
            primaryKey: true,
            unique:true
        },

        _id:{
            type: type.STRING,
            unique: {
                args: true,
                message: 'Código de identificação já está sendo utilizado'  
            }
        },

        name: {
            type: type.STRING,
            allowNull: false
        },

        file_name: {
            type: type.STRING,
            allowNull: false
        },

        data_send:{
            type: type.DATE,
            defaultValue: type.Now    
        }

    }); 
    return Fileuser;
}
