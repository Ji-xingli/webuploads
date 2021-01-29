// 站点管理
import request from '@/api/http';

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
// 批量删除
export const deleteWebsiteByIds = (websiteIds) => {
    return request({
        url: '/sqfc/website/deleteWebsiteByIds',
        method: 'get',
        params: { websiteIds }
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


// 首页对话

//添加对话
export const addDialog = (dialog) => {
    return request({
        url: '/sqfc/website/addDialog',
        method: 'post',
        data: dialog
    })
}
//查询对话是否存在
export const queryDialog = () => {
    return request({
        url: '/sqfc/website/queryDialog',
        method: 'get',
        data: {}
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