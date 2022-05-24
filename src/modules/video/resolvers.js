import model from './model.js';
import { VIDEO_CONFIG } from '../../config.js';

export default {
    SortOptions: {
        toLargest: 2,
        toSmallest: 1
    },
    Query: {
        adminVideos: async(_, { pagination, search }, { userId }) => {
            if(!userId) {
                throw new Error("You are not authorized!");
            }

            let video = await model.adminVideos({
                page: pagination?.page || VIDEO_CONFIG.PAGINATION.PAGE,
                limit: pagination?.limit || VIDEO_CONFIG.PAGINATION.LIMIT,
                search: search?.search || '',
                userId
            });

            if(!video) {
                throw new Error('You have no videos!');
            }

            return video;
        }
    },
}