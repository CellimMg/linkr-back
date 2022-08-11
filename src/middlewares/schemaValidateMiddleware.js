export function schemaValidate(schema) {
    return (req, res, next) => {
        try {
            const data = req.body;
            const { error } = schema.validate(data);
            if (error) return res.status(422).send({ message: error.details[0].message });
            next();
        } catch (error) {
            return res.sendStatus(500);
        }
    };
}