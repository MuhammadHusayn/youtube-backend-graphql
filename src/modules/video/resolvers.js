import model from './model.js'

export default {
    Mutation: {
        updateVideo: async(_,{video_title,videoId},{userId})=>{
            console.log(video_title,videoId);
            console.log(userId);
        }
    }
}