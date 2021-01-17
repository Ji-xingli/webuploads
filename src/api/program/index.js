// 节目管理
import request from '@/api/http';



// 查询列表
export const queryProgramList = (row) => {
    return request({
        url: '/sqfc/program/queryProgramList',
        method: 'get',
        params:row
    })
}

// 查询节目
export const queryProgram = (row) => {
    return request({
        url: '/sqfc/program/queryProgram',
        method: 'get',
        params:{
            ...row
        }
    })
}



// 更新播放状态
export const updateBroadcastStatus = (programId) => {
    return request({
        url: '/sqfc/program/updateBroadcastStatus',
        method: 'get',
        params:{
            programId
        }
    })
}

// 编辑修改节目列表
export const updateProgram = (program) => {
    return request({
        url: '/sqfc/program/updateProgram',
        method: 'post',
        data:program
    })
}

// 添加节目
export const addProgram = (materialProgramRelation) => {
    return request({
        url: '/sqfc/program/addProgram',
        method: 'post',
        data:materialProgramRelation
    })
}


