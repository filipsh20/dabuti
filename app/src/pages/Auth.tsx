import React, { useState } from "react";
import Cookies from "js-cookie";
import CheckToken from "../services/CheckToken";

import styles from "../styles/Auth.module.css";

function Auth() {

    const [token, setToken] = useState("");

    const handleToken = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setToken(event.target.value)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        CheckToken(token)
            .then((data) => Cookies.set("token", data))
            .catch((error) => console.error(error.response))
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <p>Put your access token</p>
                <input onChange={handleToken} type="text" value={token} />
                <button>Acceed</button>
            </form>
        </div>
    )
}

export default Auth