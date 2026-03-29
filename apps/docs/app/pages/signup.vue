<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  layout: 'auth'
})

useSeoMeta({
  title: '注册',
  description: '创建账户开始使用'
})

const toast = useToast()

const fields = [{
  name: 'name',
  type: 'text' as const,
  label: '姓名',
  placeholder: '输入你的姓名'
}, {
  name: 'email',
  type: 'text' as const,
  label: '邮箱',
  placeholder: '输入你的邮箱'
}, {
  name: 'password',
  label: '密码',
  type: 'password' as const,
  placeholder: '输入你的密码'
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
  name: z.string().min(1, '姓名是必填项'),
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
    title="创建账户"
    :submit="{ label: '创建账户' }"
    @submit="onSubmit"
  >
    <template #description>
      已有账户？<ULink
        to="/login"
        class="text-primary font-medium"
      >立即登录</ULink>。
    </template>

    <template #footer>
      注册即表示你同意我们的<ULink
        to="/"
        class="text-primary font-medium"
      >服务条款</ULink>。
    </template>
  </UAuthForm>
</template>
