
import Link from "next/link"

export default function Navbar(){
    return(
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="nav-left">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                </ul>

                <Link className="navbar-logo">
                    <img src="/Logo/Logo_jem2.0_.svg" alt="jem-logo"></img>
                </Link>

                <ul className="nav-right">
                    <li>
                        <Link href="/project">Project</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}