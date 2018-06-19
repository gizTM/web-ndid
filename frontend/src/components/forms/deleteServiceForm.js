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
                fetch('/api/deleteService', {
                        service_id: value.service_id
                    }
                )
                // .then(response => 
                //     response.json()
                // )
                .then(response => 
                    console.log('res: '+response)
                ).then(data => {
                    NotificationManager.success('deleting service succeeded','Form submitted!')
                    dispatch(callLoading(false))
                }).catch(err => {
                    console.log('err: ',JSON.stringify(err))
                    NotificationManager.error('Status code: '+err.response.status+'\n'+err.response.data.message, 'Error deleting service',5000);
                    dispatch(callLoading(false))
                });
            }
        }
    }
}

class DeleteServiceForm extends React.Component {
    render() {
        const labelWidth = 5
        const { loading,onSubmitClick } = this.props

        return (
            <AvForm onValidSubmit={(event,value) => onSubmitClick(event,value,true)} onInvalidSubmit={(event,value) => onSubmitClick(false)}>
                <Label>{menus[7]}</Label>
                <hr/>
                <FormGroup row key='service_id'>
                    <Label for='service_id' sm={labelWidth}>service_id</Label>
                    <Col sm={12-labelWidth}>
                        <AvField name='service_id' type="text" required />
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

export default connect(mapStateToProps,mapDispatchToProps)(DeleteServiceForm)