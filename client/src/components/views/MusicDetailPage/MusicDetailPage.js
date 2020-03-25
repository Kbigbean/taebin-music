import React, {useEffect, useState} from 'react';
import {List, Avatar} from "antd";
import Axios from "axios";
import './MusicDetailPage.scss'
import Follower from "./Sections/Follower";

const MusicDetailPage = (props) => {
    const musicId = props.match.params.videoId;
    const [MusicDetail, setMusicDetail] = useState([]);

    useEffect(() => {
        let variable = {musicId: musicId};
        Axios.post('/api/music/getMusicDetail', variable)
            .then(res => {
                if (res.data.success) {
                    setMusicDetail(res.data.musicDetail);
                } else {
                    alert('비디오 정보 가져오기 실패');
                }
            });
    }, []);


    if (MusicDetail.writer) {
        return (
            <div style={{width: '100%', padding: "3rem 8rem"}}>

                개발중...

                <div style={{display: "flex"}}>
                    <div style={{width: "80%"}}>
                        <canvas className="canvas" width={window.innerWidth} height={window.innerHeight}/>
                        <audio className="audio" controls src={`http://localhost:5000/${MusicDetail.musicFilePath}`}/>
                    </div>
                    <div>
                        {/*<img style={{width: "250px", height: "250px", objectFit: "cover"}}*/}
                        {/*     src={`http://localhost:5000/${MusicDetail.imageFilePath}`} alt=""/>*/}
                    </div>
                </div>


                <List.Item actions={[<Follower userTo={MusicDetail.writer._id} userFrom={localStorage.getItem('userId')}/>]}>
                    <List.Item.Meta avatar={<Avatar src={MusicDetail.writer.image}/>} title={MusicDetail.writer.name} description={MusicDetail.description}/>
                </List.Item>
            </div>
        );
    } else {
        return (
            <div>...loading</div>
        )
    }

};

export default MusicDetailPage;