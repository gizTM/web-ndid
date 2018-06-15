import React from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'

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

class APIForm extends React.Component {
    render() {
        const labelWidth = 5
        console.log('selected: '+this.props.labels+', labels: '+labels[this.props.labels])
        const formRegister = labels[this.props.labels].map((i,n) => {
            return (
            <FormGroup row key={n}>
                <Label for={i} sm={labelWidth}>{i}</Label>
                <Col sm={12-labelWidth}>
                    <Input type="text" name={i} id={i} />
                </Col>
            </FormGroup>
            )
        })

        return (
            <Form style={{display: 'inline-block'}}>
                {/* <Label>Fill parameters: </Label> */}
                {formRegister}
                <FormGroup check row>
                <Col sm={{ size: 10, offset: 2 }}>
                    <Button>Submit</Button>
                </Col>
                </FormGroup>
            </Form>
        )
    }
}

export default APIForm