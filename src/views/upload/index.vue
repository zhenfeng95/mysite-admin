<template>
    <div class="app-container">
        <!-- 数据表格 -->
        <el-table v-loading="listLoading" :data="data" element-loading-text="加载数据中" border fit highlight-current-row>
            <!-- 序号 -->
            <el-table-column align="center" label="序号" width="60">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>

            <!-- 项目名称 -->
            <el-table-column align="center" label="文件名称" width="150">
                <template slot-scope="scope">
                    <a :href="scope.row.url" target="_blank" class="proName">
                        {{
                        scope.row.name
                        }}
                    </a>
                </template>
            </el-table-column>

            <!-- 项目描述 -->
            <el-table-column align="center" label="文件描述">
                <template slot-scope="scope">{{ scope.row.description.toString() }}</template>
            </el-table-column>

            <!-- 文件地址 -->
            <el-table-column align="center" label="文件地址">
                <template slot-scope="scope">{{ scope.row.url }}</template>
            </el-table-column>

            <!-- 操作 -->
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                    <!-- 编辑 -->
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top" :hide-after="2000">
                        <el-button type="primary" icon="el-icon-edit" circle size="mini" @click="editProjectHandle(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <!-- 编辑对话框 -->
        <el-dialog title="请编辑该项目信息" :visible.sync="dialogFormVisible" width="600">
            <el-form :model="form">
                <!-- 项目名称 -->
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <!-- 项目描述 -->
                <el-form-item label="项目描述（每一项描述以英文逗号分割）">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
            <!-- 确认和取消按钮 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEditProjectHandle">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
  <script>
import { getFileList, updateFile } from "@/api/upload.js";
import { server_URL } from "@/urlConfig.js";
import Upload from "@/components/Upload.vue";

export default {
    data() {
        return {
            data: [], // 存储数据
            listLoading: false,
            srcList: [],
            dialogFormVisible: false, // 一开始编辑对话框不可见
            form: {
                name: "",
                description: "",
            },
        };
    },
    components: {
        Upload,
    },
    created() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.listLoading = true;
            getFileList().then(({ data }) => {
                this.listLoading = false;
                this.data = data.data;
            });
        },
        openGitHubHandle(projectInfo) {
            window.open(projectInfo.github);
        },
        editProjectHandle(projectInfo) {
            this.dialogFormVisible = true;
            this.form = {
                ...projectInfo,
                description: projectInfo.description.toString(),
            };
        },
        deleteProjectHandle(projectInfo) {
            this.$confirm("确定要删除此项目吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    delProject(projectInfo.id).then(() => {
                        this.fetchData();
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        // 确认修改
        confirmEditProjectHandle() {
            let obj = { ...this.form };
            updateFile(obj.id, obj).then((res) => {
                if (res.code === 0) {
                    this.dialogFormVisible = false;
                    this.fetchData();
                    this.$message.success("修改成功");
                } else {
                    this.$message.success(res.msg);
                }
            });
        },
    },
};
</script>
  
  <style lang="scss" scoped>
.proName:hover {
    color: rgb(163, 163, 163);
}
.github {
    background-color: rgb(163, 163, 163);
    border: 1px solid rgb(163, 163, 163);
}
</style>
  