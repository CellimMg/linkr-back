import followRepository from "../repository/followRepository.js";

export async function readFollowRelation(req, res) {
    const { userId, followedId } = req.body;
    
    try {
      const result = await followRepository.getFollowRelation(userId, followedId);
      if(result.rowCount === 0) {
        const data = {
          relation: false
        }
        return res.send(data).status(404); 
      }

      const data = {
        relation: true
      }
    
      res.send(data).status(302);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
    
  }

export async function writeFollowRelation(req, res) {
  console.log(req.body);
    const { follows, userId, followedId } = req.body;
    
    try {
        if(follows) {
            await followRepository.deleteFollowRelation(userId, followedId);
            res.sendStatus(204);
        } else {
            await followRepository.addFollowRelation(userId, followedId);
            res.sendStatus(201);
        }
        
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
    
  }