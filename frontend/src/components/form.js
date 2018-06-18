import React from 'react'
import { Row,Col, Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap'
import { menus } from './navMenu'
import { connect } from 'react-redux'
import { callLoading,updateInput } from '../actions/formAction'
import { ClipLoader } from 'react-spinners'
import { AvForm, AvField } from 'availity-reactstrap-validation'

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
                        fetch('/api/SetNodeToken', {
                            method: 'post',
                            dataType: 'json',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'applicaiton/json'
                            },
                            body: JSON.stringify({
                                node_id: String(value.node_id),
                                amount: String(value.amount)
                            })
                        }).then(response => 
                            response.json()
                        ).then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            alert('form submitted')
                        }).catch(err => {
                            alert('err from server: '+err)
                        });
                        break
                    case 2:
                        fetch('/api/AddNodeToken', {
                            method: 'post',
                            dataType: 'json',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'applicaiton/json'
                            },
                            body: JSON.stringify({
                                node_id: String(value.node_id),
                                amount: String(value.amount)
                            })
                        }).then(response => 
                            response.json()
                        ).then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            alert('form submitted')
                        }).catch(err => {
                            alert('err from server: '+err)
                        });
                        break
                    case 3:
                        fetch('/api/ReduceNodeToken', {
                            method: 'post',
                            dataType: 'json',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'applicaiton/json'
                            },
                            body: JSON.stringify({
                                node_id: String(value.node_id),
                                amount: String(value.amount)
                            })
                        }).then(response => 
                            response.json()
                        ).then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            alert('form submitted')
                        }).catch(err => {
                            alert('err from server: '+err)
                        });
                        break
                    case 4:
                        fetch('/api/AddNamespace', {
                            method: 'post',
                            dataType: 'json',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'applicaiton/json'
                            },
                            body: JSON.stringify({
                                namespace: String(value.namespace),
                                description: String(value.description)
                            })
                        }).then(response => 
                            response.json()
                        ).then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            alert('form submitted')
                        }).catch(err => {
                            alert('err from server: '+err)
                        });
                        break
                    case 5:
                        fetch('/api/DeleteNamespace', {
                            method: 'post',
                            dataType: 'json',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'applicaiton/json'
                            },
                            body: JSON.stringify({
                                namespace: String(value.namespace)
                            })
                        }).then(response => 
                            response.json()
                        ).then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            alert('form submitted')
                        }).catch(err => {
                            alert('err from server: '+err)
                        });
                        break
                    case 6:
                        fetch('/api/AddService', {
                            method: 'post',
                            dataType: 'json',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'applicaiton/json'
                            },
                            body: JSON.stringify({
                                service_id: String(value.service_id),
                                service_name: String(value.service_name)
                            })
                        }).then(response => 
                            response.json()
                        ).then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            alert('form submitted')
                        }).catch(err => {
                            alert('err from server: '+err)
                        });
                        break
                    case 7:
                        fetch('/api/AddService', {
                            method: 'post',
                            dataType: 'json',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'applicaiton/json'
                            },
                            body: JSON.stringify({
                                service_id: String(value.service_id)
                            })
                        }).then(response => 
                            response.json()
                        ).then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            alert('form submitted')
                        }).catch(err => {
                            alert('err from server: '+err)
                        });
                        break
                    default:
                        fetch('/api/RegisterNode', {
                            method: 'post',
                            dataType: 'json',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'applicaiton/json'
                            },
                            body: JSON.stringify({
                                node_id: String(value.node_id),
                                public_key: String(value.public_key),
                                master_public_key: String(value.master_public_key),
                                role: String(value.role),
                                max_aal: String(value.max_aal),
                                max_ial: String(value.max_ial)
                            })
                        }).then(response => 
                            response.json()
                        ).then(response => 
                            console.log('res: '+response)
                        ).then(data => {
                            alert('form submitted')
                        }).catch(err => {
                            alert('err from server: '+err)
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
            </AvForm> 
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(APIForm)