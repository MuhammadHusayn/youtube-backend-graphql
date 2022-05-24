import model from './model.js'

export default {
    SortOptions: {
        toLargest: 2,
        toSmallest: 1
    },

    Query: {
        users: (_, args) => {
            return model.getUsers(args)
        }
    },
    
    User: {
        userId:        global => global.user_id,
        userImg:       global => 'http://localhost:5000/' + global.user_img,
        userCreatedAt: global => global.user_created_at,
    }
}