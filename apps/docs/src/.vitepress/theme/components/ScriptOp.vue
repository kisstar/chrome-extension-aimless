<script setup>
import { message } from 'ant-design-vue'
import { withBase } from 'vitepress'

const props = defineProps({
  scriptSrc: String,
})
let scriptContent = ''

async function fetchScript() {
  if (scriptContent)
    return scriptContent

  const response = await fetch(withBase(props.scriptSrc))

  if (response.ok) {
    scriptContent = await response.text()

    return scriptContent
  }
  else {
    throw new Error('获取脚本内容失败，请尝试下载')
  }
}

async function handleCopy() {
  try {
    const scriptContent = await fetchScript()

    navigator.clipboard.writeText(scriptContent)
    message.success('复制成功')
  }
  catch (error) {
    message.error(error instanceof Error ? error.message : '复制失败，请尝试下载')
  }
}
</script>

<template>
  <div class="cea-script-op">
    <cea-radio-button @click="handleCopy">
      复制脚本
    </cea-radio-button>
    <cea-radio-button>
      <a
        class="cea-script-op__link"
        :href="props.scriptSrc"
        :download="props.scriptSrc"
      >
        点击下载
      </a>
    </cea-radio-button>
  </div>
</template>

<style lang="scss" scoped>
.cea-script-op {
  &__link {
    text-decoration: none;
  }
}
</style>
