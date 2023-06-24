import Head from 'next/head';
import Navbar from './Navbar';
import AdminNavbar from './AdminNavbar';

const Layout = ({children, isAdminPage}) => (
    <>
        <Head>
            <title>Yunka</title>
        </Head>
        {isAdminPage ? <AdminNavbar/> : <Navbar/>}
        {children}
    </>
);

export default Layout;
