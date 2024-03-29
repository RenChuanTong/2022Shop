/* 
包含所有接口请求函数的模块
*/

import ajax from './ajax'
import mockAjax from './mockAjax'

// 首页三级分类 /api/product/getBaseCategoryList
export function reqCategoryList(){
    // return ajax.get('product/getBaseCategoryList')
    // return ajax('product/getBaseCategoryList')  //发送不带参数get请求
    return ajax({
        url:'/product/getBaseCategoryList',
        method:'get',
    })
}

/* // banner请求(真实接口)
export const reqBannerList = () => ajax('/cms/banner') */

// 搜索商品请求
export const reqSearchList = (listParams) => ajax.post('/list',listParams)

// 商品详情页   /api/item/{ skuId }  GET
export const reqDetailInfo = (skuId) =>{
    return ajax({
        url:`/item/${skuId}`,
        method:'GET'
    })
}

// 添加或更新购物车 /api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (skuId,skuNum) =>{
    return ajax({
        url:`/cart/addToCart/${ skuId }/${ skuNum }`,
        method:'POST',
        
    })
}

// 获取购物车列表 /api/cart/cartList  get
export const reqCartList = () => {
    return ajax({
        url:'/cart/cartList',
        method:'GET'
    })
}

// 切换商品选中状态 /api/cart/checkCart/{skuID}/{isChecked} GET
export const reqUpdateCartChecked = (skuID,isChecked) =>{
    return ajax({
        url:`/cart/checkCart/${skuID}/${isChecked}`,
        method:'GET'
    })
}

// 删除单个商品  /api/cart/deleteCart/{skuId}  delete
export const reqDeleteCart = (skuId) =>{
    return ajax({
        url:`/cart/deleteCart/${skuId} `,
        method:'delete'
    })
}

// . 注册用户   /api/user/passport/register POST 
export const reqUserRegister = (config) =>{
    return ajax({
        url:'/user/passport/register',
        method:'post',
        data:config
    })
}

// 获取验证码 /api/user/passport/sendCode/{phone}
export const reqSendCode = (phone) => {
    return ajax({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

// 登录 /api/user/passport/login  post 
export const reqUserLogin = (phone, password) => {
    return ajax({
        url:'/user/passport/login',
        method:'post',
        data:{phone, password}
    })
}

// 携带token获取用户信息
export const reqUserInfo = () => {
    return ajax({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}

// 退出登录 /api/user/passport/logout   get
export const reqUserLogout = () => {
    return ajax({
        url:'/user/passport/logout',
        method: 'get'
    })
}

// 获取订单支付页信息 /api/order/auth/trade get
export const reqTradeInfo = () => {
    return ajax({
        url:'/order/auth/trade ',
        method: 'get'
    })
}

// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}  post
export const reqSubmitTrade = (tradeNo,tradeData) => {
    return ajax({
        // url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        url:'/order/auth/submitOrder',
        method:'post',
        params:{tradeNo},
        data:tradeData
    })
}

// 获取支付信息 /api/payment/weixin/createNative/{orderId} get
export const reqPayInfo = (orderId) => {
    return ajax({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

// 查询订单支付状态 /api/payment/weixin/queryPayStatus/{orderId}    get
export const reqPayStatus = (orderId) => {
    return ajax({
        url: `/payment/weixin/queryPayStatus/${orderId} `,
        method: 'get'
    })
}

// 获取我的订单列表 /api/order/auth/{page}/{limit}  get
export const reqMyOrderInfo = (page,limit) => {
    return ajax({
        url: `/order/auth/${page}/${limit}`,
        method: 'get'
    })
}






// mock模拟数据请求
// today-mock请求
export const reqTodayList = () => mockAjax('/today')

// floors请求
export const reqFloors = () => mockAjax('/floors')

// banner请求（mock接口）
export const reqBannerList = () => mockAjax('/banner')
