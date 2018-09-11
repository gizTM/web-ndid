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

        post("/api/setTimeoutBlockRegisterMqDestination", {
          blocks_to_timeout: value.blocks_to_timeout
        })
          .then(data => {
            NotificationManager.success(
              "setting timeout block register MQ destination succeeded",
              "Form submitted!"
            );
            dispatch(callLoading(false));
          })
          .catch(err => {
            NotificationManager.error(
              `Status code: ${err.response.status} - ${(err.response.data && err.response.data.message) || 'Unknown Error'}`,
              "Error setting timeout block register MQ destination",
              5000
            );
            dispatch(callLoading(false));
          });
      }
    }
  };
};

class SetTimeoutBlockForm extends React.Component {
  render() {
    const labelWidth = 5;
    const { loading, onSubmitClick } = this.props;

    return (
      <AvForm
        onValidSubmit={(event, value) => onSubmitClick(event, value, true)}
        onInvalidSubmit={(event, value) => onSubmitClick(event, value, false)}
      >
        <Label>{MENU.SET_TIMEOUT_BLOCK}</Label>
        <hr />
        <FormGroup row key="blocks_to_timeout">
          <Label for="blocks_to_timeout" sm={labelWidth}>
            blocks_to_timeout
          </Label>
          <Col sm={12 - labelWidth}>
            <AvField name="blocks_to_timeout" type="number" required />
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
)(SetTimeoutBlockForm);
