import React from "react";
import { Row, Col, Button, Label, FormGroup } from "reactstrap";
import { MENU } from '../../constants'
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
        loading: state.loading,
        notification: state.notification
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitClick: (event, value, loading) => {
            if (loading) {
                dispatch(callLoading(loading));                

                post("/api/initNDID", {
                    public_key: value.public_key
                })
                    .then(data => {
                        NotificationManager.success(
                            "initiating NDID succeeded",
                            "Form submitted!"
                        );
                        dispatch(callLoading(false));
                    })
                    .catch(err => {
                        NotificationManager.error(
                            `Status code: ${err.response.status}
                            err.response.data.message`,
                            "Error initiating NDID",
                            5000
                        );
                        dispatch(callLoading(false));
                    });
            }
        }
    };
};

class InitNDIDForm extends React.Component {
    render() {
        const labelWidth = 5;
        const { loading, onSubmitClick } = this.props;

        return (
            <div>
                <AvForm
                    onValidSubmit={(event, value) =>
                        onSubmitClick(event, value, true)
                    }
                    onInvalidSubmit={(event, value) =>
                        onSubmitClick(event, value, false)
                    }
                >
                    <Label>{MENU.INIT_NDID}</Label>
                    <hr />
                    <FormGroup row key="public_key">
                        <Label for="public_key" sm={labelWidth}>
                            public_key
                        </Label>
                        <Col sm={12 - labelWidth}>
                            <AvField
                                name="public_key"
                                type="textarea"
                                required
                            />
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
                </AvForm>
                <NotificationContainer />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InitNDIDForm);
