import React, {useState,useEffect}  from 'react';

import SquareLoader from "../../components/SquareLoader";
import MonthCard from '../../components/MonthCard';
import MonthForm from '../../components/MonthForm';

import errorHandler from "../../utils/errorHandler";
import API from '../../utils/API';

import "./style.css"
let dummydata=[{
    month:"June",
    income:"2000",
    spent:"3000",
    saving:"5000",
},{
    month:"June",
    income:"2000",
    spent:"3000",
    saving:"5000",
},{
    month:"June",
    income:"2000",
    spent:"3000",
    saving:"5000",
}
]

function Dashboard(){

    const [loading,setLoading]=useState(true);
    const [transactionMonths,setTransactionMonths]=useState([]);
    const [month,setMonth]=useState();
    const [income,setIncome]=useState();
    const [note,setNote]=useState();

    const [isMonthForm,setIsMonthForm]=useState(false);

    useEffect(()=>{
        API.getMonths().then((res)=>{
            setTransactionMonths(res.data.data);
            setLoading(false);
        })
    },[])
    
    function onAdd(){
        if(month && income){
            setLoading(true);
            API.addMonth({name:month,income,note}).then((res)=>{
                setTransactionMonths([...transactionMonths,res.data.data]);
                setLoading(false);
                setIsMonthForm(false);
                setMonth("")
                setIncome("")
                setNote("")

            })
        }else{
            alert("Give all")
        }
        
    }
    return (
        <>
            <SquareLoader  loading={loading} msg={"Please wait we getting data"}/>
            <div className='dashboard'>
                {isMonthForm && <MonthForm month={month}  income={income} note={note} setMonth={setMonth} setIncome={setIncome} setNote={setNote} onAdd={onAdd} onClose={()=>setIsMonthForm(false)}/>}
                <div className='header'>
                    <input type='text' placeholder='Search by month..'/>
                    <input type='button' value="create" onClick={()=>setIsMonthForm(true)}/>
                </div>
                <div className='month_cards'>
                        {transactionMonths.map((transaction)=><MonthCard {...transaction}/>)}
                </div>
            </div>
        </>
    )
}

export default Dashboard;
