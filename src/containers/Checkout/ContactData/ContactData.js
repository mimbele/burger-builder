import React, { Component } from 'react'
import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    order = () => {
        //
    }

    render(){
        return (
            <div className={styles.ContactData}>
                <h3>Please Enter Your Contact Information</h3>
                <form>
                    <input className={styles.Input} type='text' name='name' placeholder='Your Name: ' />
                    <input className={styles.Input} type='email' name='email' placeholder='Your Email: ' />
                    <p style={{textAlign: 'left'}}>Address:</p>
                    <input className={styles.Input} type='text' name='street' placeholder='Street: ' />
                    <input className={styles.Input} type='text' name='postal' placeholder='Postal Code: ' />
                    <Button clicked={this.order} btnType='Success'>Order</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;