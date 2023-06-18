import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <a className="navbar-brand">Yunka events</a>
        </Link>
        <Link href="/new">
            <a className="create">Create event</a>
        </Link>
    </nav>
)

export default Navbar;