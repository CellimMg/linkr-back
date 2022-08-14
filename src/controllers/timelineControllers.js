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
                //console.log(urlMeta);
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
        try {
            
            const timelineData = await timelineRepository.getTimelinePosts();

            if(timelineData){
                return res.send(timelineData).status(200);
            }else{
                return res.sendStatus(404);
            }

        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    },

    deletePost: async (req, res) => {
        try {
            // Check if user exists and is authenticated
            const checkIfUserExists = true;
            const userId = req.body.userId;
            // If user is authenticated, deletePost
            if(checkIfUserExists){
                const postId = req.body.postId;
                await timelineRepository.deletePost(userId, postId);
                res.sendStatus(200); 
            }else{
                res.sendStatus(401);
            }
                       
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }

    }
}

export default timelineController;