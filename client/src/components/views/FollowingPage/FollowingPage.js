import React, {useEffect, useState} from 'react'
import {Card, Avatar} from "antd";
import Axios from "axios";
import './FollowingPage.scss';

const {Meta} = Card;

const FollowingPage = () => {
    const [Music, setMusic] = useState([]);
    const [Button, setButton] = useState(false);
    const [Play, setPlay] = useState(false);
    const [BtnHover, setBtnHover] = useState(false);
    const [ImageData, setImageData] = useState("");
    const [MusicData, setMusicData] = useState("");
    const [Title, setTitle] = useState("");
    const [Name, setName] = useState("");
    const [thisTime, setThisTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [Current, setCurrent] = useState(0);
    const [Duration, setDuration] = useState(0);

    const audio = document.getElementsByClassName('player_audio')[0];

    useEffect(() => {
        const followVariable = {
            userFrom: localStorage.getItem('userId')
        };

        Axios.post('/api/music/getFollowMusics', followVariable)
            .then(res => {
                if (res.data.success) {
                    setMusic(res.data.musics);
                } else {
                    alert('음악 가져오기 실패');
                }
            });
    });

    const getTime = () => {
        setThisTime(audio.currentTime);
        setEndTime(audio.duration);

        let endMin = Math.floor(endTime / 60);
        let endSec = Math.floor((endTime - endMin * 60));

        if (endMin < 10) {
            endMin = `0${endMin}`
        }

        if (endSec < 10) {
            endSec = `0${endSec}`
        }

        let curMin = Math.floor(thisTime / 60);
        let curSec = Math.floor((thisTime - curMin * 60));

        if (curMin < 10) {
            curMin = `0${curMin}`
        }

        if (curSec < 10) {
            curSec = `0${curSec}`
        }

        setDuration(`${endMin}:${endSec}`);
        setCurrent(`${curMin}:${curSec}`);
    };

    const onMouseClick = (image, music, title, name) => {
        setPlay(!Play);

        setImageData(image);
        setMusicData(music);
        setTitle(title);
        setName(name);

        if (Play) {
            audio.pause();
        } else {
            audio.play();
        }
    };

    const onPlayer = () => {
        setPlay(!Play);
        if (Play) {
            audio.pause();
        } else {
            audio.play();
        }
    };

    const onSlideBar = (e) => {
        // console.log(e.target.value);
        audio.currentTime = e.target.value;
        setThisTime(e.target.value);
    };

    return (
        <React.Fragment>
            <div className="main">
                <div className="album_wrap">
                    {
                        Music.map((music, index) => {
                            return (
                                <div className="album_box" key={index}>
                                    <audio onTimeUpdate={getTime} className="player_audio"
                                           src={`http://localhost:5000/${music.musicFilePath}`}/>
                                    <div className="cover_box"
                                         onMouseOver={() => setButton(true)}
                                         onMouseLeave={() => {
                                             setButton(false)
                                         }}>
                                        <img src={`http://localhost:5000/${music.imageFilePath}`} alt="Cover Image"/>
                                        {Button && <div onClick={() => {
                                            onMouseClick(music.imageFilePath, music.musicFilePath, music.title, music.writer.name)
                                        }}
                                                        onMouseOver={() => {
                                                            setBtnHover(!BtnHover)
                                                        }}
                                                        onMouseLeave={() => {
                                                            setBtnHover(!BtnHover)
                                                        }}
                                                        style={BtnHover ? {
                                                            transform: "scale(1.2)",
                                                            transition: "all ease .55s"
                                                        } : {transition: "all ease .55s"}}
                                                        className="play_btn"/>}
                                    </div>

                                    <div className="detail">
                                        <a href={`/music/${music._id}`}>
                                            <Meta title={music.title} avatar={<Avatar src={music.writer.image}/>}/>
                                        </a>
                                        <a href={`/user/${music.writer._id}`}>
                                            <span>{music.writer.name}</span>
                                        </a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    {MusicData &&
                    <div className="player">
                        <div className="cover-image">
                            <img src={`http://localhost:5000/${ImageData}`} alt=""/>
                        </div>
                        <h1>{Title}</h1>
                        <h3>{Name}</h3>
                        <div className="controller">
                            <div className="left"/>
                            <div onClick={() => {onPlayer()}} className="play_cont"/>
                            <div className="right"/>
                        </div>
                        <div className="slidecontainer">
                            {Current}
                            <input type="range" min="0" max={endTime} defaultValue={thisTime} onChange={onSlideBar} className="slider"/>
                            {Duration}
                        </div>
                    </div>}
                </div>
            </div>
        </React.Fragment>
    )
};

export default FollowingPage

