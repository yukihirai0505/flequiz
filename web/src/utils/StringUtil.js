import React from "react"
const regex = /(\r\n|[\r\n])/g
export const nl2br = (str) => {
  return str.split(regex).map(line => {
    return line.match(regex) ? <br/> : line
  })
}