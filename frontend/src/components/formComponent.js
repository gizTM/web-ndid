import React from 'react'
import APIForm from '../components/form'

class FormComponent extends React.Component {
    render() {
        console.log('form menu: '+this.props.menu)
        if(!this.props.menu===undefined) return <APIForm labels={this.props.menu} />
        else return <APIForm labels={0} />
    }
}

export default FormComponent