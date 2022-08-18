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
            if(checkIfUserExists){
                const urlMeta = await urlMetadata(req.body.link);
                await timelineRepository.savePost(req.body, urlMeta.title, urlMeta.image, urlMeta.description);

                const hashtags = body.description.split(' ').filter(v=> v.startsWith('#'));
                const hashtagStrings = hashtags.map(i => i.split('#')[1]);
                hashtagStrings.map(string => timelineRepository.saveHashtag(string, userId));

                res.sendStatus(201); 
            }else{
                res.sendStatus(401);
            } 
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }

    },

    getTimelinePosts: async (req, res) => {
        const auth = req.headers.authorization;
        const token = auth.split(" ")[1];

        try {
            const timelineData = await timelineRepository.getTimelinePosts(token);
            const isFollowing = await timelineRepository.isFollowing(token);

            if(isFollowing && timelineData){
                return res.send({tldata: timelineData}).status(200);
            } else if(isFollowing && !timelineData) {
                return res.send({tldata: timelineData, message: `No posts found from your friends`}).status(200);
            }
            else{
                return res.send({tldata: timelineData, message: `You don't follow anyone yet`}).status(404);
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
        }  catch (error) {
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

export default timelineController;