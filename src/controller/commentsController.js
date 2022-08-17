import { commentsRepository } from '../repository/commentsRepository.js';

export async function comment(req,res){
    try{
        const {userId,postId,text} = req.body
        await commentsRepository.comments(userId,postId,text)
        res.send('list comentarios')

    }catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
}