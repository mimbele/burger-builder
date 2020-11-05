import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import styles from './Profile.module.css'
import Button from '../../components/UI/Button/Button'
import { logout } from '../../store/actions/auth'

class Profile extends Component {

    state = { logout: false }

    logout = () => {
        this.setState({logout:true})
        this.props.logout()
    }

    render() {
        return (
            <div className={styles.Profile}>
                <h4>This is Your Profile</h4>
                <Button clicked={this.logout} btnType='Danger'>Logout</Button>
                {this.state.logout ? <Redirect to='/'/> : null}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Profile)