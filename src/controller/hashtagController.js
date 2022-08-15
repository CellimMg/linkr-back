import hashtagRepository from "../repository/hashtagRepository.js";


export async function readPostsByHashtag(req, res) {
    const { hashtag } = req.params;
    
    try {
      const result = await hashtagRepository.getPostsByHashtag(hashtag);
      if(result.rowCount === 0) {
        return res.sendStatus(404); 
      }
    
      res.send(result);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
    
  }

export async function readTrendingHashtags(req, res) {
    try {
      const result = await hashtagRepository.getTrendingHashtags();
      if(result.rowCount === 0) {
        return res.sendStatus(404); 
      }
    
      res.send(result.rows);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
    
  }