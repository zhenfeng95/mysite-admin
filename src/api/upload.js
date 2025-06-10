// 文件管理
import request from "@/utils/request";

// 新增文件
export function addFile(data) {
  return request({
    url: "/api/upload/save",
    method: "post",
    data,
  });
}

// 获取文件
export function getFileList() {
  return request.get("/api/upload/list");
}

// 修改文件
export function updateFile(id, data) {
  return request({
    url: `/api/upload/edit/${id}`,
    method: "put",
    data,
  });
}
