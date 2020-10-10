import  React  from "react";

import ByButton from "@/components/ByButton";

import ByCarousel from "@/components/ByCarousel";

interface ITestProps {}

interface ITestState {
    dir:string
}
class Test extends React.Component<ITestProps,ITestState> {
    state = {
        dir:"left",
      
    }
 
    render(){
       
        return <div style={{margin:"20px"}}>
          
            <ByButton  onClick={()=>this.setState({dir:"left"})}>  left</ByButton>
            <ByButton  onClick={()=>this.setState({dir:"top"})}>  top</ByButton>
            <ByButton  onClick={()=>this.setState({dir:"right"})}>  right</ByButton>
            <ByButton  onClick={()=>this.setState({dir:"bottom"})}>  bottom</ByButton>
               <div style={{margin:"0 auto",backgroundColor:'aqua'}}>
                    <ByCarousel dir={this.state.dir}>
                        {Array.from(Array(3), (v,k) =><div key={k} style={{height:"100px"}}>{k}</div>)}
                    </ByCarousel>
               </div>
              

        </div>
    }
}   

export default Test