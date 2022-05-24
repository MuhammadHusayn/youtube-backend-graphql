import model from './model.js'
import db from '../../utils/db.js'


import JWT from '../../utils/jwt.js'
import { finished } from 'stream/promises'

export default {
    Mutation:{
        login:async(_,{username,password},{agent})=>{
            username = username.trim()
            password = password.trim()
            if(!username){
                return {
                    status:400,
                    message:"Iltimos username kiriting"
                }
            }
            if(!password){
                return {
                    status:400,
                    message:"Iltimos password kiriting"
                }
            }
           const users= await db(`select * from users`)

           const user = users.find(el=>el.username == username)
            if(user) {
                return {
                    status:200,
                    message:"Siz yangittan login qildingiz",
                    token:JWT.sign({userId:user.user_id,agent:agent})

                }
            }
            return {
                status:404,
                message:"Siz registratsiyadan otmagansiz"
            }


        },
    
    
    register:async(_,{username,password,file},{agent})=>{
        const { createReadStream, filename,mimetype } = await file

        username = username.trim()
        password = password.trim()
            if(!username){
                return {
                    status:400,
                    message:"Iltimos username kiriting"
                }
            }
            if(!password){
                return {
                    status:400,
                    message:"Iltimos password kiriting"
                }
            }
            if(!mimetype.includes('image')){
                return {
                    status: 400,
                    message: "File type invalid",
                }
    

            }

            const fileName = Date.now() + filename.replace(/\s/g, '')
            // let user =await model.postUser(username,password,fileName)

            const out = fs.createWriteStream(path.join(process.cwd(), 'uploads',fileName))

            createReadStream().pipe(out)
            await finished(out)
            console.log(user);
            return {
                status: 200,
                message: "The user successfully registered!",
                data: user[0],
                token: JWT.sign({
                    userId: user[0].userId,
                    agent,
                })
            }
        }
    },

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