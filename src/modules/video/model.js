import db from '../../utils/db.js'

const DELETE_VIDEO = `
    DELETE FROM videos WHERE video_id = $1 returning *
`

async function deleteVideo(video_id) {
    const video = await db(DELETE_VIDEO, video_id)
    return video
}

export default {
    deleteVideo
}