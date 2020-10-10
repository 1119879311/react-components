import React,{Component, Suspense} from 'react';
import "./utils/utils"
import RotuerCpt from "./router"

class App extends Component<{}>{
  render(){
    return (
        <Suspense fallback={<div className="sus-loading">加载中</div>}>
            <RotuerCpt></RotuerCpt>
        </Suspense>
     
    )
  }
}


export default App ;
