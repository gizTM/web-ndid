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

const path = ['registerNode','setNodeToken','addNodeToken','reduceNodeToken','addNamespace','deleteNamespace','addService','deleteService']

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
        onSubmitClick: (loading) => {
            dispatch(callLoading(loading))
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
                    {/* <Input required type="text" name={i} id={i} onChange={(event) => onInputChange(event.target.value==='')} /> */}
                </Col>
            </FormGroup>
            )
        })

        return (
            // <Form action={'/api/'+path[this.props.labels]} method='post' style={{display: 'inline-block',padding: '50px'}}>
            // <Form style={{display: 'inline-block',padding: '50px'}} >
                // <Label>{menus[this.props.labels]}</Label>
                // <hr/>
                // {formRegister}
                // <Row className="justify-content-center">
                    // <Button type='submit' onClick={() => onSubmitClick(input)}>Submit</Button>
                    // {loading?<span  style={{marginLeft:'10px',display:'inline-block'}}><ClipLoader color={'#ccc'} loading={loading}/></span>:''}
                // </Row>
            // </Form>

            <Form action={'/api/'+path[this.props.labels]} method='post' style={{display: 'inline-block',padding: '50px'}}>
            <AvForm action={'/api/'+path[this.props.labels]} onValidSubmit={() => onSubmitClick(true)} onInvalidSubmit={() => onSubmitClick(false)}>
                <Label>{menus[this.props.labels]}</Label>
                <hr/>
                {formRegister}
                <Row className="justify-content-center">
                    <Button>Submit</Button>
                    {loading?<span  style={{marginLeft:'10px',display:'inline-block'}}><ClipLoader color={'#ccc'} loading={loading}/></span>:''}
                </Row>
            </AvForm>
            </Form>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(APIForm)