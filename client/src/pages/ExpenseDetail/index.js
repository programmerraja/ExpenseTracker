import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import TransactionForm from "../../components/TransactionForm";
import SquareLoader from "../../components/SquareLoader";

import API from "../../utils/API";

import "./style.css";
import { setRandomFallback } from "bcryptjs";

function ExpenseDetail() {
  
  const [loading,setLoading]=useState(true);
  const [transactions, setTransactions] = useState([]);
  const [transactionId, setTransactionId] = useState()

  const [month, setMonth] = useState({});
  const [isTransactionForm, setIsTransactionForm] = useState(false);
  const [isEdit,setIsEdit]=useState(false);
 
  const [amount,setAmount]=useState();
  const [type,setType]=useState("INCOME");
  const [note,setNote]=useState();

  const { monthId } = useParams();

  useEffect(() => {
    API.getTransactions(monthId).then((res) => {
      setTransactions(res.data.data.transactions);
      setMonth(res.data.data.month);
      setLoading(false)
    });
  }, []);

  function doCalculation(type,month,amount,isAdd=false){
    let expense=month.expense,balance=month.balance,income=month.income;
    if(type==="EXPENSE" ){
        if(isAdd){
            expense=month.expense>=0?parseInt(month.expense)+parseInt(amount):amount
            balance=parseInt(month.balance)-parseInt(amount)
        }else{
            expense=month.expense>0?parseInt(month.expense)-parseInt(amount):amount
            balance=parseInt(month.balance)+parseInt(amount)
        }
   }else{
        if(isAdd){
            income=month.income>0?parseInt(month.income)+parseInt(amount):amount
            balance=parseInt(month.balance)+parseInt(amount)
        }else{
            income=month.income>0?parseInt(month.income)-parseInt(amount):amount
            balance=parseInt(month.balance)-parseInt(amount)   
        }
   }
   return [income,balance,expense]
  }

  function onAdd(){
    if(amount && type && note){
        setLoading(true);
        let oldTransaction,newTransactions=[];
        transactions.map((tr)=>{
            if(tr._id===transactionId){
                oldTransaction=tr;
            }else{
                newTransactions.push(tr)
            }
        });
        
        if(isEdit){
            //first delete  or sub  the old transaction
            let [income,balance,expense]=doCalculation(oldTransaction.type,month,oldTransaction.amount);
            //update the old transaction with new one 
            let newMonth={...month,income,balance,expense};
            //now add the edited transaction 
            [income,balance,expense]=doCalculation(type,newMonth,amount,true);
            newTransactions.push({_id:oldTransaction._id,note,amount,monthId:oldTransaction.monthId,type})
            API.editTransaction({id:oldTransaction._id,amount,type,note,monthId,income:income,expense,balance}).then((res)=>{
                setTransactions(newTransactions);
                setMonth({...month,expense,income,balance})
                setAmount("");
                setNote("");
                setType("INCOME");
                setLoading(false);
                setIsEdit(false)
                setIsTransactionForm(false)
            })
        }
        else{
            let [income,balance,expense]=doCalculation(type,month,amount,true);
            API.addTransaction({amount,type,note,monthId,income:income,expense,balance}).then((res)=>{
                setTransactions([...transactions,res.data.data]);
                setMonth({...month,expense,income,balance})
                setAmount("");
                setNote("");
                setType("INCOME");
                setLoading(false);
                setIsTransactionForm(false)
            })
        }

       
    }else{
        alert("Give all")
    }
}
function onDeleteTransaction(transaction){
    let [income,balance,expense]=doCalculation(transaction.type,month,transaction.amount);
    API.deleteTransaction({id:transaction._id,amount,type,monthId,income,expense,balance}).then(res=>{
        let newTransactions=transactions.filter((trans)=>{if(trans._id!==transaction._id)return trans})
        setTransactions(newTransactions);
        setMonth({...month,expense,income,balance})
        console.log(res)
    })
}

function showEdit(transaction){
    setAmount(transaction.amount);
    setNote(transaction.note);
    setType(transaction.type);
    setIsTransactionForm(true);
    setTransactionId(transaction._id);
    setIsEdit(true)
}
  return (
    <>
      <i class="fa-solid fa-circle-plus addIcon" onClick={()=>{setIsTransactionForm(true)}}></i>
      <SquareLoader  loading={loading} msg={"Please wait we getting data"}/>
      {isTransactionForm && <TransactionForm amount={amount}  type={type} note={note} setAmount={setAmount} setType={setType} setNote={setNote} onAdd={onAdd} onClose={()=>setIsTransactionForm(false)} isEdit={isEdit}/>}
      <div className="expenseDetail">
        <div className="expenseBalance">
          <h4>Your Balance</h4>
          <h1>{month.balance ?month.balance : month.income}</h1>
        </div>

        <div className="expenseIncome">
          <div>
            <h4>Income</h4>
            <p className="money plus">{month.income}</p>
          </div>
          <div>
            <h4>Expense</h4>
            <p className="money minus">{month.expense?month.expense:0}</p>
          </div>
        </div>
        {!loading && 
            <div className="transaction">
            <h2>Incomes:</h2>
            <ul>
                {transactions.map((transaction)=>{
                    if(transaction.type==="INCOME"){
                        return (
                            <li>
                                {transaction.amount} {"->"} {transaction.note}
                                <div className="transactionIcons">
                                    <i class="fas fa-edit" onClick={()=>{showEdit(transaction)}}></i>
                                    <i class="fa-solid fa-trash-can" onClick={()=>onDeleteTransaction(transaction)}></i>   
                                </div>
                            </li>
                            )
                    }
                    })}
                </ul>
            <h2>Expense:</h2>
            <ul>{transactions.map((transaction)=>{
                    if(transaction.type==="EXPENSE"){
                        return (
                            <li>
                                {transaction.amount} {"->"} {transaction.note}
                                <div className="transactionIcons">
                                    <i class="fas fa-edit" onClick={()=>{showEdit(transaction)}}></i>
                                    <i class="fa-solid fa-trash-can" onClick={(event)=>onDeleteTransaction(transaction)}></i>   
                                </div>
                            </li>
                        )
                    }
                    })}
                </ul>
            </div>
        }
      </div>
    </>
  );
}
export default ExpenseDetail;
