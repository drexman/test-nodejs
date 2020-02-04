module.exports = (sequelize, type) => {

    var Address =  sequelize.define('address',{
        
        id: {
            type: type.UUID,
            defaultValue: type.UUIDV1,
            primaryKey: true,
            unique:true
        },

        district: {
            type: type.STRING,
            allowNull: true
        },

        street: {
            type: type.STRING,
            allowNull: true
        },

        states:{
            type: type.STRING,
            allowNull: true 
        }
    });  
    return Address;
}