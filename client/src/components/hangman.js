import React, { useEffect, useState } from "react";

function Hangman() {

  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false)
  const [currentWord, setCurrentWord] = useState("");
  const [currentHint, setCurrentHint] = useState("");
  const [chosenLetters, setChosenLetters] = useState([]);
  const [hints, setHints] = useState(3);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const ShowWords = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`http://localhost:8800/dictionary`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        })
        const fetchedData = await response.json()
        setData(fetchedData)
      } catch (err) {
        console.error(err)
      }
    }

    ShowWords()
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length)
      setCurrentWord(data[randomIndex].word.toUpperCase())
      setCurrentHint(data[randomIndex].meaning)
      setChosenLetters([])
      setHints(3)
      setWrongGuesses(0)
      setGameOver(false)
      setGameWon(false)
    }
  }, [data])


  const letterSelectFunction = (letter) => {
    if (!chosenLetters.includes(letter)) {
      setChosenLetters([...chosenLetters, letter])
      if (!currentWord.includes(letter)) {
        setWrongGuesses(wrongGuesses + 1)
      }
    }

    checkGameStatus()
  }

  const checkGameStatus = () => {
    const wordGuessed = currentWord.split("").every((letter) => chosenLetters.includes(letter))
    if (wordGuessed) {
      setGameWon(true)
    }
    if (wrongGuesses >= 3) {
      setGameOver(true);
    }
  };

  const hintFunction = () => {
    if (hints > 0) {
      const hiddenLetters = currentWord.split("").filter((letter) => !chosenLetters.includes(letter));
      if (hiddenLetters.length > 0) {
        setChosenLetters([...chosenLetters, hiddenLetters[0]]);
        setHints(hints - 1);
      }
    }
  };

  const resetGame = () => {
    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setCurrentWord(data[randomIndex].word.toUpperCase());
      setCurrentHint(data[randomIndex].meaning);
    }
    setChosenLetters([]);
    setHints(3);
    setWrongGuesses(0);
    setGameOver(false);
    setGameWon(false);
  };

  const toggleDropdown = () => {
    setToggle(!toggle)
  }

  let divs = []

  if (currentWord.length > 0) {
    for (let i = 0; i < currentWord.length; i++) {
      divs.push(<div key={i} className="shaded-letter-button"></div>)
    }
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


      <div className="wrapper">
        <div className="custom-white-box">
          <div className="text-container">{currentHint}</div>
          <p className="instruction-text">Create a word from the letters</p>

          <div className="letters-and-shaded-buttons-container">
            <div className="shaded-buttons-container">
              {currentWord && divs}
            </div>

            <div className="letter-buttons-container">
              {currentWord.length > 0 && currentWord.split('').map((letter, index) => (

                <button onClick={() => letterSelectFunction(letter)} key={index} className="letter-button">
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="training-footer">

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="bin">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>

          <button className="do-not-know">Don't know</button>
        </div>
      </div>
    </div>



  );
}

export default Hangman;
