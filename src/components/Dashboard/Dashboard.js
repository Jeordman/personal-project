import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/userReducer'

class Dashboard extends Component {
    constructor(){
        super()

        this.state = {
            ey: 0
        }
    }

    componentDidMount() {
        if (!this.props.user.loggedIn) {
            this.props.getUser();
        }
    }

    render() {
        let { user, error, redirect } = this.props;
        console.log(this.props)
        console.log(user, error, redirect)
        if (error || redirect) return <Redirect to='/login' />
        if (!user.loggedIn) return <div>LOADING</div>
        return (
            <h1>DASH</h1>
        )
    }
}

function mapStateToProps(state) {
    return state.user
}

export default connect( mapStateToProps, { getUser })(Dashboard)