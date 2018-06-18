import React from 'react'
import { Row,Col, Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap'
import { menus } from './navMenu'
import { connect } from 'react-redux'
import { callLoading,updateInput } from '../actions/formAction'
import { ClipLoader } from 'react-spinners'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import  'react-notifications/lib/notifications.css'

const labels = [ 
    [ 'node_id','public_key','master_public_key','role','max_aal','max_ial' ],
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
        input: state.input,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInputChange: (value) => {
            dispatch(updateInput(value))
        },
        onSubmitClick: (event,value,loading,index) => {
            if(loading) {
                dispatch(callLoading(loading))
                console.log('body: '+JSON.stringify(value))
                switch (index) {
                    case 1:
                        fetch('/api/setNodeToken', {
                            node_id: value.node_id,
                            amount: value.amount
                        })
                        // .then(response => {
                        //     return response.json()
                        // })
                        .then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            NotificationManager.success('set node token succeded','Form submitted!')
                            dispatch(callLoading(false))
                        }).catch(err => {
                            NotificationManager.error(err, 'Error from server!');
                            dispatch(callLoading(false))
                        });
                        break
                    case 2:
                        fetch('/api/addNodeToken', {
                            node_id: value.node_id,
                            amount: value.amount
                        })
                        // .then(response => 
                        //     response.json()
                        // )
                        .then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            NotificationManager.success('add node token succeded','Form submitted!')
                            dispatch(callLoading(false))
                        }).catch(err => {
                            NotificationManager.error(err, 'Error from server!');
                            dispatch(callLoading(false))
                        });
                        break
                    case 3:
                        fetch('/api/reduceNodeToken', {
                            node_id: value.node_id,
                            amount: value.amount
                        })
                        // .then(response => 
                        //     response.json()
                        // )
                        .then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            NotificationManager.success('reduce node token succeded','Form submitted!')
                            dispatch(callLoading(false))
                        }).catch(err => {
                            NotificationManager.error(err, 'Error from server!');
                            dispatch(callLoading(false))
                        });
                        break
                    case 4:
                        fetch('/api/addNamespace', {
                            namespace: value.namespace,
                            description: value.description
                        })
                        // .then(response => 
                        //     response.json()
                        // )
                        .then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            NotificationManager.success('add namespace succeded','Form submitted!')
                            dispatch(callLoading(false))
                        }).catch(err => {
                            NotificationManager.error(err, 'Error from server!');
                            dispatch(callLoading(false))
                        });
                        break
                    case 5:
                        fetch('/api/deleteNamespace', {
                            namespace: value.namespace
                        })
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
                        break
                    case 6:
                        fetch('/api/addService', {
                            service_id: value.service_id,
                            service_name: value.service_name
                        })
                        // .then(response => 
                        //     response.json()
                        // )
                        .then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            NotificationManager.success('add service succeded','Form submitted!')
                            dispatch(callLoading(false))
                        }).catch(err => {
                            NotificationManager.error(err, 'Error from server!');
                            dispatch(callLoading(false))
                        });
                        break
                    case 7:
                        fetch('/api/deleteService', {
                            service_id: value.service_id
                        })
                        // .then(response => 
                        //     response.json()
                        // )
                        .then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            NotificationManager.success('delete service succeded','Form submitted!')
                            dispatch(callLoading(false))
                        }).catch(err => {
                            NotificationManager.error(err, 'Error from server!');
                            dispatch(callLoading(false))
                        });
                        break
                    default:
                        fetch('/api/registerNode', {
                            node_id: value.node_id,
                            public_key: value.public_key,
                            master_public_key: value.master_public_key,
                            role: value.role,
                            max_aal: value.max_aal,
                            max_ial: value.max_ial
                        })
                        // .then(response => 
                        //     response.json()
                        // )
                        .then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            NotificationManager.success('register node succeded','Form submitted!')
                            dispatch(callLoading(false))
                        }).catch(err => {
                            NotificationManager.error(err, 'Error from server!');
                            dispatch(callLoading(false))
                        });
                        break
                }
            }
        }
    }
}

class APIForm extends React.Component {
    render() {
        const labelWidth = 5
        const { input,loading,onInputChange,onSubmitClick } = this.props
        const formRegister = labels[this.props.labels].map((i,n) => {
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
            <AvForm onValidSubmit={(event,value) => onSubmitClick(event,value,true,this.props.labels)} onInvalidSubmit={(event,value) => onSubmitClick(event,value,false,this.props.labels)}>
                <Label>{menus[this.props.labels]}</Label>
                <hr/>
                {formRegister}
                <Row className="justify-content-center">
                    <Button>Submit</Button>
                    {loading?<span  style={{marginLeft:'10px',display:'inline-block'}}><ClipLoader color={'#ccc'} loading={loading}/></span>:''}
                </Row>
            <NotificationContainer />
            </AvForm> 
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(APIForm)