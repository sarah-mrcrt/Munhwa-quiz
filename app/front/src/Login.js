import React, {useState, useEffect, Redirect} from "react";
import axios from "axios";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import {useCookies, withCookies} from 'react-cookie';
import Home from "./Home.js";
import AddQuizz from "./Quizz/AddQuizz.js";

function FormLogin(props) {
        return (
            <section className="container_login">
            <h2 class="join-us">Join Munwha, the first website quizz of asian culture</h2>
            <form onSubmit={props.onSignin} className="form_login">
                <h3>Sign in</h3>
                <div>
                    <input type="text" id="username" placeholder="username" ref={props.usernameRef}/>
                </div>
                <div>
                    <input type="password" name="password" placeholder="password" ref={props.passwordRef}/>
                </div>
                <div class="button_form">
                    <button type="submit" name="login">Login</button>
                </div>
            </form>

            <form onSubmit={props.onSignin} className="form_register">
            <h3>Register</h3>
                <div>
                    <input type="text" id="username" placeholder="username" ref={props.usernameRef}/>
                </div>
                <div >
                    <input type="password" name="password" placeholder="password" ref={props.passwordRef}/>
                </div>
                <div class="button_form">
                    <button type="button" name="signup" onClick={props.onSignup}>
                        Sign up
                    </button>
                </div>
            </form>
            </section>
        );
    }

function Login(props) {

    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    const usernameRef = React.createRef();
    const passwordRef = React.createRef();

    function disconnect() {
        removeCookie('login');
    }

    async function onSignup() {
        const user = {
            name: usernameRef.current.value,
            passwords: passwordRef.current.value
        };
        try {
            const p = (await axios.post('http://localhost:8000/signup', user));
            if (p.status === 200) {
                user.token = p.data.token;
                setCookie('login', user, '/');
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function onSignin(e) {
        e.preventDefault();
        const user = {
            name: e.target.username.value,
            passwords: e.target.password.value
        };
        try {
            const p = (await axios.post('http://localhost:8000/signin', user));
            if (p.status === 200) {
                user.token = p.data.token;
                setCookie('login', user, '/');
            }
        } catch (err) {
            console.error(err)
        }
    }
    
    if (cookies.login && cookies.login.name) {
        return (
        <>
            <p>{cookies.login.name}</p>
            <p>Tous vos scoreS</p>
            {/* <button id="disconnect" onClick={disconnect}>disconnect</button> */}
            envie d'ajouter un quizz ->
            <Link  to={'/addQuizz'}>AddQuizz</Link>
        </>        
        )
    }
    return <FormLogin onSignin={onSignin} onSignup={onSignup} usernameRef={usernameRef} passwordRef={passwordRef}/>
}

function LocalProtectedRoute({component: Component, ...rest}) {
    if (rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token) {
        return (
            <Route
                {...rest}
                render={routeProps => (
                    <Component {...routeProps} username={rest.allCookies.login.username}
                               token={rest.allCookies.login.token}/>
                )}
            />
        );
    }
    return <p>!!</p>;
}

/**
 * @return {null}
 */
function LocalProtectedLink({...rest}) {
    if (rest.allCookies && rest.allCookies.login && rest.allCookies.login.username && rest.allCookies.login.token) {
        return <Link className={rest.className} to={rest.to}>AddQuizz</Link>
    }else{
        return null;
    }
}

const ProtectedRoute = withCookies(LocalProtectedRoute);
const ProtectedLink = withCookies(LocalProtectedLink);

export {ProtectedRoute, ProtectedLink};
export default Login;