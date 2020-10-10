import ByScroll from "@/components/ByScroll";
import  React  from "react";

interface ITestProps {}

interface ITestState {
   
}
class Test extends React.Component<ITestProps,ITestState> {
    state = {
       
    }
 
    render(){
        
        return <div style={{margin:"20px"}}>
            <h3>通知无限滚动</h3>
            <ByScroll dir="left" speed={600} enterPaused>
                {Array.from(Array(12), (v,k) =><div key={k} style={{width:"100px"}}>1212152</div>)}
            </ByScroll>
            <br/>
            <br/>

            <ByScroll dir="right" speed={600} enterPaused>
                {Array.from(Array(12), (v,k) =><div key={k} style={{width:"100px"}}>1212152</div>)}
            </ByScroll>
            <br/>
            <br/>

            <ByScroll dir="bottom" speed={300} enterPaused>
                {Array.from(Array(12), (v,k) =><div key={k} style={{width:"100px"}}>1212152</div>)}
            </ByScroll>
            <br/>
            <br/>

            <ByScroll dir="top" speed={300} enterPaused>
                {Array.from(Array(12), (v,k) =><div key={k} style={{width:"100px"}}>1212152</div>)}
            </ByScroll>
        </div>
    }
}   

export default Test