import request from '@/api/http';

// 个人中心

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

//
export const updateGroup = (row) => {
    return request({
        url: '/sqfc/group/updateGroup',
        method: 'get',
        params:row
    })
}