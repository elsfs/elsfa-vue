<template>
  <UDropdownMenu
    v-slot="{ open }"
    :modal="false"
    :items="[{
      label: '入门模板',
      to: 'https://starter-template.nuxt.dev/'
    }, {
      label: '落地页',
      to: 'https://landing-template.nuxt.dev/'
    }, {
      label: '文档',
      to: 'https://docs-template.nuxt.dev/'
    }, {
      label: 'SaaS',
      to: 'https://saas-template.nuxt.dev/',
      color: 'primary',
      checked: true,
      type: 'checkbox'
    }, {
      label: '仪表盘',
      to: 'https://dashboard-template.nuxt.dev/'
    }, {
      label: '聊天',
      to: 'https://chat-template.nuxt.dev/'
    }, {
      label: '作品集',
      to: 'https://portfolio-template.nuxt.dev/'
    }, {
      label: '变更日志',
      to: 'https://changelog-template.nuxt.dev/'
    }]"
    :content="{ align: 'start' }"
    :ui="{ content: 'min-w-fit' }"
    size="xs"
  >
    <UButton
      label="SaaS"
      variant="subtle"
      trailing-icon="i-lucide-chevron-down"
      size="xs"
      class="-mb-[6px] font-semibold rounded-full truncate"
      :class="[open && 'bg-primary/15']"
      :ui="{
        trailingIcon: ['transition-transform duration-200', open ? 'rotate-180' : undefined].filter(Boolean).join(' ')
      }"
    />
  </UDropdownMenu>
</template>
