import joi from 'joi';

const commentsSchema = joi.object({
    userId: joi.number().required(),
    postId:joi.number().required(),
    text:joi.string().trim().required()
})

export default commentsSchema;