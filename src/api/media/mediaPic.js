// 多媒体素材--图片
import request from '@/api/http';

// 视频列表
export const getPList = (row) => {
    return request({
        url: '/sqfc/material/queryImage',
        method: 'get',
        params: row
    })
}

// 修改保存视频
export const upDate= (params) => {
    return request({
        url: '/sqfc/material/updateImage',
        method: 'post',
        data: params
    })
}
// 添加保存视频
export const upLoad= (params) => {
    return request({
        url: '/sqfc/material/uploadImage',
        method: 'post',
        data: params
    })
}
//视频编辑前校验
export const getEditBefore = (id) => {
    return request({
        url: '/sqfc/material/findMaterialById',
        method: 'get',
        params: {
            id
        }
    })
}

//视频列表删除
export const getRemove = (imageId) => {
    return request({
        url: '/sqfc/material/deleteImage',
        method: 'get',
        params: {
            imageId
        }
    })
}



