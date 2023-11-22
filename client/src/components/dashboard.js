import { useState } from "react"

function Recommendations() {

  const [toggle, setToggle] = useState(false)

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


      <div className="flex">
        <a href="/dictionary/vocabulary/1" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Slang Words From Social Media 2023</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Here are the most popular slang word of 2023 so far, in social media.</p>
        </a>

        <a href="/dictionary/vocabulary/2" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Slang Words From Video Games 2023</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Here are the most popular slang word of 2023 so far, in video games.</p>
        </a>

        <a href="/dictionary/vocabulary/3" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Slang Words From Wall Street 2023</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Here are the popular words used by investors from WallStreet</p>
        </a>
      </div>


    </div>

  )
}

export default Recommendations