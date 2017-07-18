import fetch from 'isomorphic-fetch'
import {SHOW_ERROR} from '../modules/GlobalError'
import {api as API} from 'Config'

export const CALL_API = 'Symbol_Call_API'

export default store => next => action => {
  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  const {body, requestTypes, successTypes, failedTypes, params, token} = callAPI

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  requestTypes.forEach(t => {
    next(actionWith({type: t}))
  })

  return call(callAPI.api, body, params, token).then(
    response => {
      successTypes.forEach(t => {
        next(actionWith({
          type: t,
          response: response.body,
          status: response.status
        }))
      })
    },
    error => {
      var errors = {}
      if (error.body)
        formatErrors(error.body.errors, errors)

      failedTypes.forEach(t => {
        next(actionWith({
          type: t,
          status: error.status,
          errors: errors
        }))
      })


      if (error.status === 401) {
        next(actionWith({
          type: SHOW_ERROR,
          status: 401
        }))
      }
      if (error.status === 422) {
        next(actionWith({
          type: SHOW_ERROR,
          status: 422,
          response: error.body
        }))
      }
      if (error.status === 500) {
        console.debug(error.body)
        next(actionWith({
          type: SHOW_ERROR,
          status: 500
        }))
      }
      if (error.status === 402) {
        next(actionWith({
          type: SHOW_ERROR,
          status: 402
        }))
      }

    }
  )
}

function formatErrors(obj, errors = {}, key = '') {
  for (const ig in obj) {
    if (obj[ig].error) {
      for (const ie in obj[ig].error) {
        const error = obj[ig].error[ie]
        if (obj[ig].error[ie]) {
          key += obj[ig].error[ie].key
          for (const iv in error.value) {
            if (error.value[iv].message) {
              if (errors[key])
                errors[key].push(error.value[iv].message)
              else {
                errors[key] = [error.value[iv].message]
              }
            }
            else if (error.value[iv].error) {
              for (const ij in error.value[iv].error) {

                if (error.value[iv].error[ij].value) {
                  for (const ik in error.value[iv].error[ij].value) {
                    var key2 = error.value[iv].error[ij].key

                    var errors2 = {}

                    if (error.value[iv].error[ij].value[ik].message) {
                      if (errors2[key2])
                        errors2[key2].push(error.value[iv].error[ij].value[ik].message)
                      else {
                        errors2[key2] = [error.value[iv].error[ij].value[ik].message]
                      }
                    }
                    if (errors[key] && errors[key][error.value[iv].index])
                      errors[key][error.value[iv].index].push(errors2)
                    else {
                      //
                      if (errors[key]) {
                        errors[key][error.value[iv].index] = [errors2]
                      } else {
                        errors[key] = []
                        errors[key][error.value[iv].index] = [errors2]
                      }

                    }
                  }
                }
              }
//              formatErrors([error.value[iv]], errors, key + '[' + (error.value[iv].index - 1) + '].')
            }
          }
        }
        key = ''
      }
    }
  }
}

function call(api, body, params, token) {

  console.debug('ON CALL')
  console.debug(api)
  console.debug(body)

  if (api.config && api.config.headers && token) {
    api.config.headers.Token = token
  }

  let options = Object.assign({}, api.config)

  console.debug('ON CALLaaaaa')
  console.debug(options)

  let path = api.path
  if (params) {
    for (let key in params) {
      path = path.replace(new RegExp(':' + key, 'g'), params[key])
    }
  }

  if (body) {
    if (api.config.headers && /^application\/json/.test(api.config.headers['Content-Type']))
      options.body = JSON.stringify(body)
    else
      options.body = body
  }

  console.debug(options)
  console.debug('fetching')

  let url
  if (api.config.type == 'es') {
    url = API.esRoot + path
  } else {
    url = API.root + path
  }

  console.log(url)

  return fetch(url, options)
    .catch((e) => {
      console.log('Fetch Error Occurred')
      console.log(url)
      console.log(options)
      console.log(e)

      return Promise.reject({status: 500})
    })
    .then(response => {
        const type = response.headers.get("Content-Type")
        if (/^text\/plain.+/.test(type))
          return response.text().then(text => ({text, response}))
        else if (/^application\/json/.test(type)) {
          return response.json().then(json => ({json, response}))
        }
        else
          throw new Error()
      }
    )
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject({body: json, status: response.status})
      }
      return {body: json, status: response.status}
    })
}