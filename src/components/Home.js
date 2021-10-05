import {React,useState} from 'react'
import { useHistory } from 'react-router';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Home = () => {
const [timeZone,setTimeZone]=useState("");
const [task,setTask]=useState([]);
const [isEdit,setEdit]=useState(false);
const [isClicked,setClicked]=useState(false);
const [currentId,setId]=useState("");
const history=useHistory();

const[Name,setName]=useState("")
const[date,setDate]=useState()
const save=()=>{
    const og=Date.parse(date)
        //console.log(moment(og).format('YYYY-MM-DD HH:mm:ss ZZ'));
    axios.put(`http://localhost:8080/task/${currentId}`,{
        "Task":Name,
        "DueDate":og,
        "Notified":false
    })
        .then(()=> window.location.reload())
        .catsh(err=>console.log(err))

    }
const get=()=>{
    setClicked(true)
    if(timeZone==="")
    {
    axios.get('http://localhost:8080/task')
    .then(res=>setTask(res.data))
    .catch(err=> console.log(err))
    }
    else{
        axios.get(`http://localhost:8080/task?time=${timeZone}`)
    .then(res=>setTask(res.data))
    .catch(err=> console.log(err))
    }

}
const del=(id)=>{
    axios.delete(`http://localhost:8080/task/${id}`)
        .then(()=> window.location.reload())
        .catsh(err=>console.log(err))

}
const edit=(id,name,date)=>{
    setEdit(true);
    setId(id);
    setName(name);
    setDate(date);
    
}
console.log(task);
    return (
        <div>
           TimeZone:<input type="text" value={timeZone} onChange={(e)=>setTimeZone(e.target.value)}/><button onClick={get}>Get all The tasks</button>
            {task.length>0 ?
            <table>
                <tr>
                    <th>Task</th>
                    <th>Due Date</th>
                    <th>Edit</th>
                    <th>Delete</th>

                </tr>
                
            {task.map(tt=>(
            <tr key={tt._id}>   
            <td >{tt.Task}</td>
            <td>{tt.DueDate}</td>
            <td><button onClick={()=>edit(tt._id,tt.Task,tt.DueDate)}>Edit</button></td>
            <td><button onClick={()=>del(tt._id)}>Delete</button></td>
            </tr>
                ))}
                </table>
            :<div>{task.length<=0 && isClicked ? 'There are no Task':""}</div>
            }
            {isEdit ?
            <div>
            Task:<input type="text" value={Name}  onChange={(e)=>setName(e.target.value)} required/> 
            Due Date:<input type="datetime-local" value={date} onChange={(e)=>setDate(e.target.value)} required/>

            <button onClick={save}>Add new ask</button> 

        </div>
        :<div></div>}
            <Link to="/post" >Add new Task</Link>
        </div>
    )
}

export default Home
