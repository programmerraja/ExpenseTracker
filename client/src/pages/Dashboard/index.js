import React, {useState,useEffect}  from 'react';

import SquareLoader from "../../components/SquareLoader";
import MonthCard from '../../components/MonthCard';
import MonthForm from '../../components/MonthForm';

import errorHandler from "../../utils/errorHandler";
import API from '../../utils/API';

import "./style.css"

function Dashboard(){

    const [loading,setLoading]=useState(true);
    const [searchText,setSearchtext]=useState("")
    const [transactionMonths,setTransactionMonths]=useState([]);
    const [month,setMonth]=useState();
    const [income,setIncome]=useState();
    const [note,setNote]=useState();
    const [isEdit,setIsEdit]=useState(false);
    const [monthId,setMonthId]=useState()

    const [isMonthForm,setIsMonthForm]=useState(false);

    useEffect(()=>{
        API.getMonths().then((res)=>{
            console.log(res.data.data)
            setTransactionMonths(res.data.data);
            setLoading(false);
        })
    },[])
    
    function onAdd(){
        if(month && income){
            setLoading(true);
            let apiProm;
            if(!isEdit){
                apiProm=API.addMonth({name:month,income,note})
            }else{
                apiProm=API.editMonth(monthId,{name:month,income,note})
            }
           
            apiProm.then((res)=>{
                if(!isEdit){
                    setTransactionMonths([...transactionMonths,res.data.data]);
                }else{
                    setTransactionMonths([res.data.data]);
                    setIsEdit(false)
                }
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
    function onDelete(monthId){
        let res=prompt("Did you really want to delete")
        if(res){
            API.deleteMonth(monthId).then((res)=>{
                let newMonth=transactionMonths.filter((m)=>{if(m._id!==monthId){return m}})
                setTransactionMonths(newMonth)
            })
        }
    }

    function showEdit(id,month,icome,note){
        setIncome(icome);
        setMonth(month);
        setNote(note);
        setMonthId(id);
        setIsEdit(true)
    }
    return (
        <>  
            <SquareLoader  loading={loading} msg={"Please wait we adding your data"}/>
            <div className='dashboard'>
                 <i class="fa-solid fa-circle-plus addIcon" onClick={()=>{setIsMonthForm(true)}}></i>
                <h1 className='dashboardTitle'>Expense Tracker</h1>
                {(isMonthForm || isEdit) && <MonthForm month={month}  income={income} note={note} setMonth={setMonth} setIncome={setIncome} setNote={setNote} onAdd={onAdd} onClose={()=>setIsMonthForm(false)} isEdit={isEdit} />}
                <div className='header'>
                    <input type='text' placeholder='Search by month..' value={searchText} onChange={(e)=>setSearchtext(e.target.value)}/>
                </div>
                <div className='month_cards'>
                    {transactionMonths.map((transaction)=>{
                        if(!transaction.ishidden){
                            return <MonthCard {...transaction} onDelete={onDelete} showEdit={showEdit}/>
                        }
                    })}
                </div>
            </div>
        </>
    )
}

export default Dashboard;
