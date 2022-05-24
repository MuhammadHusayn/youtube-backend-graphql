import model from './model.js'

export default {
    Mutation: {
        deleteVideo: async (_, { video_id }, { user_id }) => {
            let video_deleted_at = new Date()
            const deletedVideo = await model.deleteVideo(video_deleted_at, video_id, user_id)
            return {
                status: 200,
                message: "The video successfully deleted!",
                data: deletedVideo[0]
            }
        },
    }
}