<template>
  <div style="text-align: center">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <div style="margin-top: 20px">{{ state.timeStr }}</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, getCurrentInstance, type ComponentInternalInstance, reactive } from 'vue'

const currentInstance = getCurrentInstance() as ComponentInternalInstance
const { $http } = currentInstance.appContext.config.globalProperties
const state = reactive({
  timeStr: '',
})
const getData = async () => {
  const { result } = await $http('/test', 'post', {
    time: new Date().getTime(),
  })
  state.timeStr = result.time
}
onMounted(() => {
  getData()
})
</script>
<style lang="less" scoped></style>
