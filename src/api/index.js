import jsonp from "jsonp";
import { message } from "antd";
import ajax from "./ajax";

const BASE = "";

// 登录
export function reqLogin(username, password) {
  return ajax(BASE + "/login", { username, password }, "POST");
}

// 获取分类
export function reqCategorys(parentId) {
  return ajax(BASE + "/manage/category/list", { parentId });
}

// 获取一个分类
export function reqCategory(categoryId){
  return ajax(BASE + '/manage/category/info', {categoryId})
}

export function reqAddCategory(categoryName, parentId) {
  return ajax(
    BASE + "/manage/category/add",
    { categoryName, parentId },
    "POST"
  );
}

export function reqUpdateCategory({ categoryId, categoryName }) {
  return ajax(
    BASE + "/manage/category/update",
    { categoryId, categoryName },
    "POST"
  );
}

export function reqProducts(pageNum, pageSize) {
  return ajax(BASE + "/manage/product/list", { pageNum, pageSize });
}

export function reqSearchProducts({
  pageNum,
  pageSize,
  searchName,
  searchType,
}) {
  return ajax(BASE + "/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });
}

export function reqUpdateStatus(productId, status) {
  return ajax(
    BASE + "/manage/product/updateStatus",
    { productId, status },
    "POST"
  );
}

export function reqDeleteImg(name){
  return ajax(BASE + '/manage/img/delete', {name}, 'POST')
}

export function reqAddOrUpdateProduct(product){
  return ajax(BASE + '/manage/product/' + ( product._id?'update':'add'), product, 'POST')
}

// 权限列表
export function reqRoles() {
  return ajax(BASE + '/manage/role/list')
}

// 添加角色
export function reqAddRole(roleName){
  return ajax(BASE + '/manage/role/add', {roleName}, 'POST')
}

// 添加角色
export function reqUpdateRole (role) {
  return ajax(BASE + '/manage/role/update', role, 'POST')
}

export function reqUsers(){
  return ajax(BASE + '/manage/user/list')
}

// 删除指定用户
export function reqDeleteUser(userId){
  return ajax(BASE + '/manage/user/delete', {userId}, 'POST')
}

// 添加/更新用户
export function reqAddOrUpdateUser(user) {
  return ajax(BASE + '/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')
}

/*
json请求的接口请求函数
 */
export function reqWeather(city) {
  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      console.log("jsonp()", err, data);
      // 如果成功了
      if (!err && data.status === "success") {
        // 取出需要的数据
        const { dayPictureUrl, weather } = data.results[0].weather_data[0];
        resolve({ dayPictureUrl, weather });
      } else {
        // 如果失败了
        message.error("获取天气信息失败!");
      }
    });
  });
}
// reqWeather('北京')
/*
jsonp解决ajax跨域的原理
  1). jsonp只能解决GET类型的ajax请求跨域问题
  2). jsonp请求不是ajax请求, 而是一般的get请求
  3). 基本原理
   浏览器端:
      动态生成<script>来请求后台接口(src就是接口的url)
      定义好用于接收响应数据的函数(fn), 并将函数名通过请求参数提交给后台(如: callback=fn)
   服务器端:
      接收到请求处理产生结果数据后, 返回一个函数调用的js代码, 并将结果数据作为实参传入函数调用
   浏览器端:
      收到响应自动执行函数调用的js代码, 也就执行了提前定义好的回调函数, 并得到了需要的结果数据
 */
