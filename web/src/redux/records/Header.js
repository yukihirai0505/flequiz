import {Record} from 'immutable'

const HeaderRecord = Record({dropDownOpen: false})

export default class Header extends HeaderRecord {

  setDropDownOpen(data) {
    return this.set('dropDownOpen', data)
  }
}