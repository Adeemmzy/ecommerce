const Joi = require('joi');


const validate = (schema) =>(payload)=> schema.validate(payload)

const categorySchema = Joi.object({
    name:  Joi.string().min(5).max(250).required(),
    description: Joi.string().required()
});

//product schema
const productSchema = Joi.object({
    category: Joi.string().required(),
    name: Joi.string().required().min(5),
    description: Joi.string().required(),
    price: Joi.number().required(),
    // images: Joi.array().required().items({
    //     img: Joi.string().required()
    //  }),
     featured: Joi.boolean(),
     topSelling: Joi.boolean(),
})


const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmpassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    role: Joi.string().required(),
})

module.exports.validateProduct = validate(productSchema);
module.exports.validateCategory = validate(categorySchema);
module.exports.validateUser = validate(userSchema);