import React from 'react';
import {Menu} from 'semantic-ui-react';
import Link from 'next/link';

const AdminNavbar = () => (
    <Menu vertical>
        <Link href="/admin">
            <Menu.Item as="a">Admin Home</Menu.Item>
        </Link>

        <Link href="/admin/events">
            <Menu.Item as="a">Events</Menu.Item>
        </Link>

        <Link href="/admin/blogs">
            <Menu.Item as="a">Blog</Menu.Item>
        </Link>
    </Menu>
);

export default AdminNavbar;
