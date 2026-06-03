
import Link from "next/link"

export default function Navbar(){
    return(
        <nav className="navbar">
            <div className="navbar-container">
                <ul className="nav-left">
                    <li>
                        <link href="/">Home</link>
                    </li>
                    <li>
                        <link href="/about">About</link>
                    </li>
                </ul>

                <link href="/" className="navbar-logo">
                    <img src="my-portfolio/public/Logo_jem2.0_.svg" alt="jem-logo"></img>
                </link>

                <ul>
                    <li>
                        <link href="/project">Project</link>
                    </li>
                    <li>
                        <link href="/contact">Contact</link>
                    </li>
                </ul>
            </div>       
        </nav>
    )
}