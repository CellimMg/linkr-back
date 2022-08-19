import connection from '../dbStrategy/postgres.js'

async function likePost(userId, postId) {
    return await connection.query('INSERT INTO likes("user_id","post_id") VALUES($1,$2)', [userId, postId])
}
async function unlike(userId, postId) {
    return await connection.query('DELETE FROM likes WHERE user_id = $1 AND post_id = $2', [userId, postId])
}
export const likesRepository = {
    likePost,
    unlike

}