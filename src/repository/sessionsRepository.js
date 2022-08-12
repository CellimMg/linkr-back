import connection from "../dbStrategy/postgres.js";

export async function create(data) {
    try {
        await connection.query(`INSERT INTO "sessions" ("user_id", "token") VALUES ($1, $2)`, [
            data.userId, data.token
        ]);
    } catch (error) {
        throw "UNEXPECTED_ERROR";
    }
}

export async function read(userId) {
    try {
        const { rows } = await connection.query(`SELECT * FROM "sessions" WHERE "sessions"."user_id" = $1`, [
            userId
        ]);
        return rows;
    } catch (error) {
        console.log(error);
        throw "UNEXPECTED_ERROR";
    }
}

export async function update(token, userId) {
    try {
        await connection.query(`UPDATE "sessions" SET token = $1 WHERE "sessions"."user_id" = $2`, [
            token, userId
        ]);
    } catch (error) {
        console.log(error);
        throw "UNEXPECTED_ERROR";
    }
}
