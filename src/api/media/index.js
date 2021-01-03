// 多媒体素材--视频
import request from '@/api/http';

// 获取多媒体头部分类数量
export const getTotalNum = () => {
    return request({
        url: '/sqfc/material/queryNumber',
        method: 'get',
        params:{}
    })
}

// 视频列表
export const getVideoList = (row) => {
    return request({
        url: '/sqfc/material/queryVideo',
        method: 'get',
        params: row
    })
}

// 修改保存视频
export const videoUpDate= (params) => {
    return request({
        url: '/sqfc/material/updateVideo',
        method: 'post',
        data: params
    })
}
// 添加保存视频
export const videoUpLoad= (params) => {
    return request({
        url: '/sqfc/material/uploadVideo',
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
export const getRemove = (videoId) => {
    return request({
        url: '/sqfc/material/deleteVideo',
        method: 'get',
        params: {
            videoId
        }
    })
}

// 添加文本
export const reqMediaAddtext = (params) => {
    return request({
        url: '/sqfc/material/addText',
        method: 'get',
        params: {
            ...params
        }
    })
}


