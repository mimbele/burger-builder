import React, { Component } from 'react'
import axios from '../../axios'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import { fetchOrders } from '../../store/actions/order'

class Orders extends Component {

    componentDidMount () {
        this.props.fetchOrders()
    }

    render() {
        return (
            <div>
                {this.props.orders.map( order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price} />
                ))}
                {this.props.isLoading ? <Spinner /> : null}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    orders: state.orders.orders,
    isLoading: state.orders.isLoading
})

const mapDispatchToProps = (dispatch) => ({
    fetchOrders: () => dispatch(fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))