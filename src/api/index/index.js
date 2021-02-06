import request from '@/api/http';
// 首页


// 顶部数据
export const indexTopData = (groupId) => {
    return request({
        url: '/sqfc/index/queryIndexCount',
        method: 'get',
        params:{groupId}
    })
}

// 柱状图信息
export const reqIndexBarData = () => {
    return request({
        url: '/sqfc/index/queryData',
        method: 'get',
        params:{}
    })
}