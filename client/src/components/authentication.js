import { useState } from "react"
import ReactLoading from "react-loading"

function Authentication() {
  // State variables for the username and password fields in the sign up form
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // State variables for the username and password fields in the sign in form
  const [usernameLogin, setUsernameLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')
  // State variable for the sign up/sign in toggle 
  const [showLogin, setShowLogin] = useState(false)
  // State variable for the message that appears after the user signs up
  const [message, setMessage] = useState('')
  // State variable for the loading animation
  const [loading, setLoading] = useState(false)
  // State variable for the login status
  const [loginStatus, setLoginStatus] = useState(false)

  async function register() {
    try {
      await fetch("http://localhost:8800/register", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors"
        }
      }).then(data => {
        setMessage(data)
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  async function login() {
    try {
      fetch("http://localhost:8800/login", {
        method: "POST",
        body: JSON.stringify({
          username: usernameLogin,
          password: passwordLogin,
        }),
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors"
        }
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('token', data.token)
          console.log(localStorage)
        })
      setLoginStatus(!loginStatus)
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleRegister = () => {
    register()
    setLoading(true)
    setTimeout(() => {
      window.location.href = '/dashboard'
      setLoading(false)
    }, 3000)
  }

  const handleLogin = () => {
    login()
    setLoading(true)
    setTimeout(() => {
      window.location.href = '/dashboard'
      setLoading(false)
    }, 3000)
  }

  console.log(message)
  return (
    <div>


      <div className="flex justify-center items-center h-screen">
        {!showLogin && (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <p className="text-center">Sign Up</p>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input onChange={(e) => { setUsername(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="username" placeholder="Username" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input onChange={(e) => { setPassword(e.target.value) }} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${password ? '' : 'border-red-500'}`} id="password" type="password" placeholder="******************" />
              {!password && <p className="text-red-500 text-xs italic">Please choose a password.</p>}
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <button onClick={handleRegister} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Sign Up
              </button>
              {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/">
              Forgot Password?
            </a> */}

              <button onClick={() => { setShowLogin(!showLogin) }} className="bg-transparent border-none p-0 m-0 font-normal text-left hover:underline focus:outline-none" type="button">
                I already have an account
              </button>
            </div>
          </form>
        )}

        {showLogin && (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <p className="text-center justify-center">Sign In</p>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input onChange={(e) => { setUsernameLogin(e.target.value) }} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="username" placeholder="Username" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input onChange={(e) => { setPasswordLogin(e.target.value) }} className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${password ? '' : 'border-red-500'}`} id="password" type="password" placeholder="Password" />
              {!password && <p className="text-red-500 text-xs italic">Please choose a password.</p>}
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Sign In
              </button>
              <button onClick={() => { setShowLogin(false) }} className="bg-transparent border-none p-0 m-0 font-normal text-left hover:underline focus:outline-none" type="button">
                Go back
              </button>
            </div>

            <div>
              {loading && (
                <div className="flex justify-center">
                  <ReactLoading type={"bars"} color="purple" height={75} width={75} />
                </div>
              )}

            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Authentication