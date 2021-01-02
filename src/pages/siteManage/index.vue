<template>
  <div class="wrap">
    <div class="table_box">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button
            type="success"
            size="small"
            @click="showVisible()"
            icon="el-icon-plus"
            >新建站点</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="rowAllDel"
            icon="el-icon-delete"
            >删除</el-button
          >
          <el-button
            type="info"
            size="small"
            @click="handleExport"
            icon="el-icon-download"
            >导出</el-button
          >
        </el-col>
        <el-col :span="12">
          <el-input
            placeholder="可输入站点编号/业主姓名/销售员姓名/分组进行搜索"
            v-model="searchVal"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column fixed prop="num" label="站点编号" width="150">
        </el-table-column>
        <el-table-column prop="name" label="业主姓名"> </el-table-column>
        <el-table-column prop="pai" label="树莓派"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="group" label="分组"> </el-table-column>
        <el-table-column prop="type" label="经营范式"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native="showVisible(scope.$index, scope.row)"
              type="text"
              size="small"
            >
              编辑
            </el-button>
            <el-button
              @click.native.prevent="rewDel(scope.$index, scope.row)"
              type="text"
              size="small"
              style="color: #f00"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑、新增弹窗 -->
      <el-drawer
        :title="visibleTitle"
        :visible.sync="isVisible"
        direction="rtl"
        class="visibleClass"
        style="overflow-y: scroll"
        size="50%"
      >
        <el-form
          ref="form"
          class="formclass"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="设备编号" prop="num">
            <el-input type="number" v-model="form.num"></el-input>
          </el-form-item>
          <el-form-item label="站点编号" prop="sitenum">
            <el-input type="number" v-model="form.sitenum"></el-input>
          </el-form-item>
          <div class="group_title">业主信息</div>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idcard">
            <el-input v-model="form.idcard"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="销售员姓名" prop="xsname">
            <el-input v-model="form.xsname"></el-input>
          </el-form-item>
          <el-form-item label="分组" prop="ogroup">
            <!-- <el-radio-group v-model="form.ogroup">
              <el-radio
                :label="item.label"
                v-for="item in groups"
                :key="item.id"
              ></el-radio>
            </el-radio-group> -->
            <div class="tips">请前往个人中心添加分组</div>
          </el-form-item>
          <el-form-item label="经营方式" prop="otype">
            <el-radio-group v-model="form.otype">
              <el-radio
                :label="item.label"
                v-for="item in types"
                :key="item.id"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="管理员" prop="admin">
            <el-input v-model="form.admin"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="submitForm('form')"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>
<script>
export default {
  
  data() {
    var idcard = (rule, value, callback) => {
         // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (reg.test(value)) {
          callback(new Error('请输入正确的身份证号'))
        } else {
          callback()
        }

      };
      var phone = (rule, value, callback) => {
        let reg = /^1(3|4|5|6|7|8)\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }

      };
    return {
      form: {},
      rules: {
        num: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {pattern: /[1-9]\d?/, message:'请输入数字', trigger: 'blur'},
          { min:4,max: 4, message: '输入4位数字', trigger: 'blur' }
        ],
        sitenum: [
          { required: true, message: "请输入站点编号", trigger: "blur" },
           { type:'number', message: '必须为数字' },
          { min:8,max: 8, message: '请输入输入8位数字', trigger: 'blur' }
        ],
        name: [
          { required: true, message: "请输入业主姓名", trigger: "blur" }
        ],
        idcard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
           {pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message:'请输入正确的身份证', trigger: 'blur'},
          //  { validator: idcard, trigger: 'blur' }
          { min:15,max: 18, message: '请输入正确的身份证', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // { validator: idcard, trigger: 'blur' },
          {pattern:/^1(3|4|5|6|7|8)\d{9}$/, message:'请输入正确的手机号', trigger: 'blur'},
          // { max:11, message: '请输入11位手机号码', trigger: 'blur' }
        ],
        xsname: [
          { required: true, message: "请输入销售员姓名", trigger: "blur" }
        ],
        ogroup: [
          { required: true, message: "请选择分组", trigger: "blur" }
        ],
        otype: [
          { required: true, message: "请选择经营方式", trigger: "blur" }
        ],
        address:[
          { required: true, message: "请输入地址", trigger: "blur" }
        ],
        admin:[
          { required: true, message: "请输入管理员", trigger: "blur" }
        ],
      },
      groups: [
        { id: 1, label: "A组" },
        { id: 2, label: "B组" },
      ],
      types: [
        { id: 1, label: "专营" },
        { id: 2, label: "双机" },
      ],
      isVisible: false, //弹窗显示隐藏
      visibleTitle: "新建",
      searchVal: "",
      selectionList: [], //批量选择列表
      tableData: [
        {
          id: "1",
          num: "001",
          name: "张三",
          pai: "aaa说呢么",
          address: "北京市东城区什么风的看法递四方速递",
          group: "A组",
          type: "类型",
        },
        {
          id: 2,
          num: "002",
          name: "李四",
          pai: "aaa说呢么",
          address: "北京市东城区什么风的看法递四方速递",
          group: "A组",
          type: "类型",
        },
      ],
    };
  },
  computed: {
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    showVisible(index, row) {
      // 有值：编辑     否则：新增
      if (index && row) {
        this.visibleTitle = "编辑";
      } else {
        this.visibleTitle = "新增";
      }
      this.isVisible = true;
    },
    handleSelectionChange(rows) {
      //批量选择
      this.selectionList = rows;
    },
    rewDel(index, row) {
      // 行删除
      console.log(index);
      console.log(row);
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("删除");
        })
        .catch((err) => {
          console.log("取消");
        });
    },
    rowAllDel() {
      //批量删除
      if (this.selectionList.length == 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("删除");
          console.log(this.ids);
        })
        .catch((err) => {
          console.log("取消");
        });
    },
    handleExport() {
      this.$confirm("确认要导出数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("确认下载");
          // 下载
          // downloadFile(res);
        })
        .catch(() => {
          console.log("取消下载");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  background: #fff;
  overflow: hidden;
  .table_box {
    padding: 10px;
  }
  .group_title {
    line-height: 40px !important;
    padding: 0 10px;
    font-size: 18px;
    color: #666;
    background: #098;
  }
}
</style>