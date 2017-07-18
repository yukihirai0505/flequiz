import React from'react'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'

/**
 * 画像フィールド
 */
export default class FieldFile extends React.Component {

  static propTypes = {
    formValue: PropTypes.object,
    handleFileChange: PropTypes.func,
    multiple: PropTypes.any,
    errors: PropTypes.any,
    meta: PropTypes.object,
  }

  /**
   * 画像の選択ハンドラー
   * @param files
   */
  handleSelect(files) {
    const {handleFileChange} = this.props
    handleFileChange(files)
  }

  render() {
    const {multiple, formValue,} = this.props

    // DropZoneコンポーネント用スタイル
    const divStyle = {
      width: 100 + '%',
      height: 200 + 'px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#e5e5e5',
      borderStyle: 'dashed',
      borderRadius: 5
    }
    const activeStyle = {
      opacity: 0.8,
      backgroundColor: '#f4f4f4'
    }
    const rejectStyle = {
      backgroundColor: '#fee7ec',
      borderColor: '#fdceda'
    }

    return (
      <div>
        {(() => {
          return (
            <Dropzone
              accept="image/jpg,image/jpeg"
              style={divStyle}
              activeStyle={activeStyle}
              rejectStyle={rejectStyle}
              onDropAccepted={this.handleSelect.bind(this)}
              multiple={multiple}
            >
              <div className="p-dropzone__text">
                アップロードするファイルをドロップ<br/>
                <span className="p-dropzone__text u-fz-12">または</span><br/>
                <span className="c-btn c-btn-default--flat">ファイルを選択</span>
              </div>
            </Dropzone>
          )
        })()}
        <div>
          <p>
            {formValue && formValue.source && formValue.source[0].name ?
              formValue && formValue.source && formValue.source[0].name :
              '選択されていません'
            }
          </p>
        </div>
      </div>
    )
  }
}
