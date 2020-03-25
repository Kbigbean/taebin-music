import React, {useState} from 'react';
import {Typography, Button, Form, Input, Icon, message} from "antd";
import Dropzone from "react-dropzone";
import Axios from "axios";
import {useSelector} from "react-redux";

const {Title} = Typography;
const {TextArea} = Input;

const PrivateOptions = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"},
];


const MusicUploadPage = (props) => {
    const user = useSelector(state => state.user);

    const [MusicTitle, setMusicTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Private, setPrivate] = useState(0);
    const [ImageFilePath, setImageFilePath] = useState("");
    const [MusicFilePath, setMusicFilePath] = useState("");

    const onTitleChange = (e) => {
        setMusicTitle(e.currentTarget.value);
    };

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    };

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value);
    };


    const onImageDrop = (files) => {
        let formData = new FormData();

        const config = {
            header: {'content-type': 'multipart/form-data'}
        };

        formData.append("file", files[0]);

        Axios.post('/api/music/uploadCoverImage', formData, config)
            .then(res => {
                if (res.data.success) {
                    // console.log(res.data);
                    setImageFilePath(res.data.url);
                } else {
                    alert('업로드 실패');
                }
            })
    };

    const onMusicDrop = (files) => {
        let formData = new FormData();

        const config = {
            header: {'content-type': 'multipart/form-data'}
        };

        formData.append("file", files[0]);

        Axios.post('/api/music/uploadMusic', formData, config)
            .then(res => {
                if (res.data.success) {
                    // console.log(res.data);
                    setMusicFilePath(res.data.url);
                } else {
                    alert('업로드 실패');
                }
            })
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            writer: user.userData._id,
            title: MusicTitle,
            description: Description,
            privacy: Private,
            imageFilePath: ImageFilePath,
            musicFilePath: MusicFilePath,
        };

        Axios.post('/api/music/uploadMusicData', variable)
            .then(res => {
                if (res.data.success) {
                    // console.log(res.data);
                    message.success('음악파일 업로드 성공');
                    setTimeout(() => {
                        props.history.push('/');
                    }, 2000);

                } else {
                    alert('음악파일 업로드 실패');
                }
            })
    };

    return (
        <div style={{maxWidth: "700px", margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>Upload Music</Title>
            </div>
            <Form onSubmit={onSubmit}>
                Cover image upload
                <div style={{display: 'flex', justifyContent: 'space-between', width: "700px"}}>
                    {ImageFilePath ?
                        <div style={{width: '300px', height: '300px'}}>
                            <img style={{width: "100%", height: "100%", objectFit: "cover"}} src={`http://localhost:5000/${ImageFilePath}`} alt="CoverImage"/>
                        </div>
                        :
                        <Dropzone onDrop={onImageDrop} multiple={false} maxSize={10000000}>
                            {({getRootProps, getInputProps}) => (
                                <div style={{
                                    width: '300px', height: '300px', border: '1px solid lightgray', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center'
                                }}{...getRootProps()}>
                                    <input {...getInputProps()}/>
                                    <Icon type="plus" style={{fontSize: '3rem'}}/>
                                </div>
                            )}
                        </Dropzone>
                    }
                </div>
                <br/>
                Audio upload
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {MusicFilePath ?
                        <div style={{width: '700px', height: '80px'}}>
                            <audio style={{width: "100%", height: "100%"}} controls src={`http://localhost:5000/${MusicFilePath}`}/>
                        </div>
                        :
                        <Dropzone onDrop={onMusicDrop} multiple={false} maxSize={10000000}>
                            {({getRootProps, getInputProps}) => (
                                <div style={{
                                    width: '700px', height: '80px', border: '1px solid lightgray', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center'
                                }}{...getRootProps()}>
                                    <input {...getInputProps()}/>
                                    <Icon type="plus" style={{fontSize: '3rem'}}/>
                                </div>
                            )}
                        </Dropzone>
                    }
                </div>
                <br/>
                <br/>
                <label>Title</label>
                <Input onChange={onTitleChange} value={MusicTitle}/>
                <br/>
                <br/>
                <label>Description</label>
                <TextArea onChange={onDescriptionChange} value={Description}/>
                <br/>
                <br/>
                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default MusicUploadPage;