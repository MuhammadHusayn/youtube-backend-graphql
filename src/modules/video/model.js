import db from '../../utils/db.js';

const ADMIN_VIDEOS = `
    SELECT
        video_id,
        video_title,
        video_type,
        video_link,
        user_id
        video_created_at
    FROM videos
    WHERE user_id = $4
    AND video_title ILIKE CONCAT('%', $3::varchar, '%')
    OFFSET $1 LIMIT $2;
`;

const adminVideos = async({ page, limit, search, userId }) => {
    const videos = await db(ADMIN_VIDEOS,
        (page - 1) * limit, 
        limit,
        search,
        userId
    );
    return videos;
};


export default {
    adminVideos
}