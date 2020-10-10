import  React from "react";
import {withRouter, RouteComponentProps } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import axios from "axios"
import "./index.css"
import gUserInfo from "../../store/userInfoStore";
import { observer } from "mobx-react";


interface IProps extends  RouteComponentProps {};

interface Istate {
    userName:string,
    passWord:string|number,
    code:string|number,
    codeId:string,
    codeImg:string,
    [k:string]:string|number
}

@observer
class Login extends React.Component<IProps,Istate> {
        
        public readonly state = {
            userName:'',
            passWord:'',
            code:'',
            codeId:'',
            codeImg:''
        }
        // 更新state 的值
        public handleAsynChage(keys: keyof Istate, value: string) {
            this.setState({[keys]:value})
        }
      
         public async createCode(){
             let res = await axios.get("https://wx.bylives.com/api/code")
             console.log(res)
             if(res.status===200){
                this.setState({
                    "codeImg":res.data,
                    "codeId":res.headers.code_token
                })
             }
        }
        public onSubmit(): void {
            console.log(this.state)
            gUserInfo.setData({
                userName:this.state.userName,
                uId:Math.random()
            })
            this.props.history.replace("/")
            // throw new Error("Method not implemented.");
        }
        public componentDidMount(){
            this.createCode();
            // console.log(this.props.location.pathname)
        }
        render(){
            return <div className="common-contain login-page">
            <form id="loginForm" className="loginForm" name="loginForm">
                {gUserInfo.data.userName}
            <div className="itme-block">
                <div className="lable"><img src={require("./images/login01.png")} alt="" />&nbsp;用户名</div>
                <input value={this.state.userName} onChange={(e)=>this.handleAsynChage("userName",e.target.value)} type="text" className="by-input username" name="username" placeholder="请输入你的用户名"/>
            </div>
            <div className="itme-block">
                <div className="lable"><img src={require("./images/login02.png")} alt=""/>&nbsp;密码</div>
                <input value={this.state.passWord} onChange={(e)=>this.handleAsynChage("passWord",e.target.value)} type="password" className="by-input password" name="password" placeholder="请输入你的密码"/>
            </div>
            <div className="itme-block">
                <div className="lable code-lable"><img src={require("./images/code.png")} alt=""/>&nbsp;验证码</div>
                <input value={this.state.code} onChange={(e)=>this.handleAsynChage("code",e.target.value)} type="text" className="by-input verifyCode" name="password" placeholder="请输入你的验证码"/>
                <span className="imgcode" onClick={()=>this.createCode()} dangerouslySetInnerHTML={{ __html: this.state.codeImg }}></span>
              
            </div>
            <br/>
            <button type="button" className="by-button by-block" id="loginbtn" onClick={()=>this.onSubmit()}>登&nbsp;陆</button>
          
        </form>
        </div>
        }
   
}
export default withRouter(Login)