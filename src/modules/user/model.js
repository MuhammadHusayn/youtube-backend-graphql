import db from '../../utils/db.js'

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

const USER = ``

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

export default {
    getUsers
}