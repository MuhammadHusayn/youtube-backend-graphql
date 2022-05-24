import db from '../../utils/db.js'

const CREATE_VIDEO = `
    INSERT INTO videos 
        (user_id, video_title, video_link, video_type) values 
        ($1, $2, $3, $4)
`

async function createVideo({ userId, video_title, video_link, video_type }) {
    return await db(CREATE_VIDEO, userId, video_title, video_link, video_type)
}

export default {
    createVideo
}