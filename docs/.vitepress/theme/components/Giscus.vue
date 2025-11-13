<template>
  <div class="giscus-container">
    <h2>💬 讨论区</h2>
    <p>欢迎在下方分享你的学习心得、提出问题或参与讨论！需要 GitHub 账号登录。</p>
    <div ref="giscusContainer"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const giscusContainer = ref(null)
const { isDark } = useData()

const loadGiscus = () => {
  if (!giscusContainer.value) return
  
  // 清除现有的 Giscus
  giscusContainer.value.innerHTML = ''
  
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'shiro123444/CS50')
  script.setAttribute('data-repo-id', 'R_kgDOQUrlZw')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOQUrlZ84CxvUa')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true
  
  giscusContainer.value.appendChild(script)
}

onMounted(() => {
  loadGiscus()
})

// 监听主题变化
watch(isDark, () => {
  const iframe = document.querySelector('iframe.giscus-frame')
  if (iframe) {
    iframe.contentWindow.postMessage(
      {
        giscus: {
          setConfig: {
            theme: isDark.value ? 'dark' : 'light'
          }
        }
      },
      'https://giscus.app'
    )
  }
})
</script>

<style scoped>
.giscus-container {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}

.giscus-container h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.giscus-container p {
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}
</style>
