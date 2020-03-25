import React, {useEffect, useState} from 'react';
import Axios from "axios";

const Follower = (props) => {
    const userTo = props.userTo;
    const userFrom = props.userFrom;

    const [FollowerNumber, setFollowerNumber] = useState(0);
    const [Following, setFollowing] = useState(false);

    const onFollow = () => {
        let followVariable = {
            userTo: userTo,
            userFrom: userFrom
        };

        if (Following) {
            Axios.post('/api/follower/unFollow', followVariable)
                .then(res => {
                    if (res.data.success) {
                        setFollowerNumber(FollowerNumber - 1);
                        setFollowing(!Following);
                    } else {
                        alert('팔로우를 취소하는데 실패했습니다.');
                    }
                })
        } else {
            Axios.post('/api/follower/follow', followVariable)
                .then(res => {
                    if (res.data.success) {
                        setFollowerNumber(FollowerNumber + 1);
                        setFollowing(!Following);
                    } else {
                        alert('팔로우 하는데 실패했습니다.');
                    }
                })
        }
    };

    useEffect(() => {
        const variable = {userTo: userTo, userFrom: userFrom};

        Axios.post('/api/follower/followerNumber', variable)
            .then(res => {
                if (res.data.success) {
                    setFollowerNumber(res.data.followerNumber);
                } else {
                    alert('팔로워 정보를 받아오지 못했습니다.')
                }
            });

        let followVariable = {userTo: userTo, userFrom: userFrom};

        Axios.post('/api/follower/following', followVariable)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data.following);
                    setFollowing(res.data.following);
                } else {
                    alert('정보를 받아오지 못했습니다.')
                }
            })

    }, []);

    return (
        <div>
            <button style={{
                background: `${Following ? '#aaa' : '#cc0000'}`, borderRadius: '4px', color: 'white',
                padding: "10px 15px", fontWeight: "500", fontSize: "1rem"
            }} onClick={onFollow}>
                {FollowerNumber} {Following ? '팔로잉' : '팔로우'}
            </button>
        </div>
    );
};

export default Follower;