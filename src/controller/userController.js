import connection from '../dbStrategy/postgres.js';
import  {userRepository}  from '../repository/userRepository.js';

export  async function listUsers(req,res){
    try{
        const search = req.query.value
        const {rows:data} = await userRepository.searchUsers(search)
        res.send(data)
    }catch(error){        
        console.log(error);
        res.sendStatus(500);
          
    }
}
export async function userPosts(req,res){
    try{
        const userId = parseInt(req.params.id)
        const userPost = await userRepository.userPost(userId)
        res.send(userPost)
    }catch(error){        
        console.log(error);
        res.sendStatus(500);
          
    }
}