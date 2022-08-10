import joi from "joi";

const hashtagSchema = joi.object({
  hashtag: joi.string().required()
});

export default hashtagSchema;