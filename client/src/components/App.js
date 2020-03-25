import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import MusicUploadPage from "./views/MusicUploadPage/MusicUploadPage";
import MusicDetailPage from "./views/MusicDetailPage/MusicDetailPage";
import ProfilePage from "./views/ProfilePage/ProfilePage";
import FollowingPage from "./views/FollowingPage/FollowingPage";

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <NavBar/>
            <div style={{paddingTop: '69px', minHeight: 'calc(100vh - 80px)'}}>
                <Switch>
                    <Route exact path="/" component={Auth(LandingPage, null)}/>
                    <Route exact path="/login" component={Auth(LoginPage, false)}/>
                    <Route exact path="/register" component={Auth(RegisterPage, false)}/>
                    <Route exact path="/music/upload" component={Auth(MusicUploadPage, true)}/>
                    <Route exact path="/music/:videoId" component={Auth(MusicDetailPage, null)}/>
                    <Route exact path="/user/:userId" component={Auth(ProfilePage, null)}/>
                    <Route exact path="/follow" component={Auth(FollowingPage, null)}/>
                </Switch>
            </div>
            <Footer/>
        </Suspense>
    );
}

export default App;
