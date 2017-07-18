import {Record} from 'immutable'

const RankingRecord = Record({list: [{}], hiddenCommand: ""})

export default class Ranking extends RankingRecord {

  setRanking(data) {
    return this.set('list', data)
  }

  setHiddenCommand(data) {
    return this.set('hiddenCommand', data)
  }

}
