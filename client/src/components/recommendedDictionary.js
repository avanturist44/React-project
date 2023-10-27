import { useState } from "react"

function RecommendedDictionary() {
  return (
    <div>
      <nav>
        <div className="border-b border-gray-300 py-4 px-4 ">
          <div className="container mx-auto flex items-center justify-between">
            <a href="/dashboard">
              <img src="./logo.svg" width="413" alt='logo' />
            </a>

            <ul className="flex space-x-5 items-center">
              <li className=""><a href="/recommendations">Recommendations</a></li>
              <li className=""><a href="/training">Training</a></li>
              <li><a href="/dictionary/vocabulary">Dictionary</a></li>
            </ul>

          </div>
        </div>
      </nav>
    </div>
  )

}

export default RecommendedDictionary