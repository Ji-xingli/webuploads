// 多媒体素材--文本
import request from '@/api/http';

// 列表
export const getList = (row) => {
    return request({
        url: '/sqfc/material/queryText',
        method: 'get',
        params: row
    })
}

// 修改保存
export const upDate= (row) => {
    return request({
        url: '/sqfc/material/updateText',
        method: 'get',
        params: row
    })
}
// 添加保存
export const upLoad= (row) => {
    return request({
        url: '/sqfc/material/addText',
        method: 'get',
        params: row
    })
}

//删除
export const getRemove = (textId) => {
    return request({
        url: '/sqfc/material/deleteText',
        method: 'get',
        params: {
            textId
        }
    })
}



