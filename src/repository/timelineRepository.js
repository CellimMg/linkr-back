import connection from "../dbStrategy/postgres.js";

const timelineRepository = {
    savePost: async (postData, title, image, urlDescription) => {
        let query;
        if(postData.reposted){
            query = await connection.query(`INSERT INTO posts (user_id, link_url, description, url_title, url_description, url_image, reposted) VALUES ($1, $2, $3, $4, $5, $6, true) returning id`, [postData.userId, postData.link, postData.description, title, urlDescription, image]);
            await connection.query(`INSERT INTO reposts (repost_user_id, post_id, original_post_id) VALUES ($1, $2, $3)`, [postData.repostUserId, query.rows[0].id, postData.postId]);
            return;
        }else{
            query = await connection.query(`INSERT INTO posts (user_id, link_url, description, url_title, url_description, url_image) VALUES ($1, $2, $3, $4, $5, $6) returning id`, [postData.userId, postData.link, postData.description, title, urlDescription, image]);
        }
        

        if (query.rows.length > 0) {
            await connection.query(`INSERT INTO likes (user_id, post_id) VALUES ($1, $2)`, [postData.userId, query.rows[0].id]);
        }
    },

    saveHashtag: async (string, userId) => {
        const { rows: data, rowCount } = await connection.query(`SELECT * FROM hashtags WHERE hashtag = $1`, [string]);
        if (rowCount > 0) {
            await connection.query(`UPDATE hashtags SET count = $1 WHERE hashtag = $2`, [data[0].count + 1, string]);
            const { rows: post } = await connection.query(`SELECT * FROM posts WHERE user_id = $1 ORDER BY id DESC LIMIT 1`, [userId]);
            await connection.query(`INSERT INTO "hashtags-posts" (hashtag_id, post_id) VALUES ($1, $2)`, [data[0].id, post[0].id]);
        } else {
            await connection.query(`INSERT INTO hashtags (hashtag) VALUES ($1)`, [string]);
            const { rows: newHashtag } = await connection.query(`SELECT * FROM hashtags WHERE hashtag = $1`, [string]);
            const { rows: post } = await connection.query(`SELECT * FROM posts WHERE user_id = $1 ORDER BY id DESC LIMIT 1`, [userId]);
            await connection.query(`INSERT INTO "hashtags-posts" (hashtag_id, post_id) VALUES ($1, $2)`, [newHashtag[0].id, post[0].id]);
        }
    },

    getTimelinePosts: async (token) => {
        console.log("CHEGOU NO REFRESH!")
        const { rows } = await connection.query(`SELECT users.id AS "userId", users.name AS "username", users.picture_url AS "userImage", 
        posts.id AS "postId", posts.link_url AS "link", posts.created_at, posts.description, posts.url_title AS "urlTitle", posts.url_description AS "urlDescription", posts.url_image AS "urlImage",
        likes.count AS "likes", posts.reposted,
        array_agg(follows.follower_id) AS followers,
        (SELECT array_agg(json_build_object('name',users.name,'id',users.id)) FROM likes JOIN users ON likes.user_id = users.id WHERE likes.post_id = posts.id) AS "whoLikes",
        (SELECT array_agg(json_build_object('author',users.name,'userId',users.id,'text', comments.text)) FROM comments JOIN users ON comments.author_id = users.id WHERE comments.post_id = posts.id ) AS "whoComments",
        (SELECT users.name FROM users JOIN reposts ON users.id = reposts.repost_user_id WHERE posts.id = reposts.post_id) AS "whoReposted",
        (SELECT users.id FROM users JOIN reposts ON users.id = reposts.repost_user_id WHERE posts.id = reposts.post_id) AS "whoRepostedId",
		(SELECT COUNT(*) FROM reposts WHERE posts.id = reposts.original_post_id)
        FROM users 
        JOIN posts ON users.id = posts.user_id
		JOIN follows ON follows.followed_id = users.id
		JOIN sessions ON follower_id = sessions.user_id
        LEFT JOIN likes ON posts.id = likes.post_id
		WHERE sessions.token = $1
        GROUP BY users.id,posts.id
        ORDER BY posts.id DESC
        LIMIT 20`, [token]);

        return rows;
    },

    getTimelinePostsSince: async (token, last) => {
        try {
            const { rows } = await connection.query(`SELECT users.id AS "userId", users.name AS "username", users.picture_url AS "userImage", 
        posts.id AS "postId", posts.link_url AS "link", posts.description, posts.url_title AS "urlTitle", posts.url_description AS "urlDescription", posts.url_image AS "urlImage",
        likes.count AS "likes",
        (SELECT array_agg(json_build_object('name',users.name,'id',users.id)) FROM likes JOIN users ON likes.user_id = users.id WHERE likes.post_id = posts.id) AS "whoLikes",
        (SELECT array_agg(json_build_object('author',users.name,'userId',users.id,'text', comments.text)) FROM comments JOIN users ON comments.author_id = users.id WHERE comments.post_id = posts.id ) AS "whoComments"
        FROM users 
        JOIN posts ON users.id = posts.user_id
		JOIN follows ON follows.followed_id = users.id
		JOIN sessions ON follower_id = sessions.user_id
        LEFT JOIN likes ON posts.id = likes.post_id
		WHERE sessions.token = $1 AND posts.id > $2
        GROUP BY users.id,posts.id
        ORDER BY posts.id DESC
        LIMIT 20`, [token, last]);
            return rows;
        } catch (error) {
            console.log(error);
            throw "UNEXPECTED_ERROR";
        }
    },

    isFollowing: async (token) => {
        const { rows } = await connection.query(`SELECT follows.id, follows.follower_id, follows.followed_id 
        FROM follows
        JOIN sessions ON sessions.user_id = follows.follower_id
        WHERE sessions.token = $1`, [token]);
        return rows.rowCount;
    },

    updatePost: async (postId, postDescription) => {
        const updatedDescription = await connection.query(`UPDATE posts SET description = $1 WHERE id = $2`, [postDescription, postId]);
        console.log(updatedDescription);
        if (updatedDescription.rowCount > 0) {
            return 204;
        } else {
            return 404;
        }
    },

    deletePost: async (postId) => {
        const deleteLikes = await connection.query(`DELETE FROM likes WHERE post_id = $1`, [postId]);
        const deleteComments = await connection.query(`DELETE FROM comments WHERE post_id = $1`,[postId]);
        const deletePost = await connection.query(`DELETE FROM posts WHERE id = $1`, [postId]);
        if (deletePost.rowCount > 0) {
            return 204;
        } else {
            return 404;
        }
    }
}

export default timelineRepository;