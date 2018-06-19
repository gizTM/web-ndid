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

const NotificationSystem = require('react-notification-system')

const mapStateToProps = state => {
    return {
        loading: state.loading,
        notification: state.notification
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitClick: (event,value,loading,notificationSystem) => {
            if(loading) {
                dispatch(callLoading(loading))
                fetch('/api/setNodeToken', {
                        node_id: value.node_id,
                        amount: value.amount
                    }
                )
                // .then(response => {
                //     return response.json()
                // })
                .then(response => 
                    console.log('res: '+response)
                ).then(data => {
                    NotificationManager.success('setting node token succeeded','Form submitted!')
                    dispatch(callLoading(false))
                }).catch(err => {
                    console.log('err: ',JSON.stringify(err))
                    NotificationManager.error('Status code: '+err.response.status+'\n'+err.response.data.message, 'Error setting node token',5000);
                    dispatch(callLoading(false))
                });
            }
        }
    }
}

class SetNodeTokenForm extends React.Component {
    render() {
        const labelWidth = 5
        const { loading,onSubmitClick } = this.props

        return (
            <div>
                <AvForm onValidSubmit={(event,value) => onSubmitClick(event,value,true,this.refs.notiSystem)} onInvalidSubmit={(event,value) => onSubmitClick(false)}>
                    <Label>{menus[1]}</Label>
                    <hr/>
                    <FormGroup row key='node_id'>
                        <Label for='node_id' sm={labelWidth}>node_id</Label>
                        <Col sm={12-labelWidth}>
                            <AvField name='node_id' type="text" required />
                        </Col>
                    </FormGroup>
                    <FormGroup row key='amount'>
                        <Label for='amount' sm={labelWidth}>amount</Label>
                        <Col sm={12-labelWidth}>
                            <AvField name='amount' type="number" required />
                        </Col>
                    </FormGroup>
                    <Row className="justify-content-center">
                        <Button>Submit</Button>
                        {loading?<span  style={{marginLeft:'10px',display:'inline-block'}}><ClipLoader color={'#ccc'} loading={loading}/></span>:''}
                    </Row>
                </AvForm>
                <NotificationSystem ref='notiSystem' />
                <NotificationContainer />
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SetNodeTokenForm)