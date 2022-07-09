import React from 'react';
import {Link} from 'react-router-dom'
import "./style.css"

 function MonthCard({_id,name,income,expense,note,balance}){
    return (
        <div className='month_card'>
           <h1>{name}</h1>
           <p>Income:{income}</p>
           <p>Expense:{expense?expense:0}</p>
           <p>Balance:{balance?balance:income}</p>
           <p>Proverd if saved enough say good</p>
           <Link to={`/transaction/${_id}`}>
            <button >View</button>
           </Link>
        </div>
    )
}
export default MonthCard;
