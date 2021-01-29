<template>
  <div class="wrap">
    <div class="table_box">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-button type="success" size="small" @click="showVisible()" icon="el-icon-plus">新建站点</el-button>
          <el-button type="danger" size="small" @click="rowAllDel" icon="el-icon-delete">删除</el-button>
          <el-button type="info" size="small" @click="handleExport" icon="el-icon-download">导出</el-button>
        </el-col>
        <el-col :span="12">
          <el-input placeholder="可输入站点编号" v-model="searchVal" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="searchList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%"
        :height="screenHeight"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column fixed prop="websiteNumber" label="站点编号" width="150"></el-table-column>
        <el-table-column prop="websiteOwnerName" label="业主姓名"></el-table-column>
        <el-table-column prop="websiteDeviceNumber" label="设备编号"></el-table-column>
        <el-table-column prop="websiteAddress" label="地址"></el-table-column>
        <el-table-column prop="groupName" label="分组"></el-table-column>
        <el-table-column prop="websiteManegementType" label="经营方式" :formatter="formatType"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.native="showVisible(scope.row)" type="text" size="small">编辑</el-button>
            <el-button
              @click.native.prevent="rewDel(scope.row.websiteId)"
              type="text"
              size="small"
              style="color: #f00"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next,jumper"
        @prev-click="getPrev"
        @next-click="getNext"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        :total="totalNo"
      ></el-pagination>
      <!-- 编辑、新增弹窗 -->
      <el-drawer
        :title="visibleTitle"
        :visible.sync="isVisible"
        :before-close="visibleBefore('form')"
        direction="rtl"
        class="visibleClass"
        style="overflow-y: scroll"
        size="50%"
      >
        <el-form ref="form" class="formclass" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="设备编号" prop="websiteDeviceNumber">
            <el-input type="text" v-model="form.websiteDeviceNumber"></el-input>
          </el-form-item>
          <el-form-item label="站点编号" prop="websiteNumber">
            <el-input type="number" v-model="form.websiteNumber"></el-input>
          </el-form-item>
          <div class="group_title">业主信息</div>
          <el-form-item label="姓名" prop="websiteOwnerName">
            <el-input v-model="form.websiteOwnerName"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="websiteOwnerIdCard">
            <el-input v-model="form.websiteOwnerIdCard"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="websiteOwnerPhone">
            <el-input v-model="form.websiteOwnerPhone"></el-input>
          </el-form-item>
          <el-form-item label="销售员姓名" prop="websiteSalesName">
            <el-input v-model="form.websiteSalesName"></el-input>
          </el-form-item>
          <el-form-item label="分组" prop="websiteGroupId">
            <el-radio-group v-model="form.websiteGroupId" v-if="groups">
              <el-radio
                :label="item.group.groupId"
                v-for="item in groups"
                :key="item.group.groupId"
              >{{ item.group.groupName }}</el-radio>
            </el-radio-group>
            <div class="tips" v-else>请前往个人中心添加分组</div>
          </el-form-item>
          <el-form-item label="经营方式" prop="websiteManegementType">
            <el-radio-group v-model="form.websiteManegementType">
              <el-radio :label="item.id" v-for="item in types" :key="item.id">{{ item.label }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="地址" prop="websiteAddress">
            <el-input v-model="form.websiteAddress"></el-input>
          </el-form-item>
          <el-form-item label="管理员" prop="websiteManageName">
            <el-input v-model="form.websiteManageName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="submitForm('form')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import {
  addWebsite,
  queryWebsite,
  deleteWebsite,
  deleteWebsiteByIds
} from "@/api/siteManage/index.js";
import {
  queryGroup //查询组列表
} from "@/api/personalCenter/index.js";
var idcard = (rule, value, callback) => {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (reg.test(value)) {
    callback(new Error("请输入正确的身份证号"));
  } else {
    callback();
  }
};
var phone = (rule, value, callback) => {
  let reg = /^1(3|4|5|6|7|8)\d{9}$/;
  if (!reg.test(value)) {
    callback(new Error("请输入正确的手机号"));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      screenHeight: `${document.documentElement.clientHeight}` - 242,
      form: {},
      rules: {
        websiteNumber: [
          { required: true, message: "请输入站点编号", trigger: "blur" }
          // { pattern: /[1-9]\d?/, message: "请输入数字", trigger: "blur" },
          // { min: 4, max: 4, message: "输入4位数字", trigger: "blur" },
        ],
        websiteDeviceNumber: [
          { required: true, message: "请输入设备编号", trigger: "blur" }
          // { pattern: /[1-9]\d?/, message: "请输入数字", trigger: "blur" },
          // { min: 8, max: 8, message: "请输入8位数字", trigger: "blur" },
        ],
        websiteOwnerName: [
          { required: true, message: "请输入业主姓名", trigger: "blur" }
        ],
        websiteOwnerIdCard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请输入正确的身份证",
            trigger: "blur"
          },
          //  { validator: idcard, trigger: 'blur' }
          { min: 15, max: 18, message: "请输入正确的身份证", trigger: "blur" }
        ],
        websiteOwnerPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          // { validator: idcard, trigger: 'blur' },
          {
            pattern: /^1(3|4|5|6|7|8)\d{9}$/,
            message: "请输入正确的手机号",
            trigger: "blur"
          }
          // { max:11, message: '请输入11位手机号码', trigger: 'blur' }
        ],
        websiteSalesName: [
          { required: true, message: "请输入销售员姓名", trigger: "blur" }
        ],
        websiteGroupId: [
          { required: true, message: "请选择分组", trigger: "blur" }
        ],
        websiteManegementType: [
          { required: true, message: "请选择经营方式", trigger: "blur" }
        ],
        websiteAddress: [
          { required: true, message: "请输入地址", trigger: "blur" }
        ],
        websiteManageName: [
          { required: true, message: "请输入管理员", trigger: "blur" }
        ]
      },
      groups: [],
      types: [
        { id: "1", label: "专营" },
        { id: "2", label: "双机" },
        { id: "3", label: "兼营" }
      ],
      type: "", //1:编辑  2：新增
      groupId: this.$store.state.groupId,
      isVisible: false, //弹窗显示隐藏
      visibleTitle: "新建",
      searchVal: "", //搜索
      currentPage: 1,
      pageSize: 10,
      totalNo: 0, //总条数
      selectionList: [], //批量选择列表
      tableData: []
    };
  },
  computed: {
    ids() {
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.websiteId);
      });
      return ids.join(",");
    }
  },
  mounted() {
    const _this = this;
    window.onresize = function temp() {
      _this.screenHeight = `${document.documentElement.clientHeight}` - 242;
    };
    _this.getList(1);
  },
  methods: {
    formatType(row, column) {
      //经营方式--转换文字
      if (row.websiteManegementType == 1) {
        return "专营";
      } else if (row.websiteManegementType == 2) {
        return "双机";
      } else {
        return "兼营";
      }
    },
    formatGroup(row) {
      // console.log(row.$index)
      if (this.groups.length != 0) {
        return this.groups[row.$index].group.groupName;
      }
    },
    visibleBefore(formName) {
      // 遮罩关闭前
      // this.$refs[formName].resetFields();
    },
    //点击上一页获取数据
    getPrev(val) {
      this.getList(val);
    },
    //点击下一页获取数据
    getNext(val) {
      this.getList(val);
    },
    handleCurrentChange(val) {
      this.getList(val);
    },
    searchList() {
      // 搜索
      this.getList(1);
    },
    getGroup() {
      // 获取组列表
      var odata = {
        name: ""
      };
      queryGroup(odata).then(res => {
        if (res.data.code == 200) {
          this.groups = res.data.data;
        }
      });
    },
    getList(currentPage) {
      // 当前页数赋值
      this.currentPage = currentPage;
      var odata = {
        groupId: this.groupId,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        websiteNumber: this.searchVal
      };
      queryWebsite(odata).then(res => {
        if (res.data.code == "200") {
          this.totalNo = res.data.data.total; //总条数
          this.tableData = res.data.data.websiteList;
          //获取组列表
          this.getGroup();
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var odata;
          // 1:编辑    2:新增
          if (this.type == 1) {
          } else {
            odata = {
              websiteAddress: this.form.websiteAddress,
              websiteDeviceNumber: this.form.websiteDeviceNumber,
              websiteGroupId: this.form.websiteGroupId,
              // websiteId:"",
              websiteManageName: this.form.websiteManageName,
              websiteManegementType: this.form.websiteManegementType,
              websiteNumber: this.form.websiteNumber,
              websiteOwnerIdCard: this.form.websiteOwnerIdCard,
              websiteOwnerName: this.form.websiteOwnerName,
              websiteOwnerPhone: this.form.websiteOwnerPhone,
              websiteSalesName: this.form.websiteSalesName
            };
            addWebsite(odata).then(res => {
              if (res.data.code == 200) {
                this.$message.success("添加成功");
                // 重置表单
                this.$refs[formName].resetFields();
                this.getList(1);
                // 弹窗消失
                this.isVisible = false;
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    showVisible(row) {
      // 有值：编辑     否则：新增
      if (row) {
        this.type = 1;
        this.visibleTitle = "编辑";
        // 赋值
        console.log(row)
        this.form=row;
      } else {
        this.type = 2;
        this.visibleTitle = "新增";
        // 重置表单
        this.form={}
      }
      
      this.isVisible = true;
      
    },
    handleSelectionChange(rows) {
      //批量选择
      this.selectionList = rows;
    },
    rewDel(id) {
      // 行删除
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteWebsite(id).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "操作成功!"
              });
              // 刷新列表
              this.getList(1);
            }
          });
        })
        .catch(err => {
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
        type: "warning"
      })
        .then(() => {
          deleteWebsiteByIds(this.ids).then(res=>{
            if(res.data.code==200){
              this.$message.success("删除成功");
              this.getList(1);
            }
          })

        })
        .catch(err => {
          console.log("取消");
        });
    },
    handleExport() {
      this.$confirm("确认要导出数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("确认下载");
          // 下载
          // downloadFile(res);
        })
        .catch(() => {
          console.log("取消下载");
        });
    }
  }
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
}
.formclass {
  .group_title {
    line-height: 40px !important;
    padding: 0 30px;
    font-size: 16px;
    color: #666;
  }
}
</style>