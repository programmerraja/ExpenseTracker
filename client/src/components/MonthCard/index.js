import React from 'react';
import {Link} from 'react-router-dom'
import "./style.css"

 function MonthCard({_id,name,income,expense,note,balance,onDelete}){
    return (
        <div className='month_card'>
           
           <h1>{name}</h1>
           <p>Income:{income}</p>
           <p>Expense:{expense!==undefined?expense:0}</p>
           <p>Balance:{balance!==undefined?balance:income}</p>
           <p>{income==expense?"Oh you bad at saving":income>expense?"Spend wisely":"You Fool"}</p>
           <Link to={`/transaction/${_id}`}>
            <button >View</button>
           </Link>
           <div className='footer'>
                <i class="fas fa-edit"  ></i>
                <i class="fa-solid fa-trash-can" onClick={()=>{onDelete(_id)}}></i>   
            </div>
        </div>
    )
}
export default MonthCard;
