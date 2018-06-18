import React from 'react'
import { Row,Col, Button, Label, FormGroup} from 'reactstrap'
import { menus } from '../navMenu'
import { connect } from 'react-redux'
import { callLoading } from '../../actions/formAction'
import { ClipLoader } from 'react-spinners'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { fetch } from '../../services/webservice'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import  'react-notifications/lib/notifications.css'

const mapStateToProps = state => {
    return {
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitClick: (event,value,loading,notificationSystem) => {
            if(loading) {
                dispatch(callLoading(loading))
                fetch('/api/deleteNamespace', {
                        namespace: value.namespace
                    }
                )
                // .then(response => 
                //     response.json()
                // )
                .then(response => 
                    console.log('res: '+response)
                ).then(data => {
                    NotificationManager.success('delete namespace succeded','Form submitted!')
                    dispatch(callLoading(false))
                }).catch(err => {
                    NotificationManager.error(err, 'Error from server!');
                    dispatch(callLoading(false))
                });
            }
        }
    }
}

class DeleteNamespaceForm extends React.Component {
    render() {
        const labelWidth = 5
        const { loading,onSubmitClick } = this.props

        return (
            <AvForm onValidSubmit={(event,value) => onSubmitClick(event,value,true)} onInvalidSubmit={(event,value) => onSubmitClick(false)}>
                <Label>{menus[5]}</Label>
                <hr/>
                <FormGroup row key='namespace'>
                    <Label for='namespace' sm={labelWidth}>namespace</Label>
                    <Col sm={12-labelWidth}>
                        <AvField name='namespace' type="text" required />
                    </Col>
                </FormGroup>
                <Row className="justify-content-center">
                    <Button>Submit</Button>
                    {loading?<span  style={{marginLeft:'10px',display:'inline-block'}}><ClipLoader color={'#ccc'} loading={loading}/></span>:''}
                </Row>
                <NotificationContainer/>
            </AvForm> 
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DeleteNamespaceForm)