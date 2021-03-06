<template>
  <Card>
    <Form ref="searchForm" :model="searchForm" :label-width="60" :inline="true" class="search-form">
      <Form-item :label="$t('forms.name')" prop="appname">
        <i-input v-model="searchForm.appname" :disabled="modal_loading" size="small"
                 :placeholder="$t('forms.pleaseEnter') + $t('forms.name')"
                 @on-enter="handleSearch"></i-input>
      </Form-item>
      <Form-item style="float: right">
        <ButtonGroup>
          <Button :loading="modal_loading" @click="handleSearch()" type="info" size="small">
            {{$t('forms.buttons.search')}}
          </Button>
          <Button :loading="modal_loading" @click="handleSearchReset('searchForm')" type="info" size="small">
            {{$t('forms.buttons.reset')}}
          </Button>
          <Button :loading="modal_loading" @click="handleAdd()" type="info" size="small">
            {{$t('forms.buttons.add')}}
          </Button>
          <Button :loading="modal_loading" @click="handleDeleteMore()" type="info" size="small">
            {{$t('forms.buttons.delete')}}
          </Button>
        </ButtonGroup>
      </Form-item>
    </Form>
    <Table border height="433" size="small" :columns="columns" :data="searchData" class="search-table"
           :loading="modal_loading" :no-data-text="$t('messages.tableNoData')" @on-selection-change="handleSelect"
           @on-sort-change="handleSortChange">
      <template slot-scope="{ row }" slot="id">
        <span>{{ row.id }}</span>
      </template>
      <template slot-scope="{ row }" slot="appname">
        <span>{{ row.appname }}</span>
      </template>
      <template slot-scope="{ row }" slot="access_token_validity_seconds">
        <span>{{ row.access_token_validity_seconds }}</span>
      </template>
      <template slot-scope="{ row }" slot="refresh_token_validity_seconds">
        <span>{{ row.refresh_token_validity_seconds }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <div>
          <Tooltip :content="$t('forms.buttons.edit')" placement="top-start">
            <Icon @click="handleEdit(row,1)" type="md-create" size="18" style="cursor: pointer;"></Icon>
          </Tooltip>
          <Tooltip v-show="row.secret!==$store.state.app.appInfo.appSecret"
                   :content="$t('forms.buttons.view')" placement="top-start">
            <Icon @click="handleEdit(row,2,index)" type="md-search" size="18"
                  style="cursor: pointer;margin-left: 10px;"></Icon>
          </Tooltip>
          <Tooltip :content="$t('forms.buttons.delete')" placement="top-start" v-show="row.covert">
            <Icon @click="handleDeleteRow(row)" type="md-trash" size="18"
                  style="cursor: pointer;margin-left: 10px;"></Icon>
          </Tooltip>
        </div>
      </template>
    </Table>
    <div style="margin-top: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :current="searchForm.currPage" :total="searchForm.totalRows" :page-size="searchForm.pageSize"
              :page-size-opts="searchForm.pageSizeArray" show-total show-elevator show-sizer size="small"
              @on-change="handlePageSearch" @on-page-size-change="handlePageSizeSearch"/>
      </div>
    </div>
    <Modal v-model="editModal" :title="$t('forms.info')" :loading="modal_loading" :mask-closable="false">
      <Form ref="editForm" :model="editForm" :rules="ruleEditForm" :label-width="135" style="padding-right: 25px;">
        <Form-item :label="'appId'" prop="id" v-if="action===2">
          <Alert type="success">{{editForm.id}}</Alert>
        </Form-item>
        <Form-item :label="'secret'" prop="secret" v-if="action===2">
          <Alert type="error">{{editForm.secret}}</Alert>
        </Form-item>
        <Form-item :label="$t('forms.name')" prop="appname">
          <i-input ref="appname" v-model="editForm.appname" :disabled="modal_loading" v-if="action!==2"
                   :placeholder="$t('forms.pleaseEnter') + $t('forms.name')"
                   @on-enter="doSave('editForm')"></i-input>
          <Alert v-else>{{editForm.appname}}</Alert>
        </Form-item>
        <Form-item :label="$t('forms.access_token_validity_seconds')" prop="access_token_validity_seconds">
          <i-input v-model="editForm.access_token_validity_seconds" :disabled="modal_loading" v-if="action!==2"
                   :placeholder="$t('forms.pleaseEnter') + $t('forms.access_token_validity_seconds')"
                   @on-enter="doSave('editForm')">
            <span slot="append">{{$t('forms.seconds')}}</span>
          </i-input>
          <Alert v-else>{{editForm.access_token_validity_seconds}} {{$t('forms.seconds')}}</Alert>
        </Form-item>
        <Form-item :label="$t('forms.refresh_token_validity_seconds')" prop="refresh_token_validity_seconds">
          <i-input v-model="editForm.refresh_token_validity_seconds" :disabled="modal_loading" v-if="action!==2"
                   :placeholder="$t('forms.pleaseEnter') + $t('forms.refresh_token_validity_seconds')"
                   @on-enter="doSave('editForm')">
            <span slot="append">{{$t('forms.seconds')}}</span>
          </i-input>
          <Alert v-else>{{editForm.access_token_validity_seconds}} {{$t('forms.seconds')}}</Alert>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="default" :loading="modal_loading" @click="doCancel()">
          {{$t('forms.buttons.cancel')}}
        </Button>
        <Button v-if="action===0||action===1" type="primary" :loading="modal_loading"
                @click="doSave('editForm')">
          {{$t('forms.buttons.submit')}}
        </Button>
        <Button v-else type="primary" :loading="modal_loading"
                @click="doSave('editForm')">
          {{$t('forms.buttons.updateSecret')}}
        </Button>
      </div>
    </Modal>
  </Card>
</template>
<script>
  export default {
    name: 'appConfig',
    data () {
      return {
        searchForm: {
          appname: '',
          orderParam: {
            key: 'appname',
            order: 'asc'
          },
          currPage: 1,
          totalRows: 0,
          pageSize: 10,
          pageSizeArray: [10, 20, 30, 40]
        },
        editForm: {
          id: '',
          appname: '',
          access_token_validity_seconds: '',
          refresh_token_validity_seconds: '',
          secret: '',
          index: -1
        },
        editModal: false,
        action: 0, // 0-add, 1-update, 2-view
        modal_loading: false,
        searchData: [],
        selectedData: []
      }
    },
    watch: {
      editModal (value) {
        if (value) {
          this.$nextTick(() => {
            this.$refs['appname'].focus()
          })
        }
      }
    },
    computed: {
      columns () {
        const columns = [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            key: 'id',
            title: 'ID',
            slot: 'id'
          },
          {
            key: 'appname',
            title: this.$i18n.t('forms.name'),
            slot: 'appname'
          },
          {
            key: 'access_token_validity_seconds',
            title: this.$i18n.t('forms.access_token_validity_seconds'),
            slot: 'access_token_validity_seconds'
          },
          {
            key: 'refresh_token_validity_seconds',
            title: this.$i18n.t('forms.refresh_token_validity_seconds'),
            slot: 'refresh_token_validity_seconds'
          },
          {
            title: this.$i18n.t('forms.action'),
            width: 120,
            align: 'center',
            slot: 'action'
          }
        ]
        columns.forEach((item) => {
          if (item.key === this.searchForm.orderParam.key) {
            item.sortType = this.searchForm.orderParam.order
            item.sortable = 'custom'
          }
        })
        return columns
      },
      ruleEditForm () {
        return {
          appname: [
            { required: true, message: this.$i18n.t('forms.name') + this.$i18n.t('forms.notEmpty'), trigger: 'blur' }
          ],
          access_token_validity_seconds: [
            {
              required: true,
              message: this.$i18n.t('forms.access_token_validity_seconds') + this.$i18n.t('forms.notEmpty'),
              trigger: 'blur'
            }, {
              type: 'string',
              pattern: /^[0-9]*$/,
              message: this.$i18n.t('forms.access_token_validity_seconds') + this.$i18n.t('forms.incorrect'),
              trigger: 'blur'
            }
          ],
          refresh_token_validity_seconds: [
            {
              required: true,
              message: this.$i18n.t('forms.access_token_validity_seconds') + this.$i18n.t('forms.notEmpty'),
              trigger: 'blur'
            }, {
              type: 'string',
              pattern: /^[0-9]*$/,
              message: this.$i18n.t('forms.access_token_validity_seconds') + this.$i18n.t('forms.incorrect'),
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      handleAdd () {
        this.$refs['editForm'].resetFields()
        this.action = 0
        this.editModal = true
      },
      doCancel () {
        this.editModal = false
      },
      doSave (name) {
        switch (this.action) {
          case 0: // 新增
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.modal_loading = true
                this.$api.request.app.create({
                  appname: this.editForm.appname,
                  access_token_validity_seconds: Number(this.editForm.access_token_validity_seconds),
                  refresh_token_validity_seconds: Number(this.editForm.refresh_token_validity_seconds)
                }).then((res) => {
                  this.modal_loading = false
                  if (res) {
                    this.$Message.success(this.$i18n.t('messages.saveSuccess'))
                    this.editModal = false
                    this.handleSearch()
                  }
                }).catch(() => {
                  this.modal_loading = false
                })
              }
            })
            break
          case 1: // 更新
            this.$refs[name].validate((valid) => {
              if (valid) {
                this.modal_loading = true
                this.$api.request.app.update({
                  id: this.editForm.id,
                  appname: this.editForm.appname,
                  access_token_validity_seconds: Number(this.editForm.access_token_validity_seconds),
                  refresh_token_validity_seconds: Number(this.editForm.refresh_token_validity_seconds)
                }).then((res) => {
                  this.modal_loading = false
                  if (res) {
                    this.$Message.success(this.$i18n.t('messages.updateSuccess'))
                    this.editModal = false
                    this.handleSearch()
                  }
                }).catch(() => {
                  this.modal_loading = false
                })
              }
            })
            break
          case 2:
            this.modal_loading = true
            this.$api.request.app.getNewSecret(this.editForm.id).then((res) => {
              this.modal_loading = false
              this.$Message.success(this.$i18n.t('messages.updateSuccess'))
              this.editForm.secret = res.data.secret
              this.searchData[this.editForm.index].secret = res.data.secret
            }).catch(() => {
              this.modal_loading = false
            })
            break
        }
      },
      handleDelete (rowIds) {
        this.modal_loading = true
        this.$api.request.app.delete(rowIds).then((res) => {
          this.modal_loading = false
          if (res) {
            this.$Message.success(this.$i18n.t('messages.deleteSuccess'))
            this.handleSearch()
          }
        }).catch(() => {
          this.modal_loading = false
        })
      },
      handlePageSearch (page) {
        this.searchForm.currPage = page
        this.handleSearch()
      },
      handlePageSizeSearch (size) {
        this.searchForm.pageSize = size
        this.handleSearch()
      },
      handleSearch () {
        let searchParam = {
          appname: this.searchForm.appname,
          query_param: {
            curr_page: this.searchForm.currPage,
            page_size: this.searchForm.pageSize
          }
        }
        if (this.searchForm.orderParam.order !== 'normal') {
          searchParam.query_param.order_name = this.searchForm.orderParam.key
          searchParam.query_param.order_commond = this.searchForm.orderParam.order
        }
        this.modal_loading = true
        this.$api.request.app.query(searchParam).then((res) => {
          this.modal_loading = false
          if (res) {
            this.selectedData = []
            this.searchForm.currPage = res.data.pageable.page_number + 1
            this.searchForm.totalRows = res.data.total_elements
            this.searchData = res.data.content.map(item => {
              if (!item.covert) {
                item._disabled = true
              }
              return item
            })
          }
        }).catch(() => {
          this.searchData = []
          this.selectedData = []
          this.modal_loading = false
        })
      },
      handleSortChange (param) {
        this.searchForm.orderParam.key = param.key
        this.searchForm.orderParam.order = param.order
        this.handleSearch()
      },
      handleSearchReset (name) {
        this.$refs[name].resetFields()
      },
      handleSelect (selection) {
        this.selectedData = selection
      },
      handleDeleteRow (row) {
        if (!row.covert) {
          this.$Modal.error({
            title: this.$i18n.t('dialog.error'),
            content: this.$i18n.t('messages.tableDataCannotDel')
          })
        } else {
          this.$Modal.confirm({
            title: this.$i18n.t('dialog.confirm'),
            content: this.$i18n.t('messages.deleteDataConfirm'),
            onOk: () => {
              this.handleDelete([row.id])
            }
          })
        }
      },
      handleDeleteMore () {
        if (this.selectedData.length > 0) {
          this.$Modal.confirm({
            title: this.$i18n.t('dialog.confirm'),
            content: this.$i18n.t('messages.deleteDataConfirm'),
            onOk: () => {
              this.handleDelete(this.selectedData.map(item => item.id))
            }
          })
        } else {
          this.$Modal.info({
            title: this.$i18n.t('dialog.info'),
            content: this.$i18n.t('messages.selectDataForDelete')
          })
        }
      },
      handleEdit (row, action, index) {
        this.$refs['editForm'].resetFields()
        this.editForm.appname = row.appname
        this.editForm.access_token_validity_seconds = row.access_token_validity_seconds + ''
        this.editForm.refresh_token_validity_seconds = row.refresh_token_validity_seconds + ''
        this.editForm.id = row.id
        this.editForm.secret = row.secret
        this.editForm.index = index
        this.editModal = true
        this.action = action
      }
    },
    mounted () {
      this.handleSearch()
    }
  }
</script>
