import BySwitch from "@/components/BySwitch";
import  React  from "react";

interface ITestProps {}

interface ITestState {
    check1:boolean,
    check2:boolean,
    check3:boolean,
    check4:boolean
    check5:boolean


}

class Test extends React.Component<ITestProps,ITestState> {
    state = {
        check1:true,
        check2:true,
        check3:true,
        check4:true,
        check5:true
    }
 
 
    render(){
       
        return <div style={{margin:"20px"}}>
            
            <h3>默认</h3>
            <BySwitch/>
            <div style={{height:"4px"}}></div>
            <hr/>

            <h3>尺寸大小 size:'small'|'default'</h3>
            <BySwitch size="small"/> &nbsp;&nbsp;
            <BySwitch size="default"/>
            <div style={{height:"4px"}}></div>
            <hr/>

            <h3>默认选中 checked</h3>
            <BySwitch checked={this.state.check1} onChange={(e:boolean)=>{this.setState({check1:e})}}/>
            {this.state.check1+''}
            <div style={{height:"4px"}}></div>
            <hr/>

            <h3>禁用 disabled</h3>
            <BySwitch disabled/>&nbsp;&nbsp;
            <BySwitch checked={this.state.check2} disabled onChange={(e:boolean)=>{this.setState({check2:e})}}/>
            {this.state.check2+''}
            <div style={{height:"4px"}}></div>
            <hr/>
        </div>
    }
}   

export default Test