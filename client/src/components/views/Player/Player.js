import React, {useEffect, useState} from 'react';
import './Player.scss';
import {duration} from "moment";

const Player = ({url}) => {

    const [Play, setPlay] = useState(true);

    const onPlay = () => {
        console.log(Play);
        setPlay(!Play);
    };

    useEffect(() => {
        const music = document.getElementsByClassName('audio')[0];
        if (url) {
            if (Play) {
                music.play();
            } else {
                music.pause();
            }
        }

    });

    if (url) {
        return (
            <div className="player">
                <audio className="audio" src={`http://localhost:5000/${url.musicFilePath}`}/>
                <div className="cover-image">
                    <img src={`http://localhost:5000/${url.imageFilePath}`} alt=""/>
                </div>
                <div className="controller">
                    <div className="left"/>
                    <div onClick={() => {
                        onPlay()
                    }} className="play_cont"/>
                    <div className="right"/>
                </div>

                <div className="slidecontainer">
                   0:00
                    <input type="range" min="1" max="100" defaultValue={0} className="slider"/>
                   {/*{time}*/}
                   asdf
                </div>
            </div>
        );
    } else {
        return (
            <div>
                태빈뮤직이 추천하는 음악을 들어보세요!
            </div>
        )
    }
};

export default Player;