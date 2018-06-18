import React from 'react'
import { Row,Col, Button, FormGroup, Label } from 'reactstrap'
import { menus } from '../navMenu'
import { connect } from 'react-redux'
import { callLoading } from '../../actions/formAction'
import { ClipLoader } from 'react-spinners'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { fetch } from '../../services/webservice'
import {NotificationContainer, NotificationManager} from 'react-notifications';

const labels = [ 
    [ ['text','text','text','text','number','number'],['node_id','public_key','master_public_key','role','max_aal','max_ial'] ],
    [ 'node_id', 'amount' ],
    [ 'node_id', 'amount' ],
    [ 'node_id', 'amount' ],
    [ 'namespace', 'description' ],
    [ 'namespace' ],
    [ 'service_id', 'service_name' ],
    [ 'service_id' ]
]

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
                fetch('/api/registerNode', {
                        node_id: value.node_id,
                        public_key: value.public_key,
                        master_public_key: value.master_public_key,
                        role: value.role,
                        max_aal: value.max_aal,
                        max_ial: value.max_ial
                    }
                )
                // .then(response => 
                //     response.json()
                // )
                .then(response => 
                    console.log('res: '+response)
                ).then((data) => {
                    // notificationSystem.addNotification({
                    //     message: 'form submitted',
                    //     level: 'success',
                    //     position: 'tc'
                    // })
                    alert('form submitted')
                    NotificationManager.success('register node succeded','Form submitted!')
                    dispatch(callLoading(false))
                }).catch(err => {
                    alert('err from server: '+err)
                    dispatch(callLoading(false))
                });
            }
        }
    }
}

class RegisterNodeForm extends React.Component {
    render() {
        const labelWidth = 5
        const { loading,onSubmitClick } = this.props
        const formRegister = labels[0].map((i,n) => {
            return (
            <FormGroup row key={n}>
                <Label for={i} sm={labelWidth}>{i}</Label>
                <Col sm={12-labelWidth}>
                    <AvField name={i} type="text" required />
                </Col>
            </FormGroup>
            )
        })

        return (
            <div>
            <AvForm onValidSubmit={(event,value) => onSubmitClick(event,value,true,this.refs.notificationSystem)} onInvalidSubmit={(event,value) => onSubmitClick(event,value,false,this.props.labels)}>
                <Label>{menus[0]}</Label>
                <hr/>
                {/* {formRegister} */}
                <FormGroup row key='node_id'>
                    <Label for='node_id' sm={labelWidth}>node_id</Label>
                    <Col sm={12-labelWidth}>
                        <AvField name='node_id' type="text" required />
                    </Col>
                </FormGroup>
                <FormGroup row key='public_key'>
                    <Label for='public_key' sm={labelWidth}>public_key</Label>
                    <Col sm={12-labelWidth}>
                        <AvField name='public_key' type="text" required />
                    </Col>
                </FormGroup>
                <FormGroup row key='master_public_key'>
                    <Label for='master_public_key' sm={labelWidth}>master_public_key</Label>
                    <Col sm={12-labelWidth}>
                        <AvField name='master_public_key' type="text" required />
                    </Col>
                </FormGroup>
                <FormGroup row key='role'>
                    <Label for='rold' sm={labelWidth}>role</Label>
                    <Col sm={12-labelWidth}>
                        <AvField name='role' type="text" required />
                    </Col>
                </FormGroup>
                <FormGroup row key='max_aal'>
                    <Label for='max_aal' sm={labelWidth}>max_aal</Label>
                    <Col sm={12-labelWidth}>
                        <AvField name='max_aal' type="number" required />
                    </Col>
                </FormGroup>
                <FormGroup row key='max_ial'>
                    <Label for='max_ial' sm={labelWidth}>max_ial</Label>
                    <Col sm={12-labelWidth}>
                        <AvField name='max_ial' type="number" required />
                    </Col>
                </FormGroup>
                <Row className="justify-content-center">
                    <Button>Submit</Button>
                    {loading?<span  style={{marginLeft:'10px',display:'inline-block'}}><ClipLoader color={'#ccc'} loading={loading}/></span>:''}
                </Row>
            </AvForm>
            <notificationSystem ref='notificationSystem'/>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterNodeForm)