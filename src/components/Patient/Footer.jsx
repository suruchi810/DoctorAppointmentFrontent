import React from 'react'
import { assets } from '../../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full px-4 py-12 md:py-[100px] gap-8">
                <div className="md:col-span-2 space-y-4">
                    <div>
                        <img src={assets.logo} alt="Logo" className="h-10 sm:h-12" />
                    </div>
                    <div className="text-gray-600 text-base sm:text-[18px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="font-semibold text-lg sm:text-[22px]">COMPANY</p>
                    <ul className="space-y-2 text-gray-700 text-base sm:text-[18px]">
                        <li><Link to="/" className="hover:text-blue-300">Home</Link></li>
                        <li><Link to="/about" className="hover:text-blue-300">About us</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-300">Contact us</Link></li>
                        <li><Link to="/privacy" className="hover:text-blue-300">Privacy policy</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <p className="font-semibold text-lg sm:text-[22px]">GET IN TOUCH</p>
                    <p className="text-gray-700 text-base sm:text-[18px]">+91-09131-34214</p>
                    <p className="text-gray-700 text-base sm:text-[18px]">soni.s62668@gmail.com</p>
                </div>
            </div>

            <div className="border-b-2 border-gray-300 mx-4"></div>

            <div className="text-center text-gray-600 text-sm sm:text-base my-5 px-4">
                Copyright © 2025 Perscripto - All Right Reserved.
            </div>
        </div>
    )
}

export default Footer
