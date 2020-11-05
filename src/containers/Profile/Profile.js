import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { Redirect } from 'react-router-dom'
import styles from './Profile.module.css'
import Button from '../../components/UI/Button/Button'
import { logOut } from '../../store/actions/auth'

class Profile extends Component {

    logout = () => {
        this.props.logout()
        this.props.history.push('/')
    }

    render() {
        console.log(this.props)
        return (
            <div className={styles.Profile}>
                <h4>This is Your Profile</h4>
                <Button clicked={this.logout()} btnType='Danger'>Logout</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logOut())
})

export default connect(null, mapDispatchToProps)(Profile)