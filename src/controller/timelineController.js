import timelineRepository from "../repository/timelineRepository.js";
import urlMetadata from "url-metadata";

const timelineController = {
    savePost: async (req, res) => {
        try {
            // Check if user exists and is authenticated
            const checkIfUserExists = true;
            const body = req.body;
            const userId = body.userId;
            console.log(req.body);
            // If user is authenticated, savePost
            if (checkIfUserExists) {
                const urlMeta = await urlMetadata(req.body.link);
                await timelineRepository.savePost(req.body, urlMeta.title, urlMeta.image, urlMeta.description);

                const hashtags = body.description.split(' ').filter(v => v.startsWith('#'));
                const hashtagStrings = hashtags.map(i => i.split('#')[1]);
                hashtagStrings.map(string => timelineRepository.saveHashtag(string, userId));

                res.sendStatus(201);
            } else {
                res.sendStatus(401);
            }
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }

    },

    getTimelinePosts: async (req, res) => {
        try {
            const { date } = req.query;
            let timelineData;

            if (!date) timelineData = await timelineRepository.getTimelinePosts();
            else timelineData = await timelineRepository.getTimelinePostsSince(date);

            for (const data of timelineData) {
                data.created_at = setIsoString(data.created_at);
            }

            if (timelineData) {
                return res.send(timelineData).status(200);
            } else {
                return res.sendStatus(404);
            }

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },

    updatePost: async (req, res) => {
        try {
            const updatedDescription = req.body.description;
            const updatePost = await timelineRepository.updatePost(req.params.id, updatedDescription);
            res.sendStatus(updatePost);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },


    deletePost: async (req, res) => {
        try {
            const deletePost = await timelineRepository.deletePost(req.params.id);
            res.sendStatus(deletePost);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
}

function setIsoString(data) {
    const [, milliseconds] = new Date(data).toISOString().split(".");
    let millisecond = Number(milliseconds.slice(0, 3));
    millisecond += 1; //arredondando o millisecond pra cima pra evitar de chegar o proprio elemento
    const dateTime = new Date(data).toLocaleString();
    const [date, time] = dateTime.split(" ");
    const [day, month, year] = date.split("/");
    const [hour, minute, second] = time.split(":");
    return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millisecond}Z`;
}

export default timelineController;