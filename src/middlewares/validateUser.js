/* eslint-disable no-undef */
// import Joi from 'joi';

// exports.validate_user = (req, res, next) => {
    
//     const schema = Joi.object({
//         name: Joi.string()
//             .alphanum()
//             .min(3)
//             .max(30)
//             .required()
//             .messages({
//                 'string.alphanum': 'Incorrect Name.',
//                 'string.min': 'Incorrect Name.',
//                 'string.empty': 'Incorrect Name.'
//             }),
    
//             email: Joi.string()
//                 .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
//                 .requried()
//                 .messages({
//                     'string.alphanum': 'Incorrect Email.',
//                     'string.min': 'Incorrect Email.',
//                     'string.empty': 'Incorrect Email.'
//                 }),
                
//         password: Joi.string()
//             .min(6)
//             .messages({
//                 'string.min': 'Incorrect Password.'
//             })
//     });
    
//     const { error } = schema.validate(req.body);
    
    
//     if (error) return res.status(400).json({ message: 'Enter  correct credentials.', error: error.detail[0].message });
    
//     return next();
// };



// eslint-disable-next-line no-undef
exports.validate_user = async (req, res, next) => {
    const password = req.body;
    const pwdLength = password.length;
    if (pwdLength < 6) return res.status(400).json({ message: 'Password is not correct.' });
        
    return next();
};