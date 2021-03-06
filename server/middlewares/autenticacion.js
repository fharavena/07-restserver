const jwt = require('jsonwebtoken');

// =====================
// Verificar Token
// =====================

let verificaToken = (req, res, next) => {

    let token = req.get('token');

    //console.log(token);
    //console.log(process.env.SEED);

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            //console.log(err);

            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

    // next(); //borrar
};

// =====================
// Verificar AdminRole
// =====================

let verificaAdmin_Role = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();

    } else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }

    // next(); //borrar
};

// =====================
// Verificar Token para imagen
// =====================

let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            //console.log(err);

            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });


}


module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}