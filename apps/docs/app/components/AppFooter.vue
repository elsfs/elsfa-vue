<script setup lang="ts">
const columns = [{
  label: '资源',
  children: [{
    label: '帮助中心'
  }, {
    label: '文档'
  }, {
    label: '路线图'
  }, {
    label: '变更日志'
  }]
}, {
  label: '功能',
  children: [{
    label: '合作伙伴'
  }, {
    label: '门户'
  }, {
    label: '职位'
  }, {
    label: '赞助商'
  }]
}, {
  label: '公司',
  children: [{
    label: '关于我们'
  }, {
    label: '定价'
  }, {
    label: '职位'
  }, {
    label: '博客'
  }]
}]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  toast.add({
    title: '已订阅!',
    description: '您已订阅我们的新闻通讯。'
  })
}
</script>

<template>
  <USeparator
    icon="i-simple-icons-nuxtdotjs"
    class="h-px"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <form @submit.prevent="onSubmit">
              <UFormField
                name="email"
                label="订阅我们的新闻通讯"
                size="lg"
              >
                <UInput
                  v-model="email"
                  type="email"
                  class="w-full"
                  placeholder="输入您的邮箱"
                >
                >
                  <template #trailing>
                    <UButton
                      type="submit"
                      size="xs"
                      color="neutral"
                      label="订阅"
                    />
                  </template>
                </UInput>
              </UFormField>
            </form>
          </template>
        </UFooterColumns>
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        使用 Nuxt UI 构建 • © {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <UButton
        to="https://go.nuxt.com/discord"
        target="_blank"
        icon="i-simple-icons-discord"
        aria-label="Nuxt 在 Discord 上"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://go.nuxt.com/x"
        target="_blank"
        icon="i-simple-icons-x"
        aria-label="X 上的 Nuxt"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://github.com/nuxt-ui-templates/saas"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="Nuxt UI 在 GitHub 上"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
