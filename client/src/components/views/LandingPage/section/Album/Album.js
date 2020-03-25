import React from 'react';
import {Avatar} from "antd";

const Album = () => {
    return (
        <div className="album_box">
            <div className="cover_box">
                <img onMouseOver={() => setButton(!Button)} src={`http://localhost:5000/${music.imageFilePath}`}
                     alt="Cover Image"/>
                {Button && <div className="play_btn"/>}
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
    );
};

export default Album;