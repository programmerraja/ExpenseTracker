import React from 'react';

import PopupForm from '../PopupForm';
import "./style.css"

 function MonthForm({onClose,month,income,note,setMonth,setIncome,setNote,onAdd}){
    return (
        <PopupForm>
            <div className='TransactionForm'>
                <i  className='closeIcon fa-solid fa-xmark' onClick={onClose}></i>
                <div className='TransactionFormValue'>
                    <p >Enter the data </p>
                    <input type="text" placeholder='Month...' value={month} onChange={(e)=>{setMonth(e.target.value)}}/>
                    <input type="number" placeholder='Income...' value={income} onChange={(e)=>{setIncome(e.target.value)}}/>
                    <input type="text" placeholder='Note....'  value={note} onChange={(e)=>{setNote(e.target.value)}}/>
                    <input type="button" value="Add" onClick={onAdd}/>
                </div>
            </div>
        </PopupForm>
    )
}
export default MonthForm;

