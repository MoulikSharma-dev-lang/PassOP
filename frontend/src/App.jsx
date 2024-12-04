import "./App.css"
import Navbar from "./components/Navbar"
import { useState, useEffect } from "react"
import Footer from "./components/Footer";
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [passwords, setPasswords] = useState([]);
  const [passwordForm, setPasswordForm] = useState({ site: "", username: "", password: "" });

  useEffect(() => {
    getPasswords()
  }, [])

  async function getPasswords() {
    let req = await fetch("http://localhost:3000/get")
    let res = await req.json()
    console.log(res)
    setPasswords(res.passwords)
  }

  async function hitApi(path, method, data, message) {
    let req = await fetch(path, { method: method, body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
    let res = await req.json()
    console.log(res)
    toast.success(message, {position: "top-right"})
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[90vh]">
        <h1 className="text-3xl font-bold text-center my-4">&lt; Pass<span className="text-green-300">OP</span> /&gt;</h1>
        <p className="text-center">Your own Password Manager</p>
        <br />
        <div>
          <form onSubmit={(e) => {
            e.preventDefault()
            if (!passwordForm.site || !passwordForm.username || !passwordForm.password) {
              toast.error("Please write all details!", {position: "top-right"})
            } else {
              hitApi("http://localhost:3000/create", "POST", passwordForm, "Password has been created! Refresh the page!")
            }
          }} className="text-center">
            <input value={passwordForm.site} onChange={(e) => { setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value }) }} placeholder="Enter website url" type="text" name="site" className="rounded-full w-[320px] border-2 border-green-400 px-3" />
            <br />
            <br />
            <input value={passwordForm.username} onChange={(e) => { setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value }) }} placeholder="Enter username" type="text" name="username" className="rounded-full w-[150px] border-2 border-green-400 px-3 mx-2" />
            <input value={passwordForm.password} onChange={(e) => { setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value }) }} placeholder="Enter password" type="password" name="password" className="rounded-full w-[150px] border-2 border-green-400 px-3 mx-2" />
            <br />
            <br />
            <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Save</button>
          </form>
        </div>
        <br />
        <div>
          {passwords.map((item, index) => {
            return <div className="text-center" key={index}>
              <hr />
              <br />
              <b>Url: </b> <p>{item.site}</p>
              <b>Username: </b> <p>{item.username}</p>
              <b>Password: </b> <p>{item.password}</p>
              <button className="bg-red-400 p-2 rounded-lg text-xl font-bold" onClick={() => { hitApi("http://localhost:3000/delete", "DELETE", { id: item._id }, "Password has been deleted! Refresh the page!") }}>Delete</button>
              <br />
              <br />
            </div>
          })}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App