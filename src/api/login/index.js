import request from '@/api/http';
// 登录


// 登录
export const login = (row) => {
    return request({
        url: '/sqfc/user/login',
        method: 'get',
        params:row
    })
}

// 退出登录
export const loginout = () => {
    return request({
        url: '/sqfc/user/logout',
        method: 'get',
        data:{}
    })
}
