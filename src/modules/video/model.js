import db from '../../utils/db.js'

const UPDATE_VIDEO = `
    update videos set video_title = $1 where video_id = $2 and user_id = $3 returning *
`
const updateVideo = async(video_title,videoId,userId) =>{
    const video = await db(UPDATE_VIDEO,video_title,videoId,userId)
    return video
}
export default {
    updateVideo
}