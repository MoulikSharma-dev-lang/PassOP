import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-blue-950 text-white flex justify-between py-3'>
        <p className='font-bold text-xl mx-3'>&lt; Pass<span className='text-green-300'>OP</span> /&gt;</p>
        <ul className='flex gap-2 mx-3'>
            <li className='text-xl cursor-pointer'>Home</li>
            <li className='text-xl cursor-pointer'>About</li>
            <li className='text-xl cursor-pointer'>Contact</li>
        </ul>
    </nav>
  )
}

export default Navbar