import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaArrowRight } from "react-icons/fa";
import logo from "../../assets/footer/white-logo.png";
import leftImg from "../../assets/footer/footer-left.png";
import rightImg from "../../assets/footer/footer-right.png";
import { MdArrowOutward, MdOutlineEmail } from "react-icons/md";
import { BiLocationPlus } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

const Footer = () => {
    return (
        <footer className="  text-[#F1F1F1] pt-10 pb-0">
            {/* Top CTA Section */}
            <div className="bg-footerGradient py-16">
                <div className="max-w-screen-max_screen mx-auto xl:px-20 lg:px-10 px-5 text-center flex justify-between items-center">
                    <img src={leftImg} alt="left" className=" hidden md:block w-40 -rotate-6" />

                    <div>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-2 mt-8">
                            Ready to Begin Your Journey with <br className="hidden md:block" />
                            Imperial College of Engineering
                        </h2>
                        <p className="mt-5 mb-6 text-gray-300">Affiliated by Rajshahi University, Join with us.</p>
                        <button
                            className="inline-flex items-center justify-center bg-white text-gray-900 font-medium px-8 py-3 rounded shadow hover:bg-gray-100 transition mt-10"
                        >
                            Apply now <MdArrowOutward className="ml-2" />
                        </button>
                    </div>
                    <img src={rightImg} alt="right" className="hidden md:block w-40 rotate-6" />
                </div>
            </div>
            {/* Main Footer Section */}
            <div className="bg-[#0D0E22] mx-auto px-5 xl:px-20 lg:px-10 ">
                {/* Logo & Contact */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 pb-6 border-b border-slate-800">
                    <img src={logo} alt="Imperial Logo" className="w-[100px]" />
                    <div className="mb-2 space-y-1">
                        <span className="block font-semibold mb-4">Contact</span>
                        <span className="flex items-center gap-1 text-sm "><CiLocationOn className="" /> Jessore Road, Bokal, Khuha</span>
                        <span className="flex items-center gap-1 text-sm "><MdOutlineEmail className="text-gray-400"/>contact@imperial.edu.bd</span>
                        <span className="flex items-center gap-1 text-sm "><IoCallOutline className="text-gray-400"/> 0171383893, 0171383895, 0173333108</span>
                    </div>
                    <div className="mt-4">
                        <span className="block font-semibold mb-4">Social Media</span>
                        <div className="flex space-x-3 mt-2">
                            <a href="#" className="bg-white text-gray-900 rounded-full p-2 hover:bg-green-100 transition">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="bg-white text-gray-900 rounded-full p-2 hover:bg-green-100 transition">
                                <FaTwitter />
                            </a>
                            <a href="#" className="bg-white text-gray-900 rounded-full p-2 hover:bg-green-100 transition">
                                <FaYoutube />
                            </a>
                            <a href="#" className="bg-white text-gray-900 rounded-full p-2 hover:bg-green-100 transition">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>
                    <button
                        className="mt-8 inline-flex items-center justify-center border border-white px-6 py-3 rounded text-white hover:bg-white hover:text-green-700 transition h-fit"
                    >
                        Back on Top <FaArrowRight className="ml-2" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8 pb-6 relative">

                    <div>
                        <span className="block font-semibold mb-3">Admission</span>
                        <ul className="space-y-2 text-sm">
                            <li>Apply Online</li>
                            <li>How to Apply Online</li>
                            <li>Admission Requirements</li>
                            <li>Admission Policy</li>
                            <li>Tuition Fees</li>
                            <li>Payment Procedure</li>
                        </ul>
                    </div>
                    <div>
                        <span className="block font-semibold mb-3">Quick Links</span>
                        <ul className="space-y-2 text-sm">
                            <li>Available Options</li>
                            <li>How to Apply for Scholarships</li>
                            <li>Eligibility Criteria</li>
                            <li>Selection Process</li>
                            <li>Scholarship Amounts</li>
                            <li>Renewal Guidelines</li>
                        </ul>
                    </div>
                    <div>
                        <span className="block font-semibold mb-3">Resources</span>
                        <ul className="space-y-2 text-sm">
                            <li>Activities and Clubs</li>
                            <li>Student Organizations</li>
                            <li>Housing Options</li>
                            <li>Dining Services</li>
                            <li>Health and Wellness</li>
                            <li>Support Services</li>
                        </ul>
                    </div>
                {/* Map */}
                <div className=" flex flex-col items-end">
                    <div className="border-2 border-orange-400 rounded overflow-hidden w-full h-48">
                        <iframe
                            title="Khulna Map"
                            src="https://maps.google.com/maps?q=Khulna&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                        ></iframe>
                    </div>
                </div>
                </div>
                {/* Links */}
            </div>
            {/* Bottom Bar */}
            <div className="bg-[#0D0E22] border-t border-slate-700 pb-3">
                <div className=" max-w-screen-max_screen mx-auto px-5 xl:px-20 lg:px-10 flex flex-col md:flex-row justify-between items-center pt-4 pb-2 text-sm text-gray-300">
                    <span>Copyright © 2017 - 2025 • All rights reserve ICE</span>
                    <div className="flex space-x-6 mt-2 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                        <a href="#" className="hover:text-white">Developer Team</a>
                    </div>
                </div>
            </div>
            
        </footer>
    );
};

export default Footer;