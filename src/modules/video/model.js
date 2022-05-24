import db from '../../utils/db.js'

const DELETE_VIDEO = `
    update videos set video_deleted_at = $1 where video_id = $2 and user_id = $3 returning *
`

async function deleteVideo(video_deleted_at, video_id, user_id) {
    const video = await db(DELETE_VIDEO, video_deleted_at, video_id, user_id)
    return video
}

export default {
    deleteVideo
}