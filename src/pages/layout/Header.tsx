import React from "react"
import { Avatar,Row, Col ,Dropdown ,Menu} from 'antd';
import "./index.css"
interface Iprops {}

const DropdownMenu = (
    <Menu>
        <Menu.Item>退出登陆</Menu.Item>
        <Menu.Item>修改密码</Menu.Item>
    </Menu>
)
export default class extends React.Component<Iprops>{
    render(){
        return <div className="header-content">
                <Row justify="space-between" align="middle" gutter={16}>
                    <Col span={6}></Col>
                    <Col span={18} >
                        <div className="header-right">
                            <Dropdown overlay={DropdownMenu}>
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </Dropdown>
                              
                        </div>
                        
                    </Col>
                </Row>
                   
             </div>
    }
}
