import  React  from "react";

import ByButton from "@/components/ByButton";
import ByModal from "@/components/ByModal";


interface ITestProps {}

interface ITestState {
    modelvisible1:boolean,
    modelvisible2:boolean
}
class Test extends React.Component<ITestProps,ITestState> {
    state = {
        modelvisible1:false,
        modelvisible2:true
    }
    close(){
        this.setState({modelvisible1:false})
    }
   
    btn5() {
        ByModal.comfirm({
            title:"这是标题",
            content:<div>这是comfirm内容</div>,
            isColse:false,
            onOk:(fn:Function)=>{
                console.log("ok")

                console.log(fn)
                fn&&fn()
            },
            onCanle:()=>{
                console.log("onCanle")
            }
        })
    }
    btn4() {
        ByModal.error({
            title:"这是标题",
            content:<div>这是error内容</div>
        })
    }
    btn3() {
        ByModal.warning({
            title:"这是标题",
            content:<div>这是warning内容</div>
        })
    }
  
    btn2() {
        ByModal.success({
            title:"这是标题",
            content:<div>这是success内容</div>
        })
    }
    btn1() {
        ByModal.info({
            title:"这是标题",
            content:<div>这是info内容</div>
        }) 
    }
    render(){
       
        return <div style={{margin:"20px"}}>
           <h3>直接在组件中使用</h3>
            <ByModal title="标题1" visible={this.state.modelvisible1} onCanle={()=>{ this.close() }} onOk={()=>{ this.close() }}>
                内容
            </ByModal>
            <pre> {`
                <ByModal title="标题1" visible={this.state.modelvisible1} onCanle={()=>{ this.close() }} onOk={()=>{ this.close() }}>
                    内容
                </ByModal>`
            }
            </pre>
            <ByButton onClick={()=>{ this.setState({modelvisible1:true}) }}> modal </ByButton>
            <hr/>

            <h3> ByModal.info()</h3>
            <pre>  { ` ByModal.info({ title:"这是标题", content:<div>这是info内容</div> })` }
            </pre>
            <ByButton onClick={()=>{  this.btn1()}}> info </ByButton>
            <hr/>
            
            <h3> ByModal.success()</h3>
            <pre>  { ` ByModal.success({ title:"这是标题",  content:<div>这是success内容</div> })` }
            </pre>
            <ByButton onClick={()=>{  this.btn2()}}> success </ByButton>
            <hr/>

            <h3> ByModal.warning()</h3>
            <pre>  { ` ByModal.warning({ title:"这是标题", content:<div>这是warning内容</div> })` }
            </pre>
            <ByButton onClick={()=>{  this.btn3()}}> warning </ByButton>
            <hr/>
            
            <h3> ByModal.error()</h3>
            <pre>  { ` ByModal.error({ title:"这是标题", content:<div>这是error内容</div> })` }
            </pre>
            <ByButton onClick={()=>{  this.btn4()}}> error </ByButton>
            <hr/>
            
            <h3> ByModal.comfirm()</h3>
            <pre>  { ` ByModal.comfirm({
                    title:"这是标题",
                     content:<div>这是comfirm内容</div> ,
                    isColse:false,
                    onOk:(fn:Function)=>{
                        console.log("ok")

                        console.log(fn)
                        fn&&fn()
                    },
                    onCanle:()=>{
                        console.log("onCanle")
                    }})` }
            </pre>
            <ByButton onClick={()=>{  this.btn5()}}> comfirm </ByButton>
        </div>
    }
    
    
}   

export default Test