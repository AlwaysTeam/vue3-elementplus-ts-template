<template>
  <div class="not_found_page">
    <div>
      <h1>404</h1>
      <div class="box">
        <h2 @click="toHome">
          This page could not be found.
          <span v-if="time > 0">{{ time }}s To Home</span>
          <span v-else>Help Me To Home</span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'

const router = useRouter()
const time = ref(5)
const timeID = ref(0)
const toHome = () => {
  clearInterval(timeID.value)
  router.go(-1)
}
const start = () => {
  document.title = '404'
  timeID.value = window.setInterval(() => {
    time.value -= 1
    if (time.value <= 0) {
      time.value = 0
      clearInterval(timeID.value)
      toHome()
    }
  }, 1000)
}
onMounted(() => {
  ElNotification.closeAll()
  start()
})
</script>

<style lang="less" scoped>
.not_found_page {
  font-family:
    -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', 'Fira Sans', Avenir, 'Helvetica Neue',
    'Lucida Grande', sans-serif;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    display: inline-block;
    border-right: 1px solid rgba(0, 0, 0, 0.3);
    margin: 0;
    margin-right: 20px;
    padding: 10px 23px 10px 0;
    font-size: 24px;
    font-weight: 500;
    vertical-align: top;
  }

  .box {
    display: inline-block;
    text-align: left;
    line-height: 49px;
    height: 49px;
    vertical-align: middle;
    h2 {
      font-size: 14px;
      font-weight: normal;
      line-height: inherit;
      margin: 0;
      padding: 0;
      cursor: pointer;
    }
  }
}

.dark {
  .not_found_page {
    h1 {
      border-right: 1px solid #fff;
    }
  }
}
</style>
