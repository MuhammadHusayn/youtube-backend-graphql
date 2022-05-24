import model from './model.js'


export default {
    Mutation: {
        deleteVideo: async (_, { video_id }, { userId } ) => {
            if (!userId) throw new Error("You can not delete video!")
            const deletedVideo = await model.deleteVideo(video_id)
            return {
                status: 200,
                message: "The video successfully deleted!",
                data: deletedVideo[0]
            }
        },
    }
}