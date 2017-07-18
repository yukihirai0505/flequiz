export const validate = () => {
  let errors = {}
  return errors
}

const ErrorMessages = {
  required: "必須項目です。",
  email: "正しいメールアドレスの形式でご入力ください。",
  num: "半角数字(小数不可)で入力して下さい。",
  password: "英字、数字を組み合わせた8文字以上、16文字以内で入力してください。",
  confirm: "パスワードが一致しません",
  date: "2000-01-30の形式で入力してください。",
  minNumber: "数値が少なすぎます。",
  maxNumber: "数値が多すぎます。",
  url: "URLの形式が間違っています。 例：https://example.com",
  kana: "全角カタカナで入力してください。"
}

const Regex = {
  email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  num: /^[0-9]+$/,
  password: /^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/,
  date: /(\d{4}).?(\d{2}).?(\d{2}).*/,
  url: /^(https?)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/,
  kana: /^[\u30A0-\u30FF]+$/
}

export const kana = text => value => {
  if (value && !Regex.kana.test(value)) {
    return text ? text : ErrorMessages.kana
  }
}

export const required = text => value => {
  if (!value) {
    return text ? text : ErrorMessages.required
  }
}

export const email = text => value => {
  if (value && !Regex.email.test(value)) {
    return text ? text : ErrorMessages.email
  }
}

export const password = text => value => {
  if (value && !Regex.password.test(value)) {
    return text ? text : ErrorMessages.password
  }
}

export const confirm = ((password, text) => value => {
  if (value && value !== password) {
    return text ? text : ErrorMessages.confirm
  }
})

export const url = text => value => {
  if (value && !Regex.url.test(value)) {
    return text ? text : ErrorMessages.url
  }
}

export const num = text => value => {
  if (value && !Regex.num.test(value)) {
    return text ? text : ErrorMessages.num
  }
}

export const date = text => value => {
  if (value && !Regex.date.test(value)) {
    return text ? text : ErrorMessages.date
  }
}

export const minNumber = (min, text) => value => {
  if (value && value < min) {
    return text ? text : `${min}以上で入力してください。`
  }
}

export const maxNumber = (max, text) => value => {
  if (value && value > max) {
    return text ? text : `${max}以上で入力してください。`
  }
}

export const minLength = (min, text) => value => {
  if (value && value.length < min) {
    return text ? text : `${min}文字以上で入力してください。`
  }
}

export const maxLength = (max, text) => value => {
  if (value && value.length > max) {
    return text ? text : `${max}文字以内で入力してください。`
  }
}
