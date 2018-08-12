import React from "react";
import { Row, Col, Button, FormGroup, Label } from "reactstrap";
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
        loading: state.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSubmitClick: (event, value, loading) => {
            if (loading) {
                dispatch(callLoading(loading));

                post("/api/registerNode", {
                    node_id: value.node_id,
                    node_name: value.node_name,
                    public_key: value.public_key,
                    master_public_key: value.master_public_key,
                    role: value.role,
                    max_aal: value.max_aal,
                    max_ial: value.max_ial
                })
                    .then(data => {
                        NotificationManager.success(
                            "registering node succeeded",
                            "Form submitted!"
                        );
                        dispatch(callLoading(false));
                    })
                    .catch(err => {
                        NotificationManager.error(
                            `Status code: ${err.response.status}
                            err.response.data.message`,
                            "Error registering node",
                            5000
                        );
                        dispatch(callLoading(false));
                    });
            }
        }
    };
};

class RegisterNodeForm extends React.Component {
    render() {
        const labelWidth = 5;
        const { loading, onSubmitClick } = this.props;
        const defaultValues = {
            role: "rp",
            max_aal: 1,
            max_ial: 1.1
        };

        return (
            <div>
                <AvForm
                    onValidSubmit={(event, value) =>
                        onSubmitClick(event, value, true)
                    }
                    onInvalidSubmit={(event, value) =>
                        onSubmitClick(event, value, false)
                    }
                    model={defaultValues}
                >
                    <Label>{MENU.REGISTER_NODE}</Label>
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
                    <FormGroup row key="master_public_key">
                        <Label for="master_public_key" sm={labelWidth}>
                            master_public_key
                        </Label>
                        <Col sm={12 - labelWidth}>
                            <AvField
                                name="master_public_key"
                                type="textarea"
                                required
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row key="role">
                        <Label for="rold" sm={labelWidth}>
                            role
                        </Label>
                        <Col sm={12 - labelWidth}>
                            {/* <AvField name='role' type="text" required /> */}
                            <AvField type="select" name="role">
                                <option>rp</option>
                                <option>idp</option>
                                <option>as</option>
                            </AvField>
                        </Col>
                    </FormGroup>
                    <FormGroup row key="max_aal">
                        <Label for="max_aal" sm={labelWidth}>
                            max_aal
                        </Label>
                        <Col sm={12 - labelWidth}>
                            {/* <AvField name='max_aal' type="number" required /> */}
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
                            {/* <AvField name='max_ial' type="number" required /> */}
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
                </AvForm>
                <NotificationContainer />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterNodeForm);
