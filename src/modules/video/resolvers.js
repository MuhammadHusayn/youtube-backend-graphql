import model from './model.js'
import { GraphQLUpload } from 'graphql-upload'
import fs from "fs"
import path from "path"
import { finished } from 'stream/promises'

export default {
    Mutation: {
        addVideo: async (_, { video_title, file }, { userId }) => {

            const { createReadStream, filename, mimetype } = await file

            if(!['video/mp4', 'video/mov', 'video/avi'].includes(mimetype)) {
                throw new Error("Wrong format video!")
            }

            const fileName = Date.now() + filename.replace(/\s/g, "")
            video_title = video_title.trim()

            if(!video_title) {
                throw new Error('Video title required!')
            }

            const out = fs.createWriteStream(path.join(process.cwd(), 'uploads', fileName));
            createReadStream().pipe(out)
            await finished(out)
            const size = Math.round(out.bytesWritten / 1024 / 1024)

            await model.createVideo({
                userId,
                video_title,
                video_link: fileName,
                video_type: mimetype
            })

            // const videos = await model.adminVideos({ page, limit, search, userId })
            // const addedVideo = videos.find(vd => vd.video_name == video_name)

            return {
                status: 200,
                message: "Video added successfully!",
                // data: addedVideo
            }
        }
    },
    Upload: GraphQLUpload
}