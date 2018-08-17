import React from 'react'
import PropTypes from 'prop-types'

const Price = ({price}) => {
    return(
        <span className="ui green ribbon label">${price/100}</span>
    )
}

Price.propTypes = {
    price: PropTypes.number.isRequired
}

export default Price;