import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', {
  state: () => ({
    message: '',
    code: 0
  }),
  actions: {
    setError(message: string, code: number = 0) {
      this.message = message
      this.code = code
    },
    clearError() {
      this.message = ''
      this.code = 0
    }
  }
})
