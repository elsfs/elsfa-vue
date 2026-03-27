/**
 * 使用示例:
 * const { data, loading, error } = useApi('/api/hello')
 */
export function useApi<T>(url: string) {
  const data = ref<T | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  async function fetchData() {
    try {
      loading.value = true
      data.value = await $fetch<T>(url)
      error.value = null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  // 自动获取数据
  fetchData()

  return {
    data,
    loading,
    error,
    refresh: fetchData,
  }
}
