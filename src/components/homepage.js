import Authentication from "./authentication"
import { useState } from "react"

function HomePage() {

  const [showAuth, setShowAuth] = useState(false)

  return (
    <div>
      <div className="border-b border-gray-300 py-4 px-4 ">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/">
            <img src="./logo.svg" width="413" alt='logo' />
          </a>
          <nav>
            <ul className="flex items-center">
              <li>
                <button onClick={() => setShowAuth(!showAuth)} className="px-6 py-3 transition 
                  hover:bg-gray-200 rounded-md active bg-gradient-to-r
                  border-t-2 border-indigo-400 bg-gradient-to-br
                  from-blue-500 to-indigo-600 hover:from-purple-600
                  hover:via-blue-700 hover:to-purple-700 text-white
                  rounded-md flex md:inline-flex font-medium text-lg
                  cursor-pointer hover:shadow-lg transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                  Free Signup
                </button>
              </li>
            </ul>
          </nav>

        </div>

        <div>
          {showAuth ? (
            <Authentication />
          ) : (
            <div>




              <section className="hero py-4 py-8 md:py-24">
                <div className="container mx-auto items-center justify-between relative text-center">
                  <h1 className="text-4xl md:text-7xl leading-normal md:leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block text-center">Use
                    <span className="font-bold"> New English</span>
                    to learn slang words
                  </h1>
                  <p className="md:text-2xl text-gray-500 text-center max-w-3xl mx-auto mt-4">Learn the most popular and modern slang to keep up with current trends!</p>
                  <button onClick={() => setShowAuth(!showAuth)} className="px-4 py-3 md:px-10 md:py-5 text-2xl transition hover:bg-gray-200 rounded-md active bg-gradient-to-r border-t-2 border-indigo-400
                    bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-purple-600 hover:via-blue-700
                    hover:to-purple-700 text-white rounded-md
                    hover:shadow-lg transition inline-flex items-center mt-8"> Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 ml-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>
              </section>
              <section className="relative py-4">
                <div className="container mx-auto">
                  <div className="rounded-2xl shadow-2xl border flex divide-x">
                    <div className="p-8 flex-1">
                      <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mr-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-4xl font-medium">
                          Add the slang words
                        </h2>
                      </div>
                      <p className="text-gray-600 text-lg mt-2">
                        Add the words with one click
                      </p>
                      <h3 className="mt-6 text-lg font-bold">
                        Slang words:
                      </h3>
                      <div className="bg-gray-100 p-4 rounded-md mt-2 h-44 text-xl">
                        <ul className="">
                          <li>Situationship</li>
                          <li>Doxx</li>
                          <li>Flossing</li>
                          <li>High key</li>
                          <li>NPC</li>
                        </ul>
                      </div>
                      <button onClick={() => setShowAuth(!showAuth)} className="mt-8 px-6 py-3 transition 
                        hover:bg-gray-200 rounded-md active bg-gradient-to-r
                        border-t-2 border-indigo-400 bg-gradient-to-br
                        from-blue-500 to-indigo-600 hover:from-purple-600
                        hover:via-blue-700 hover:to-purple-700 text-white
                        rounded-md flex md:inline-flex font-medium text-lg
                        cursor-pointer hover:shadow-lg transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Add
                      </button>
                    </div>
                    <div className="p-8 flex-1">
                      <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mr-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>
                        <h2 className="text-4xl font-medium">
                          Learn the slang words
                        </h2>
                      </div>
                      <p className="text-gray-600 text-lg mt-2">
                        Learn the words by playing different games
                      </p>
                      <h3 className="mt-6 text-lg font-bold">
                        Hangman game:
                      </h3>
                      <div className="bg-gray-100 p-4 rounded-md mt-2 h-44 text-xl">
                        <ul>
                          <li className="text-center">
                            S _ T _ A _ I _ N _ H _ P
                          </li>
                          <li className="text-center mt-8">
                            A relationship that has no label on it. Like a friendship but more than a friendship, but not quite a relationship
                          </li>
                        </ul>
                      </div>
                      <button onClick={() => setShowAuth(!showAuth)} className="mt-8 px-6 py-3 transition 
                        hover:bg-gray-200 rounded-md active bg-gradient-to-r
                        border-t-2 border-indigo-400 bg-gradient-to-br
                        from-blue-500 to-indigo-600 hover:from-purple-600
                        hover:via-blue-700 hover:to-purple-700 text-white
                        rounded-md flex md:inline-flex font-medium text-lg
                        cursor-pointer hover:shadow-lg transition">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                        </svg>
                        Learn
                      </button>
                    </div>
                    <div className="p-8 flex-1">
                      <div className="flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mr-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                        </svg>

                        <h2 className="text-4xl font-medium">
                          No confusion
                        </h2>
                      </div>
                      <p className="text-gray-600 text-lg mt-2">
                        You'll find no confusion reading any post
                      </p>
                      <div className="mt-6">
                        <blockquote className="twitter-tweet"><p lang="en" dir="ltr">after 24 years old you should never be in a situationship again tbh you need to leave them immediately</p>&mdash; SALINA (@REDSEASHAWTY)
                          <a href="https://twitter.com/REDSEASHAWTY/status/1713334120666001452?ref_src=twsrc%5Etfw">October 14, 2023</a>
                        </blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage