import moment from 'moment'
import {React,useState} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'

const Post = () => {
    const history=useHistory();
    const[task,setTask]=useState("")
    const[date,setDate]=useState()
    const save=()=>{
        const og=Date.parse(date)
        //console.log(moment(og).format('YYYY-MM-DD HH:mm:ss ZZ'));
        axios.post('http://localhost:8080/task',{
            "Task":task,
            "DueDate":og,
            "Notified":false
        })
        .then(()=>history.push("/"))
        .catch(err=>console.log(err))

    }
    return (
        
        <div >
            <div>Task:<input type="text" value={task} onChange={(e)=>setTask(e.target.value)} required/> </div>
            <div>Due Date:<input type="datetime-local" value={date} onChange={(e)=>setDate(e.target.value)} required/></div>
            <button className="button1" onClick={save}>Add new ask</button> 

        </div>
        
    )
}

export default Post
