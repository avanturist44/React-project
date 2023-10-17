import { useEffect, useState } from "react"
import ReactLoading from "react-loading"

function Authentication() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

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

  const handleRegister = () => {
    register()
    setLoading(true)
    setTimeout(() => {
      window.location.href = '/'
      setLoading(false)
    }, 5000)
  }

  useEffect(() => {
    let timer
    if (loading) {
      timer = setTimeout(() => {
        setLoading(false)
      }, 5000)
    }

    return () => {
      clearTimeout(timer)
    }
  }, [loading])

  console.log(message)
  return (
    <div>

      <div className="flex justify-center items-center h-screen">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
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
          <div className="flex items-center justify-center">
            <button onClick={handleRegister} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Sign Up
            </button>
            {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/">
              Forgot Password?
            </a> */}
            <div>
              {loading && (
                <div>
                  <ReactLoading type={"bars"} color="purple" height={20} width={20} />
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}

export default Authentication