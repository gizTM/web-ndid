import React from "react";
import { Row, Col, Button, Label, FormGroup } from "reactstrap";
import { MENU } from "../../constants";
import { connect } from "react-redux";
import { callLoading } from "../../actions/formAction";
import { ClipLoader } from "react-spinners";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { post } from "../../services/webservice";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const mapStateToProps = state => {
  return {
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitClick: (event, value, loading) => {
      if (loading) {
        dispatch(callLoading(loading));

        post("/api/updateNode", {
          node_id: value.node_id,
          node_name: value.node_name,
          max_aal: value.max_aal,
          max_ial: value.max_ial
        })
          .then(data => {
            NotificationManager.success(
              "updating node succeeded",
              "Form submitted!"
            );
            dispatch(callLoading(false));
          })
          .catch(err => {
            console.log("err: ", JSON.stringify(err));
            NotificationManager.error(
              `Status code: ${err.response.status}
                err.response.data.message`,
              "Error updating node",
              5000
            );
            dispatch(callLoading(false));
          });
      }
    }
  };
};

class UpdateNodeForm extends React.Component {
  render() {
    const labelWidth = 5;
    const { loading, onSubmitClick } = this.props;
    const defaultValues = {
      max_aal: 1,
      max_ial: 1.1
    };

    return (
      <AvForm
        onValidSubmit={(event, value) => onSubmitClick(event, value, true)}
        onInvalidSubmit={(event, value) => onSubmitClick(event, value, false)}
        model={defaultValues}
      >
        <Label>{MENU.UPDATE_NODE}</Label>
        <hr />
        <FormGroup row key="node_id">
          <Label for="node_id" sm={labelWidth}>
            node_id
          </Label>
          <Col sm={12 - labelWidth}>
            <AvField name="node_id" type="text" required />
          </Col>
        </FormGroup>
        <FormGroup row key="node_name">
          <Label for="node_name" sm={labelWidth}>
            node_name
          </Label>
          <Col sm={12 - labelWidth}>
            <AvField name="node_name" type="text" required />
          </Col>
        </FormGroup>
        <FormGroup row key="max_aal">
          <Label for="max_aal" sm={labelWidth}>
            max_aal
          </Label>
          <Col sm={12 - labelWidth}>
            <AvField type="select" name="max_aal">
              <option>1</option>
              <option>2.1</option>
              <option>2.2</option>
              <option>3</option>
            </AvField>
          </Col>
        </FormGroup>
        <FormGroup row key="max_ial">
          <Label for="max_ial" sm={labelWidth}>
            max_ial
          </Label>
          <Col sm={12 - labelWidth}>
            <AvField type="select" name="max_ial">
              <option>1.1</option>
              <option>1.2</option>
              <option>1.3</option>
              <option>2.1</option>
              <option>2.2</option>
              <option>2.3</option>
              <option>3</option>
            </AvField>
          </Col>
        </FormGroup>
        <Row className="justify-content-center">
          <Button>Submit</Button>
          {loading ? (
            <span
              style={{
                marginLeft: "10px",
                display: "inline-block"
              }}
            >
              <ClipLoader color={"#ccc"} loading={loading} />
            </span>
          ) : (
            ""
          )}
        </Row>
        <NotificationContainer />
      </AvForm>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateNodeForm);
