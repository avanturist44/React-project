import React, { useEffect, useState } from "react";

function Flashcards() {

  const [toggle, setToggle] = useState(false)
  const [data, setData] = useState([])
  const [flipped, setFlipped] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const [wordsAndMeanings, setWordsAndMeanings] = useState({ words: [], meanings: [] })

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

  const goToNextWord = () => {
    setCurrentIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % data.length
      return nextIndex;
    })
  }

  const goToPreviousWord = () => {
    setCurrentIndex(prevIndex => {
      const nextIndex = (prevIndex - 1 + data.length) % data.length
      return nextIndex
    })
  }

  useEffect(() => {
    if (data.length > 0) {
      setWordsAndMeanings({
        words: [data[currentIndex].word],
        meanings: [data[currentIndex].meaning]
      });
    }
  }, [data, currentIndex])

  useEffect(() => {
    ShowWords()
  }, [])

  const toggleDropdown = () => {
    setToggle(!toggle)
  }



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

      <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
        <div className={`flashcard ${flipped ? 'flipped' : ''}`}>
          <div className="front">
            <div className="word-text">
              {wordsAndMeanings.words[0]}
            </div>
          </div>
          <div className="back">
            <div className="flashcard-back">
              {wordsAndMeanings.meanings[0]}
            </div>
          </div>

        </div>
      </div>
      <div className="arrows-container">

        <button onClick={goToPreviousWord}>
          <div className="arrow-left">
            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
            </svg>
          </div>
        </button>

        <p>{currentIndex}/{data.length}</p>


        <button onClick={goToNextWord}>
          <div className="arrow-right">
            <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
            </svg>
          </div>
        </button>
      </div>

    </div>

  )
}


export default Flashcards