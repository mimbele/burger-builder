import React, { Component } from 'react'

import Aux from '../../hoc/Auxiliary'

class BurgerBuilder extends Component {
    render(){
        return(
            <Aux>
                <div>Burger Graphical representation</div>
                <div>Build Controls</div>
            </Aux>
        );
    }
}

export default BurgerBuilder;