import React from 'react';

import PopupForm from '../PopupForm';
import "./style.css"

 function TransactionForm({onClose,type,amount,income,note,setAmount,setType,setNote,onAdd,isEdit}){
    return (
        <PopupForm>
            <div className='TransactionForm'>
                <i  className='closeIcon fa-solid fa-xmark' onClick={onClose}></i>
                <div className='TransactionFormType'>
                    <p className={type==="INCOME"?'selected':""} onClick={()=>{setType("INCOME")}}>Income</p>
                    <p className={type==="EXPENSE"?'selected':""} onClick={()=>{setType("EXPENSE")}}>Expense</p>
                </div>
                <div className='TransactionFormValue'>
                    <input type="number" placeholder='Amount' value={amount} onChange={(e)=>{setAmount(e.target.value)}}/>
                    <input type="text" placeholder='Note...' value={note} onChange={(e)=>{setNote(e.target.value)}}/>
                    <input type="button" value={isEdit?"Update":"Add"} onClick={onAdd}/>
                </div>
            </div>
        </PopupForm>
    )
}
export default TransactionForm;

