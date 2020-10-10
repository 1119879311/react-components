import ByTree from "@/components/ByTree";
import  React  from "react";



interface ITestProps {}

interface ITestState {
    
}

const SidebarData= [
    {name:"home1",pathname:"/login",id:1},
    {name:"home2",pathname:"/?id=2",id:2,
        childrens:[
            {name:"home1",pathname:"/test?id=1",id:3},
            {name:"home2",pathname:"/?id=1",id:4},
            {name:"home1",pathname:"/home1?id=2",id:5},
            {name:"home3",pathname:"/home3?id=3",id:6},

            {name:"home2",pathname:"/?id=2",id:7,
                childrens:[
                    {name:"home1",pathname:"/?id=1",id:8},
                    {name:"home2",pathname:"/?id=2",id:9}
                ]
            }
        ]
    }

]
class Test extends React.Component<ITestProps,ITestState> {
    state = {
      
    }
 
    render(){
       
        return <div style={{margin:"20px"}}>
          
          <ByTree data={SidebarData}/>

        </div>
    }
}   

export default Test