import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p> 태빈뮤직 프로토타입입니다  <Icon type="smile" /></p>
        </div>
    )
}

export default Footer
