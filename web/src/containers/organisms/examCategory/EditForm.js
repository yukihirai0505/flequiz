import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import FieldInput from "../../../components/atoms/field/FieldInput";
import {editExamCategory, showModal} from "../../../redux/modules/ExamCategory";
import * as validate from "../../../utils/Validate";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Edit extends Component {

  constructor() {
    super()
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    this.props.showModal(false)
  }

  buttonAction() {
    this.props.history.push('/admin/exam_category')
  }

  handleSubmit(data) {
    const id = this.props.match.params
    this.props.editExamCategory(data, id)
  }

  render() {
    const {handleSubmit, isShow} = this.props

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">編集</div>

              <form
                className="form-horizontal"
                onSubmit={this.handleSubmit}
              >
                <div className="card-block">
                  <Field
                    id="name"
                    component={FieldInput}
                    name="name"
                    type="text"
                    labelText="カテゴリー名"
                    placeholder="カテゴリー名を入力してください。"
                    errors={{}}
                    validate={[validate.required()]}
                  />
                </div>
                <div className="card-footer">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={handleSubmit(this.handleSubmit.bind(this))}
                  >
                    <i className="fa fa-dot-circle-o"/> Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Modal isOpen={isShow} className="modal-success">
          <ModalHeader>編集完了</ModalHeader>
          <ModalBody>
            カテゴリー編集完了致しました。
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.buttonAction.bind(this)}>OK</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isShow: state.examCategory.isShowCompleteModal
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {editExamCategory, showModal}), dispatch)
}

let EditExamCategoryForm = reduxForm({
  form: 'updateExamCategoryForm',
  enableReinitialize: true
})(Edit)

EditExamCategoryForm = connect(
  (state) => {
    return {
      initialValues: state.examCategory.editExamCategory
    }
  }
)(EditExamCategoryForm)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditExamCategoryForm))