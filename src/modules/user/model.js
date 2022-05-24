import db from '../../utils/db.js'

const POST_USER = `
    insert into users (username,password,user_img ) values ($1,$2,$3) returning *
`

const USERS2=`
    select * from users

`

const USERS = `
    select
        u.user_id,
        u.username,
        u.user_img, 
        u.user_created_at
    from users u
    where u.user_deleted_at is null and
    case
        when $3 > 0 then u.user_id = $3
        else true
    end
    order by
	(case when $4 = 1 and $5 = 2 then u.username end) asc,
	(case when $4 = 1 and $5 = 1 then u.username end) desc,
	(case when $4 = 2 and $5 = 2 then u.user_created_at end) asc,
	(case when $4 = 2 and $5 = 1 then u.user_created_at end) desc
    offset $1 limit $2
`

const getUsers = ({ userId, pagination: { limit, page }, sort }) => {
    let objectKeys = { byName: 1, byTime: 2 }

    objectKeys = Object.keys(objectKeys).map(key => {
        if (sort[key]) {
            return [objectKeys[key], sort[key]]
        }
    }).filter(el => el)[0]

    const users = db(USERS,
        (page - 1) * limit, limit,
        userId,
        objectKeys[0],
        objectKeys[1]
    )
    
    return users
}

const postUser=async(username,password,fileName)=>{
    const user = await db(POST_USER,username,password,fileName)
    return user
}
const users =async()=>{
    const user =await db(USERS2)
    console.log(user);
}


export default {
    getUsers,
    postUser,
    users
}