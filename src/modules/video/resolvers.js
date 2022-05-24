import model from './model.js'

export default {
    Mutation: {
        updateVideo: async(_,{videoTitle,videoId},{userId})=>{
            try {
                const [putVideo] = await model.changeVideo(videoTitle,videoId,userId)
                if(putVideo.length == 0){
                    return {
                        status: 404,
                        message: "You are not allowed"
                    }
                }
                return {
                    status: 200,
                    message: "Update video",
                    data: putVideo
                }
            } 
            catch (error) {
                throw new Error(error.message)
            }
        }
    }
}
