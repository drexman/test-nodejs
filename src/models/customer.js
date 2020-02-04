
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           name: Alexander
 *           email: fake@email.com
 */


module.exports = (sequelize, type) => {

    var Customer =  sequelize.define('customer', {

        id: {
            type: type.UUID,
            defaultValue: type.UUIDV1,
            primaryKey: true,
            unique:true
        },

        _id:{
            type: type.INTEGER,
            allowNull: false
        },

        name: {
            type: type.STRING,
            allowNull: false
        },

        CEP:{
            type: type.BIGINT,
            allowNull: true
        },
        
        CPF:{
            type: type.BIGINT,
            allowNull: true
        },

        data_send:{
            type: type.DATE,
            defaultValue: type.NOW    
        },

    }); 
    return Customer;
}
