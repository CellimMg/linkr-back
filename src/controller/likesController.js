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
export async function getLikes(req,res){
    try{
        const userId = req.params.userId;
        const postId = req.params.postId
    
        const likes =await likesRepository.likes(userId,postId)
        if(likes.rowCount === 1){
            return res.send(true)
        }else{
            return res.send(false)
        }
        

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

export async function whoLikes(req,res){
    const postId = req.params.postId
    const userId = parseInt(req.params.userId);
    const resposta = {
        names:[],
        quantyLikes: 0
    }
    const likesNames = await likesRepository.likesNames(postId)
    likesNames.rows.map((e)=> {
        if(e.user_id === userId){
            resposta.names.unshift('Você')
        }else{
            resposta.names.push(e.name)
        }
        
        resposta.numero ++ 

    })

    res.send(resposta)
}
