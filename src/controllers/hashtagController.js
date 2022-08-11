import hashtagRepository from "../repository/hashtagRepository.js";


export async function readPostsByHashtag(req, res) {
    const { hashtag } = req.params;
    
    try {
      const result = await hashtagRepository.getPostsByHashtag(hashtag);
      if(result.rowCount === 0) {
        return res.sendStatus(404); 
      }
    
      const [posts] = result.rows;
    
      res.send(posts);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
    
  }

export async function readTrendingHashtags(req, res) {
    try {
      const result = await hashtagRepository.getTrendingHashtags(hashtag);
      if(result.rowCount === 0) {
        return res.sendStatus(404); 
      }
    
      const [list] = result.rows;
    
      res.send(list);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
    
  }