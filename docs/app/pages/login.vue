<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: '登录',
  description: '登录你的账户以继续'
})

const toast = useToast()

const fields = [{
  name: 'email',
  type: 'text' as const,
  label: '邮箱',
  placeholder: '输入你的邮箱',
  required: true
}, {
  name: 'password',
  label: '密码',
  type: 'password' as const,
  placeholder: '输入你的密码'
}, {
  name: 'remember',
  label: '记住我',
  type: 'checkbox' as const
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    toast.add({ title: 'Google', description: '使用 Google 登录' })
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    toast.add({ title: 'GitHub', description: '使用 GitHub 登录' })
  }
}]

const schema = z.object({
  email: z.email('邮箱格式无效'),
  password: z.string().min(8, '密码至少需要 8 个字符')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
}
</script>

<template>
  <UAuthForm
    :fields="fields"
    :schema="schema"
    :providers="providers"
    title="欢迎回来"
    icon="i-lucide-lock"
    @submit="onSubmit"
  >
    <template #description>
      还没有账户？<ULink
        to="/signup"
        class="text-primary font-medium"
      >立即注册</ULink>。
    </template>

    <template #password-hint>
      <ULink
        to="/"
        class="text-primary font-medium"
        tabindex="-1"
      >忘记密码？</ULink>
    </template>

    <template #footer>
      登录即表示你同意我们的<ULink
        to="/"
        class="text-primary font-medium"
      >服务条款</ULink>。
    </template>
  </UAuthForm>
</template>
