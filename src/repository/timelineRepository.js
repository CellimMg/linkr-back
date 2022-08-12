import connection from "../dbStrategy/postgres.js";

const timelineRepository = {
    savePost: async (postData, userId) => {
        const { rows } = await connection.query(`INSERT INTO posts (user_id, link_url, description) VALUES ($1, $2, $3) returning id`, [userId, postData.link, postData.description]);

        if(rows.length > 0){
            await connection.query(`INSERT INTO likes (user_id, post_id) VALUES ($1, $2)`, [userId, rows[0].id]);
        }
        
    },
    getTimelinePosts: async () => {
        const { rows } = await connection.query(`SELECT users.id AS "userId", users.name AS "username", users.picture_url AS "userImage", 
        posts.id AS "postId", posts.link_url AS "link", posts.description,
        likes.count AS "likes" 
        FROM users
        JOIN posts
        ON users.id = posts.user_id
        JOIN likes
        ON posts.id = likes.post_id
        ORDER BY posts.id DESC
        LIMIT 20`);

        return rows;
    }
}

export default timelineRepository;