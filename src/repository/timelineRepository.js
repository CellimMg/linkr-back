import connection from "../dbStrategy/postgres.js";

const timelineRepository = {
    savePost: async (postData, userId) => {
        const query = await connection.query(`INSERT INTO posts (user_id, link_url, description) VALUES ($1, $2, $3)`, [userId, postData.link, postData.description]);
    },
    getTimelinePosts: async () => {
        const { rows } = await connection.query(`SELECT users.id AS "userId", users.name AS "username", users.picture_url AS "userImage", 
        posts.id AS "postId", posts.link_url AS "link", posts.description,
        likes.count AS "likes" 
        FROM users
        JOIN posts
        ON users.id = posts.user_id
        JOIN likes
        ON posts.id = likes.post_id`);

        return rows;
    }
}

export default timelineRepository;