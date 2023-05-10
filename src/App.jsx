
import { useEffect, useState } from 'react'
import './App.css'

function App() {
const [user,setUser] = useState([])

useEffect(()=>{
  fetch('http://localhost:5000/users')
  .then(res=>res.json())
  .then(data=>setUser(data))
},[])

const handleUser=event=>{
  event.preventDefault();
  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const user = {name,email}
  console.log(user)
  
  fetch('http://localhost:5000/users',{
    method:'POST',
    headers:{
      "content-type":"application/json",
    },
    body:JSON.stringify(user)
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data)

   const newUser = [...user,data]
   setUser(newUser)
   form.reset();
  
  })
}
  return (
    <>
     <h1>User client side is vary danger</h1>
     <h2>User number :{user.length}</h2>
      <form onSubmit={handleUser}>
        <input type="text" name="name" id="n" /><br />
        <input type="email" name="email" id="e" /><br />
        <input type="submit" value="Add User" />
      </form>
      <div>
        {
          user.map(user=><p key={user.id}>{user.id}:{user.name} {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
