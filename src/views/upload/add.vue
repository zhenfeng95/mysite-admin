<template>
    <div class="app-container">
        <!-- 项目名称 -->
        <div class="block">文件名称</div>
        <div style="margin-bottom: 15px">
            <el-input v-model="form.name" placeholder="请输入文件的名称"></el-input>
        </div>
        <!-- 项目描述（每一项描述以英文逗号分割） -->
        <div class="block">文件描述（每一项描述以英文逗号分割）</div>
        <div style="margin-bottom: 15px">
            <el-input v-model="form.description" placeholder="请输入项目的描述，每一项描述以英文逗号分割"></el-input>
        </div>
        <!-- 预览图 -->
        <div style="margin-bottom: 15px">
            <Upload uploadTitle="项目预览图地址" v-model="form.url" />
        </div>
        <el-button type="primary" plain @click="addUploadHandle">发布文件</el-button>
    </div>
</template>

<script>
import Upload from "@/components/Upload.vue";
import { addFile } from "@/api/upload.js";
export default {
    data() {
        return {
            form: {
                name: "",
                description: "",
                url: "",
            },
        };
    },
    components: {
        Upload,
    },
    methods: {
        addUploadHandle() {
            let obj = { ...this.form };
            addFile(obj).then(() => {
                this.$router.push("/uploadsList");
                this.$message.success("添加文件成功");
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.block {
    margin: 15px 0;
    font-weight: 100;
}
</style>
