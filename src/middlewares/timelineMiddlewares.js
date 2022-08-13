import validateTimelinePostSchema from "../schemas/timelineSchemas.js";

const timelineMiddleware = {
    validateSavePost: (req, res, next) => {
        const { error } = validateTimelinePostSchema.validate(req.body);

        if(error){
            console.log(error.details);
            return res.sendStatus(422);
        } 

        next();
    }
}

export default timelineMiddleware;