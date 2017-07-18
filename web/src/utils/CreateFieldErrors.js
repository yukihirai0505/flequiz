export function createFieldErrors(apiErrors, error, inputName, touched) {

  let fieldErrors = []
  let arg = ''
  replacementFormatElements(inputName)
  isDefined(apiErrors[0], arg)

  /**
   * フロント側validateのerrorを受け取ったらfieldErrorsにset
   */
  if (error && touched) {
    fieldErrors.push(error)
  }

  /**
   * エラーメッセージを探すargをフォーマット
   * @param key
   */
  function replacementFormatElements(key) {
    let pair = key.split('.')
    for (let i = 0; pair[i]; i++) {
      let kv = pair[i]
      if (kv.match(/\[[0-9]+\]/)) {
        kv = kv.replace(/[\[\]]/g, ".")
        arg += kv
      } else {
        if (pair.length === i + 1) {
          arg += kv
        } else {
          arg += kv + '.0.'
        }
      }
    }
  }

  /**
   * オブジェクトからargを検索
   * @param variable
   * @param key
   */
  function isDefined(variable, key) {
    if (variable === null) {
      return false
    }

    // keyが指定されていないか、variableが配列かオブジェクトでなければここで判定 ※注1
    if (typeof key === 'undefined' ||
      typeof variable === 'undefined' ||
      (Object.prototype.toString.apply(variable) !== '[object Object]' &&
      Object.prototype.toString.apply(variable) !== '[object Array]')
    ) {
      return typeof variable !== 'undefined'
    }

    // keyがstring か numberでなければエラー ※注2
    if (typeof key === 'string' ||
      typeof key === 'number' ||
      Object.prototype.toString.apply(key) === '[object String]' ||
      Object.prototype.toString.apply(key) === '[object Number]'
    ) {
      // 階層の中を判定していく
      let obj = variable,
        keyArr = (key).toString().split('.'),
        len = keyArr.length

      for (let i = 0; i < len; i++) {
        obj = obj[keyArr[i]]
        if (typeof obj === 'undefined') {
          return false
        }
      }
      if (obj[1] && obj[1].length > 0)
        fieldErrors.push(obj)
    }
  }

  return fieldErrors
}