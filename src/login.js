import { useState } from "react"
import { login_ } from "./store/slice/produits"
import { useDispatch } from "react-redux"


function Login(){
    const [Email, setEmail]=useState()
    const [password , setpassword]=useState()
    const dispach= useDispatch()

    function env(e){
        e.preventDefault()
      const  data={
            email:e.target.email.value,
            password:e.target.password.value
        }
        dispach(login_(data))
    }
    

    return(
      <div  className="Auth-form-container" >
      <form className="Auth-form" onSubmit={env}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
     
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    )
}
export default Login