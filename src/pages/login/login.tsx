import  React,{useEffect} from "react"
import {withRouter, RouteComponentProps } from "react-router-dom";
import { Form, Input, Button, Checkbox } from 'antd';
import "./index.css"
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 12 },
  };

  interface IProps extends  RouteComponentProps {};

const Login:React.FC<IProps> = (props)=>{

    // const [codeImg,setCodeImg] = useState("")
    // const [codeId,setCodeId] = useState("")


  const onFinish = (values:any) => {
    console.log('Success:', values);
    
    props.history.replace("/")
  };
  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };
  const createCode = async ()=>{
    
  }
  useEffect(()=>{
    createCode();
  },[])

    return <div className="login-warp">
        <div className="login-main">

        
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="账号"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input placeholder="请输入账号" />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password placeholder="请输入密码"/>
            </Form.Item>
            <Form.Item  label="验证码"  >
                <div style={{display:"flex"}}>

               
                 <Form.Item
                    name="captcha"
                    noStyle
                    rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                    >
                    <Input placeholder="请输入验证码" />
                 </Form.Item>
                {/* <span className="imgcode" onClick={()=>createCode()} dangerouslySetInnerHTML={{ __html: codeImg }}></span> */}
                </div>
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
            </Form>
        </div>
    </div>
}

export default withRouter(Login)
