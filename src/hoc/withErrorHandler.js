import React, { Component } from 'react'
import Modal from '../components/UI/Modal/Modal'
import Aux from './Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {error: null};

        constructor() {
            super();
            axios.interceptors.request.use( request => {
                this.setState({error: null}) //clear error messages whenever sending requests
                return request
            });
            axios.interceptors.response.use( res=>res, error => {
                this.setState({error: error})
                return Promise.reject(error)
            });
        }

        dismissError = () => this.setState({error: null})

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} cancelModal={this.dismissError}>
                        <div style={{textAlign: 'center'}}>
                            Oops! Something went wrong!<br />
                            Here is the error message:<br /><br />
                            <div style={{color: 'crimson', fontWeight: 'bold'}}>
                                "{this.state.error ? this.state.error.message : null}"
                            </div><br />
                        </div>
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;