import React from "react";
import {Button} from "semantic-ui-react";
import Link from "next/link";

function Home() {
    return (
        <>
            <div>
                <h1>Home page</h1>
                <Link href="/about">
                    <Button color="blue" type="button">
                        About
                    </Button>
                </Link>
                <Link href="/events">
                    <Button color="green" type="button">
                        Events
                    </Button>
                </Link>
                <Link href="/blogs">
                    <Button color="pink" type="button">
                        Blogs
                    </Button>
                </Link>
                <Link href="/join">
                    <Button color="purple" type="button">
                        Join us
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default Home;