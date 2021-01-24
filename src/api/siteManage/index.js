// 站点管理
import request from '@/api/http';
//添加对话
export const addDialog = (row) => {
    return request({
        url: '/sqfc/website/addDialog',
        method: 'post',
        params: row
    })
}
// 添加站点
export const addWebsite = (website) => {
    return request({
        url: '/sqfc/website/addWebsite',
        method: 'post',
        data:website
    })
}
// 删除站点
export const deleteWebsite = (websiteId) => {
    return request({
        url: '/sqfc/website/deleteWebsite',
        method: 'get',
        params: { websiteId }
    })
}

// 查询站点列表
export const queryWebsite = (row) => {
    return request({
        url: '/sqfc/website/queryWebsite',
        method: 'get',
        params: { ...row }
    })
}

// 更新对话
export const updateDialog = (dialogId) => {
    return request({
        url: '/sqfc/website/updateDialog',
        method: 'post',
        params: { dialogId }
    })
}