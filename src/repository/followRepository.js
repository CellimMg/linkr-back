import connection from "../dbStrategy/postgres.js";

async function getFollowRelation( userId, followedId ) {
    return await connection.query(`SELECT * 
    FROM follows WHERE follower_id = $1 AND followed_id = $2`, [userId, followedId])
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