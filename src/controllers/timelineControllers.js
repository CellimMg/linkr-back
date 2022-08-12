import timelineRepository from "../repository/timelineRepository.js";


const timelineController = {
    savePost: async (req, res) => {
        try {
            // Check if user exists and is authenticated
            const checkIfUserExists = true;
            const userId = 1;
            // If user is authenticated, savePost
            if(checkIfUserExists){
                console.log(req.body);
                await timelineRepository.savePost(req.body, userId);
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
            res.sendStatus(500);
        }
    }
}

export default timelineController;