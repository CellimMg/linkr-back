import Joi from "joi";

const validateTimelinePostSchema = Joi.object().keys({
    userImage: Joi.string().uri().required(),
    username: Joi.string().min(3).required(),
    description: Joi.string().required(),
    link: Joi.string().uri().required()
});

export default validateTimelinePostSchema;