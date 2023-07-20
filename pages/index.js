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
                <Link href="/blog">
                    <Button color="pink" type="button">
                        Blog
                    </Button>
                </Link>
                <Link href="/join">
                    <Button color="purple" type="button">
                        Join us
                    </Button>
                </Link>
                <Link href="/telegram-bot">
                    <Button color="google plus" type="button">
                        Telegram_bot
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default Home;