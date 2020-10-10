import  React  from "react";

import ByButton from "@/components/ByButton";
import ByMessage from "@/components/ByMessage";


interface ITestProps {}

interface ITestState {
   
}
class Test extends React.Component<ITestProps,ITestState> {
    state = {
       
      
    }
    
    render(){
       
        return <div style={{margin:"20px"}}>
            <h3>全局配置：setConfig</h3>
            <ByButton onClick={()=>{
                ByMessage.setConfig({msg:"这是一个条信息提示!",timer:3000})
            }}>
               修改配置
           </ByButton>
            <pre>{ `ByMessage.setConfig({msg:"这是一个条信息提示!",timer:3000})`}</pre>
           <div style={{height:"4px"}}></div>
           <hr/>

           <h3>正常提示:info</h3>
            <ByButton onClick={()=>{
                ByMessage.info({msg:"这是一个条信息提示!"})
            }}>
               info
           </ByButton>
            <pre>{ ` ByMessage.info({msg:"这是一个条信息提示!"})`}</pre>
           <div style={{height:"4px"}}></div>
           <hr/>

           <h3>成功提示:success</h3>
            <ByButton onClick={()=>{
                ByMessage.success({msg:"这是一个条成功提示!"})
            }}>
               success
           </ByButton>
            <pre>{ `ByMessage.success({msg:"这是一个条成功提示!"})`}</pre>
           <div style={{height:"4px"}}></div>
           <hr/>

           <h3>警告提示:warning</h3>
            <ByButton onClick={()=>{
                ByMessage.warning({msg:"这是一个条警告提示!"})
            }}>
               warning
           </ByButton>
            <pre>{ `ByMessage.warning({msg:"这是一个条警告提示!"})`}</pre>
           <div style={{height:"4px"}}></div>
           <hr/>

           <h3>错误提示:error</h3>
            <ByButton onClick={()=>{
                ByMessage.error({msg:"这是一个条错误提示!"})
            }}>
               error
           </ByButton>
            <pre>{ `ByMessage.error({msg:"这是一个条错误提示!"})`}</pre>
           <div style={{height:"4px"}}></div>
           <hr/>

           <h3>加载中提示:loading</h3>
            <ByButton onClick={()=>{
                ByMessage.loading({msg:"这是一个加载中提示!",timer:0})
            }}>
               loading
           </ByButton>
            <pre>{ `ByMessage.loading({msg:"这是一个条错误提示!",timer:0})`}</pre>
           <div style={{height:"4px"}}></div>
           <hr/>

           <h3>关闭提示:hide</h3>
            <ByButton onClick={()=>{
                ByMessage.hide()
            }}>
               hide
           </ByButton>
            <pre>{ ` ByMessage.hide()`}</pre>
           <div style={{height:"4px"}}></div>
           <hr/>

        </div>
    }
}   

export default Test