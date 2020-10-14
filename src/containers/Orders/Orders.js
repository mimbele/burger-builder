import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios'
import withErrorHandler from '../../hoc/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    state = {
        orders: [],
        isLoading: true,
        loadingDataError: false
    }

    componentDidMount () {
        axios.get('/orders.json')
        .then(response => {
            this.setState({isLoading: false})
            const orders = []
            for (let orderKey in response.data){
                orders.push({
                    ...response.data[orderKey],
                    id: orderKey
                })
            }
            this.setState({orders: orders})
        })
        .catch(error => {
            this.setState({isLoading: false, loadingDataError: true})
        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map( order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} />
                ))}
                {this.state.isLoading ? <Spinner /> : null}
                {this.state.loadingDataError ? <p>Data can't be loaded! :/</p> : null}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios)