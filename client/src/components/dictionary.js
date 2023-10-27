import { useEffect, useState } from "react"

function Dictionary() {

  const [data, setData] = useState([])
  const [word, setWord] = useState('')
  const [filteredWords, setFilteredWords] = useState([]);
  const [toggle, setToggle] = useState(false)
  const [mostThumbsUpDefinition, setMostThumbsUpDefinition] = useState('')
  const [mostThumbsUpExample, setMostThumbsUpExample] = useState('')
  const [showInput, setShowInput] = useState(false);

  async function ShowWords() {
    const token = localStorage.getItem('token')
    try {
      fetch(`http://localhost:8800/dictionary`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
        .then(response => response.json())
        .then(data => {
          setData(data)
        })
    }
    catch (err) {
      console.log(err)
    }
  }

  async function DeleteWord(wordToDelete) {
    const token = localStorage.getItem('token')
    try {
      await fetch("http://localhost:8800/deleteWord", {
        method: "POST",
        body: JSON.stringify({
          word: wordToDelete
        }),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          mode: "no-cors"
        }
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  async function AddWord() {
    const token = localStorage.getItem('token')
    const payload = JSON.parse(atob(token.split('.')[1]));
    const username = payload.username
    // console.log(word, token)
    try {
      fetch('http://localhost:8800/add', {
        method: "POST",
        body: JSON.stringify({
          username: username,
          word: word,
        }),
        headers: {
          "Content-Type": "application/json",
          mode: "no-cors"
        }
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  async function showDefinition() {
    const response = await fetch(`https://api.urbandictionary.com/v0/define?term=${word}`)
    const data = await response.json()
    if (data.list.length === 0) {
      setMostThumbsUpDefinition('No definition found')
    }
    else {
      data.list.sort((a, b) => b.thumbs_up - a.thumbs_up)
      setMostThumbsUpDefinition(data.list[0].definition)
      setMostThumbsUpExample(data.list[0].example)
      setShowInput(true)
    }
  }

  function handleSearchChange(e) {
    const term = e.target.value
    setWord(term)
    const results = data.filter(item => item.word.startsWith(term))
    setFilteredWords(results)
  }

  const toggleDropdown = () => {
    setToggle(!toggle)
  }

  useEffect(() => {
    ShowWords()
  })


  return (
    <div>
      <div className="border-b border-gray-300 py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/dashboard">
            <img src="./logo.svg" width="413" alt='logo' />
          </a>
          <button onClick={toggleDropdown} className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
            <img src="./profile-picture-3.jpg" className="w-8 h-8 rounded-full" alt="user" />
          </button>
          {
            toggle && (
              <div id="dropdownAvatar" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-black">
                  <div>Bonnie Green</div>
                  <div className="font-medium truncate">name@flowbite.com</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                  <li>
                    <a href="/learner" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-black">Profile</a>
                  </li>
                </ul>
                <div className="py-2">
                  <a href="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                </div>
              </div>
            )
          }
        </div>
      </div>

      <div className="dictionary max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">My dictionary ({word ? filteredWords.length : data.length})</h2>

        <div className="flex items-center">
          <input
            type="text"
            className="max-w-xs w-2/4 px-2 py-1.5 text-lg border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 active:border-blue-600 placeholder-gray-400 transition-all duration-700 hover:border-blue-300"
            placeholder="Find"
            value={word}
            onChange={handleSearchChange}
          />

          {word && (
            <button onClick={showDefinition} className="ml-3 px-8 py-1 bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600">Add</button>
          )}

        </div>


        {filteredWords.length !== 0 && (
          filteredWords.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-4 border-b-2 border-gray-150">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 mr-4" />

              <div className="flex-grow flex items-center">
                <strong className="text-lg mr-2 text-blue-600">{item.word}</strong>:
                <span className="text-black-500 ml-2">{item.meaning}</span>
              </div>

              <button onClick={() => DeleteWord(item.word)} className="ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>

            </div>
          ))
        )}

        {filteredWords.length === 0 && word.length === 0 && (
          data.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2 px-4 border-b-2 border-gray-150">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 mr-4" />

              <div className="flex-grow flex items-center">
                <strong className="text-lg mr-2 text-blue-600">{item.word}</strong>:
                <span className="text-black-500 ml-2">{item.meaning}</span>
              </div>

              <button onClick={() => DeleteWord(item.word)} className="ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>

            </div>
          ))
        )}

        {filteredWords.length === 0 && word && (
          <div className="mt-4">
            <strong>The word {word} </strong>
            is not in your dictionary.
            <p>If it should be, tap Add.</p>
          </div>

        )}

        <div className="flex mt-4 p-4 border rounded bg-gray-100 text-gray-800">
          <strong>Definition:</strong> {mostThumbsUpDefinition}
        </div>
        {/* <div className="bg-white p-4 rounded-md mb-4">
          <div className="text-gray-800 mb-2">TMI</div>
          <div className="border-t border-gray-300 pt-2">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <h2>
                {mostThumbsUpDefinition}
              </h2>
            </button>
          </div>
        </div> */}

        {/* <div className="">
          <p>{mostThumbsUpDefinition}</p>
        </div> */}

      </div>

    </div>

  )
}

export default Dictionary