import React from 'react'
import Momment from 'react-moment'
function DateFormater({ date }) {
    return (
        <Momment format='D MMM YYYY' withTitle >
            {date}
        </Momment>
    )
}

export default DateFormater