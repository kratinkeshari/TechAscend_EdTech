import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links';
import { useLocation, matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai";
import ProfileDropdown from '../core/Auth/ProfileDropdown';
import { apiConnector } from '../../services/apiconnector';
import { categories } from '../../services/apis'
import { IoIosArrowDown } from "react-icons/io";
import { ACCOUNT_TYPE } from '../../utils/constants';

// const subLinks = [
//     {
//         name: 'Python',
//         link: '/catalog/python',
//         courses : ['1','2']
//     },
//     {
//         name: 'Web Dev',
//         link: '/catalog/web-development',
//         courses : ['1','2']
//     }
// ]

function Navbar() {

    const { token } = useSelector((state) => state.auth);
    const { totalItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false)

    const location = useLocation();
    const matchRoute = (route) => { return matchPath({ path: route }, location.pathname) }

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("CATEGORIES>>>",result.data.data);
            setSubLinks(result.data.data);
        } catch (error) {
            // console.log("Can't fetch the category list");
            // console.error(error.message);
        }
    }

    useEffect(() => {
        fetchSubLinks();
        // console.log("SUBLINKS>>>",subLinks);
    }, []);


    return (
        <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${location.pathname !== "/" ? "bg-richblack-800" : ""
            } transition-all duration-200`}>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                {/* Logo */}
                <Link to={'/'}>
                    <img src={logo} loading='lazy' width={160} height={32}></img>
                </Link>

                {/* Navbar links */}
                <nav className="hidden md:block">
                    <ul className='flex flex-row gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === 'Catalog' ?
                                            (
                                                <div className={`group relative flex flex-row cursor-pointer items-center gap-1
                                                ${matchRoute("/catalog/:catalogName")
                                                        ? "text-yellow-25"
                                                        : "text-richblack-25"
                                                    }
                                                `}>
                                                    <p>{link.title}</p>
                                                    <IoIosArrowDown />

                                                    <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[3em]  top-[50%] z-[1000] flex flex-col w-[200px] rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:translate-y-[1.65em] lg:w-[300px]'>
                                                        <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 rounded select-none bg-richblack-5'>
                                                        </div>
                                                        {loading ? (
                                                            <p className="text-center">Loading...</p>
                                                        ) : subLinks?.length ? (
                                                            <>
                                                                {subLinks
                                                                    ?.filter(
                                                                        (subLink) => subLink?.course?.length > 0
                                                                    )
                                                                    ?.map((subLink, i) => (
                                                                        <Link
                                                                            to={`/catalog/${subLink.name
                                                                                .split(" ")
                                                                                .join("-")
                                                                                .toLowerCase()}`}
                                                                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                            key={i}
                                                                        >
                                                                            <p>{subLink.name}</p>
                                                                        </Link>
                                                                    ))}
                                                            </>
                                                        ) : (
                                                            <p className="text-center">No Courses Found</p>
                                                        )}
                                                    </div>

                                                </div>

                                            )
                                            :
                                            (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Buttons */}
                <div className=' hidden items-center gap-x-4 md:flex'>
                    {/* {console.log(token)} */}
                    {
                        user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                                {
                                    totalItems > 0 && (
                                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-[8px]'>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropdown />
                    }
                </div>
                <button className="mr-4 md:hidden">
                    <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button>

            </div>
        </div>
    )
}

export default Navbar