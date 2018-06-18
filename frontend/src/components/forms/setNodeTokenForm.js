import React from 'react'
import { Row,Col, Button, Label, FormGroup} from 'reactstrap'
import { menus } from '../navMenu'
import { connect } from 'react-redux'
import { callLoading } from '../../actions/formAction'
import { ClipLoader } from 'react-spinners'
import { AvForm, AvField } from 'availity-reactstrap-validation'
import { fetch } from '../../services/webservice'

const NotificationSystem = require('react-notification-system')

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
        loading: state.loading,
        notification: state.notification
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitClick: (event,value,loading,notificationSystem) => {
            if(loading) {
                dispatch(callLoading(loading))
                const form = new FormData()
                fetch('/api/setNodeToken', {
                        node_id: value.node_id,
                        amount: value.amount
                    }
                )
                // .then(response => {
                //     return response.json()
                // })
                .then(response => {
                    console.log('res: '+response)
                }).then((data) => {
                    // notificationSystem.addNotification({
                    //     message: 'form submitted',
                    //     level: 'success',
                    //     position: 'tc'
                    // })
                    alert('form submitted')
                    dispatch(callLoading(false))
                }).catch(err => {
                    alert('err from server: '+err)
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
        const formRegister = labels[1].map((i,n) => {
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
                <AvForm onValidSubmit={(event,value) => onSubmitClick(event,value,true,this.refs.notiSystem)} onInvalidSubmit={(event,value) => onSubmitClick(false)}>
                    <Label>{menus[1]}</Label>
                    <hr/>
                    {formRegister}
                    <Row className="justify-content-center">
                        <Button>Submit</Button>
                        {loading?<span  style={{marginLeft:'10px',display:'inline-block'}}><ClipLoader color={'#ccc'} loading={loading}/></span>:''}
                    </Row>
                </AvForm>
                <NotificationSystem ref='notiSystem' />
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SetNodeTokenForm)