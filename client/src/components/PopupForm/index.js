import React from 'react';

import MonthCard from '../../components/MonthCard';
import "./style.css"

 function PopupForm({children}){
    return (
        <div className='popupForm'>
           {children}
        </div>
    )
}
export default PopupForm;

