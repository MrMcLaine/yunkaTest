import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <a className="navbar-brand">Yunka +100 friends</a>
        </Link>

        <Link href="/about">
            <a className="navbar-page">About us</a>
        </Link>

        <Link href="/events">
            <a className="navbar-page">Events</a>
        </Link>

        <Link href="/blogs">
            <a className="navbar-page">Blog</a>
        </Link>

        <Link href="/join">
            <a className="navbar-page">Join the team</a>
        </Link>

        <Link href="/donate">
            <a className="navbar-support">Support the organization</a>
        </Link>

    </nav>
)

export default Navbar;