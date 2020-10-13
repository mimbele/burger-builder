import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios'
import withErrorHandler from '../../hoc/withErrorHandler'

class Orders extends Component {
    state = {
        orders: [],
        isLoading: true
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
            this.setState({isLoading: false})
            console.log(error)
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
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios)