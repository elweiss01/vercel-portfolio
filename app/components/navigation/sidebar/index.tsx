'use client';
import { FaHome } from "react-icons/fa";
import { VscServerProcess } from "react-icons/vsc";
import { GiChaingun } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';

const removeActive = (e: HTMLAnchorElement) => {
    let navLinks = document.getElementsByClassName('active');
    navLinks[0].classList.remove('active');
    e.classList.add('active');
    return;
}

const Sidebar = () => {

    const { user} = useUser();
    return (
       user && (<>
            <div className="vh-100 d-flex flex-column flex-shrink-0  float-left bg-primary bg-gradient w-15 h-100 pt-5 ">
                <ul className="nav flex-column">
                    <li className="nav-item" >
                        <Link className="nav-link active p-2" onClick={(e) => (removeActive(e.currentTarget))} aria-current="page" href="/" ><FaHome color="white" size="40px" /></Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link p-2" onClick={(e) => (removeActive(e.currentTarget))}  aria-current="page" href="/promptEditor"><VscServerProcess color="white" size="40px" /></Link>

                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link p-2" onClick={(e) => (removeActive(e.currentTarget))} aria-current="page" href="/sequentialChainCreator"><GiChaingun color="white" size="40px" /></Link>
                    </li>
                    <li className="nav-item ">
                        <Link className="nav-link p-2" onClick={(e) => (removeActive(e.currentTarget))} aria-current="page" href="/manageUsers"><FaUsers color="white" size="40px" /></Link>
                    </li>
                </ul>
            </div>
        </>)
    );
}

export default Sidebar;