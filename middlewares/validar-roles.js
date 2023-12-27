const { response } = require ('express');

const validateRoles =(req, res = response, next) =>{

    if ( !req.usuario ) {

        return res.status(500).json({
            msg:' Se requiere verificar el rol sin validar en toquen primero'
        })

    }


}

module.exports = {
    validateRoles
}