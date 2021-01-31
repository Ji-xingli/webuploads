import request from '@/api/http';

// 个人中心
// ======组相关======
// 添加分组
export const addGroup = (name) => {
    return request({
        url: '/sqfc/group/addGroup',
        method: 'get',
        params:{
            name
        }
    })
}

// 删除分组
export const deleteGroup = (groupId) => {
    return request({
        url: '/sqfc/group/deleteGroup',
        method: 'get',
        params:{
            groupId
        }
    })
}

// 查询分组
export const queryGroup = (row) => {
    return request({
        url: '/sqfc/group/queryGroup',
        method: 'get',
        params:{
            ...row
        }
    })
}

// 
export const queryGroupById = (groupId) => {
    return request({
        url: '/sqfc/group/queryGroupById',
        method: 'get',
        params:{
            groupId
        }
    })
}

//修改保存
export const updateGroup = (row) => {
    return request({
        url: '/sqfc/group/updateGroup',
        method: 'get',
        params:row
    })
}


// ====个人信息相关===
// 获取个人信息
export const getUserInfo = () => {
    return request({
        url: '/sqfc/user/queryUserInfo',
        method: 'get',
        params:{}
    })
}

// 个人信息更新
export const userInfoUpdate = (params) => {
    return request({
        url: '/sqfc/user/updateUser',
        method: 'post',
        data:params
    })
}

// 更新上传设备软件包
export const updateDevice = (params) => {
    return request({
        url: '/sqfc/user/updateDevice',
        method: 'post',
        data:params
    })
}

