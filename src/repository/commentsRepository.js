import connection from "../dbStrategy/postgres.js";

async function  comments(userId,postId,text){
    return await connection.query(`INSERT INTO comments("author_id","post_id","text") VALUES($1,$2,$3)`,[userId,postId,text])
}

export const commentsRepository = {
    comments
}