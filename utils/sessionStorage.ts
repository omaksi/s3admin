module.exports = {
  set: (key: string, value: string) => {
    window.sessionStorage.setItem(key, value)
  },
  get: (key: string) => {
    return window.sessionStorage.getItem(key)
  },
  check: (key: string) => {
    if (window.sessionStorage.getItem(key)) {
      return true
    }
    return false
  },
  remove: (key: string) => {
    window.sessionStorage.removeItem(key)
  },
}
