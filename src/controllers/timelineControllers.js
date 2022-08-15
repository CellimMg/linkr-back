import timelineRepository from "../repository/timelineRepository.js";
import urlMetadata from "url-metadata";

const timelineController = {
    savePost: async (req, res) => {
        try {
            // Check if user exists and is authenticated
            const checkIfUserExists = true;
            // If user is authenticated, savePost
            if(checkIfUserExists){
                const urlMeta = await urlMetadata(req.body.link);
                await timelineRepository.savePost(req.body, urlMeta.title, urlMeta.image, urlMeta.description);
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
            const deletePost = await timelineRepository.deletePost(req.params.id);
            res.sendStatus(deletePost);
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
        }catch (error){
            console.log(error);
            res.sendStatus(500);
        }
    }
}

export default timelineController;