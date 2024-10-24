// import React from 'react'

function Footer() {
  return (
    <div className="space-y-6">
      <hr />
      <ul className="font-lato flex gap-10 items-center justify-center md:gap-28 ">
        <li className="text-slate-600 hover:text-slate-700 hover:font-semibold">
          <a href="https://github.com/AmanKumarVerma11" target="_blank">Github</a>
        </li>
        <li className="text-slate-600 hover:text-slate-700 hover:font-semibold">
          <a href="https://www.linkedin.com/in/aman-kr-verma11/" target="_blank">LinkedIn</a>
        </li>
        <li className="text-slate-600 hover:text-slate-700 hover:font-semibold">
          <a href="https://www.figma.com/@akv" target="_blank">Figma</a>
        </li>
        <li className="text-slate-600 hover:text-slate-700 hover:font-semibold">
          <a href="https://x.com/mai_amanhoon" target="_blank">Twitter</a>
        </li>
      </ul>
      <div >
        <p className="text-center mb-3">© 2024 All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer