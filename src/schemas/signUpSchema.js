import joi from "joi";


const signUpSchema = joi.object({
    name: joi.string().min(4).required().messages({
        "any.required": "Você deve informar o nome!",
        "string.min": "O nome deve ter no mínimo 4 caracteres! "
    }),
    email: joi.string().email().required().messages({
        "any.required": "Você deve informar um email!",
        "string.email": "Você deve informar um formato de email válido!"
    }),
    password: joi.string().min(6).required().messages({
        "any.required": "Você deve informar a senha!",
        "string.min": "A senha deve possuir no mínimo 6 caracteres!"
    }),
    pictureUrl: joi.string().pattern(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/).required().messages({
        "any.required": "Você deve informar a imagem de perfil!",
        "string.pattern.base": "Você deve informar um url de imagem válido!"
    })
});


export default signUpSchema;