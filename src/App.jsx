import React, { use, useContext, useEffect, useState } from "react";
import Login from "./Component/Auth/Login";
import EmployeeDashboard from "./Component/Dashboard/EmployeeDashboard";
import AdminDashboard from "./Component/Dashboard/AdminDashboard";
import { getLocalStorage, setLocalStorage } from "./Utils/LocalStorage";
import { AuthContext } from "./Context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData , setloggedInUserData] = useState(null)
   const [userData, setUserData] = useContext(AuthContext)

    useEffect(() => {
      const loggedInUser = localStorage.getItem('loggedInUser')
      if(loggedInUser){
        const userData = JSON.parse(loggedInUser)
        setUser(userData.role)
        setloggedInUserData(userData.data) 
      }
    },[])
  

  const handleLogin = (email, password) => {
    if (email == 'admin@me.com' && password == '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
    } else if (userData) {
      const employee = userData.find((e) => email == e.email && e.password == password)
      if (employee) {
        setUser('employee')
        setloggedInUserData(employee)
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee',data:employee }))
      }
    }
    else {
      alert("Invalid Credentials")
    }
  }
  // handleLogin('admin@me.com',123);
 
  
  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user == 'admin' ? <AdminDashboard changeUser={setUser}  /> : (user == 'employee' ? <EmployeeDashboard changeUser={setUser}  data={loggedInUserData} /> : null) }
    </>
  );
};

export default App;
