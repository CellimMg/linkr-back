export async function listComments(req,res){
    try{
        res.send('list comentarios')

    }catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
}

export async function comment(req,res){
    try{
        res.send('list comentarios')

    }catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
}