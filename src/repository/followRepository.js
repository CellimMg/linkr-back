import connection from "../dbStrategy/postgres.js";

async function getFollowRelation( token, followedId ) {
    return await connection.query(`SELECT follower_id as "userId", followed_id
    FROM follows 
    JOIN sessions ON follower_id = sessions.user_id
    WHERE sessions.token = $1 
    AND followed_id = $2`, [token, followedId])
}

async function deleteFollowRelation( userId, followedId ) {
    return await connection.query(`DELETE FROM follows 
    WHERE follower_id = $1 AND followed_id = $2`, [userId, followedId])
}

async function addFollowRelation( userId, followedId ) {
    return await connection.query(`INSERT INTO follows 
    (follower_id, followed_id) VALUES($1, $2)`, [userId, followedId])
}

const followRepository = {
    getFollowRelation,
    deleteFollowRelation,
    addFollowRelation
  };
  
export default followRepository;