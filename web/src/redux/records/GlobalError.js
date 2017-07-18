import {Record} from 'immutable'

const GlobalErrorRecord = Record({errors: {}})

const errors = {
  401: {
    title: "エラー #401",
    messages: ["認証に失敗しました。ログアウトして再度ログインしてください。"]
  },
  402: {
    title: "エラー #402",
    messages: ["エラー402"]
  },
  422: {
    title: "エラー #422",
    messages: ["正しく処理されませんでした。入力をご確認の上、再度お試しください。"],
  },
  500: {
    title: "エラー #500",
    messages: ["一時的なエラーが発生しました。しばらくお待ち下さい。"],
  },
}

export default class GlobalError extends GlobalErrorRecord {

  getErrors(status) {
    return this.set('errors', errors[status])
  }

  getErrorMessages(message) {
    return this.set('errors', {title: 'エラー', message: message})
  }

  clear() {
    return this.set('errors', {})
  }
}