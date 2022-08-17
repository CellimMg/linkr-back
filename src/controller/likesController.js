import connection from '../dbStrategy/postgres.js';
import {likesRepository} from '../repository/likesRepository.js'

export async function postLike(req,res){
    try{
        const {userId,postId} = req.body;
        await likesRepository.likePost(userId,postId)
        res.sendStatus(200)

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}
export async function unLike(req,res){
    try{
        const {userId,postId} = req.body;
    
        await likesRepository.unlike(userId,postId)
        res.sendStatus(200)

    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

