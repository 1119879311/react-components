import ByTabs, { ByTabsItem } from "@/components/ByTabs";
import  React  from "react";


interface ITestProps {}

interface ITestState {
    activeKey:string
}
class Test extends React.Component<ITestProps,ITestState> {
    state = {
        activeKey:'20'   
    }
 
    render(){
       
        return <div style={{margin:"20px"}}>
          
          <ByTabs activeKey={this.state.activeKey} onChange={(keyId:string)=>{
              this.setState({activeKey:keyId})
          }} onClose={(key:string,index:number)=>{
                console.log(key,index)
            }}>
       
                {Array.from(Array(40), (v,k) =>{
                     return <ByTabsItem key={k} keys={k.toString()} title={`Tab-${k}`}></ByTabsItem>
                })}
            </ByTabs>
              {this.state.activeKey}

        </div>
    }
}   

export default Test