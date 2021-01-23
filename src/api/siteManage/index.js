// 站点管理

export const addDialog = (row) => {
    return request({
        url: '/sqfc/website/addDialog',
        method: 'post',
        params: row
    })
}

export const addWebsite = (row) => {
    return request({
        url: '/sqfc/website/addWebsite',
        method: 'post',
        params: row
    })
}

export const deleteWebsite = (websiteId) => {
    return request({
        url: '/sqfc/website/deleteWebsite',
        method: 'get',
        params: { websiteId }
    })
}

export const queryWebsite = (row) => {
    return request({
        url: '/sqfc/website/queryWebsite',
        method: 'get',
        params: { ...row }
    })
}

export const queryWebsite = (row) => {
    return request({
        url: '/sqfc/website/queryWebsite',
        method: 'get',
        params: { ...row }
    })
}

export const updateDialog = (dialogId) => {
    return request({
        url: '/sqfc/website/updateDialog',
        method: 'post',
        params: { dialogId }
    })
}