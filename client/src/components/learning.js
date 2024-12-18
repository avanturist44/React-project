import React from 'react'
import { useState } from "react"
import { useEffect } from 'react'

export default function Learning() {

  const [data, setData] = useState([])
  const [toggle, setToggle] = useState(false)

  const toggleDropdown = () => {
    setToggle(!toggle)
  }

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

  useEffect(() => {
    ShowWords()
  }, [])

  return (
    <div>
      <nav className="border-b border-gray-300 py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">

          <div className="flex-shrink-0">
            <a href="/dashboard">
              <img src="./logo.svg" width="413" alt='logo' />
            </a>
          </div>

          <ul className="flex-grow flex justify-around items-center">
            <li><a href="/dashboard">Recommendations</a></li>
            <li><a href="/training">Training</a></li>
            <li><a href="/dictionary">Dictionary</a></li>
          </ul>

          <div className="flex-shrink-0">
            <button onClick={toggleDropdown} className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
              <img src="./profile-picture-3.jpg" className="w-8 h-8 rounded-full" alt="user" />
            </button>
            {toggle && (
              <div id="dropdownAvatar" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 right-5">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-black">
                  <div>{localStorage.getItem('username')}</div>
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
            )}
          </div>

        </div>
      </nav>

      <div className="learning-container">
        <div className="words-builder">
          <div className="words-builder-text">
            <a href='/training/hangman'>Words builder</a>
            <p>{data.length} words</p>
          </div>
          <div className="words-builder-img">
            <a href='/training/hangman'>
              <img src="./words.jpeg" width="100" height="50" alt='Play hangman game' />
            </a>
          </div>
        </div>
        <div className="flashcards-container">

          <div className="flashcards-text">
            <a href='/training/flashcards'>Flashcards</a>
            <p>{data.length} words</p>
          </div>

          <div className="flashcards-img">
            <a href='/training/flashcards'>
              <img src="./flashcard.png" width="100" height="50" alt='Play hangman game' />
            </a>
          </div>
        </div>

      </div>

    </div>
  )
}
