import validateTimelineSchema from "../schemas/timelineSchemas.js";

const timelineMiddleware = {
    validateSavePost: (req, res, next) => {
        const { error } = validateTimelineSchema.validateTimelinePostSchema.validate(req.body);

        if(error){
            console.log(error.details);
            return res.sendStatus(422);
        } 

        next();
    }
}

export default timelineMiddleware;