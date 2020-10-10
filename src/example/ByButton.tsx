import  React,{Component}  from "react";
import ByButton from "@/components/ByButton";
class TestByButton extends Component {
    render(){
        return <div style={{margin:"20px"}}>
      
            <div>
                <h3>默认</h3>
                <ByButton>默认</ByButton> &nbsp; &nbsp;
                <ByButton round>默认圆角</ByButton>
                <div style={{height:"4px"}}></div>
                <hr/>

                <h3>主题 type:'primary'|'success'|'warning'|'danger'</h3>
                <ByButton type="primary">primary</ByButton> &nbsp; &nbsp;
                <ByButton type="success">success</ByButton> &nbsp; &nbsp;
                <ByButton type="warning">warning</ByButton>&nbsp; &nbsp;
                <ByButton type="danger">danger</ByButton>&nbsp; &nbsp;
                <div style={{height:"4px"}}></div>
                <hr/>


                <h3>圆角按钮 round:boolean</h3>
                <ByButton type="primary" round>primary</ByButton> &nbsp; &nbsp;
                <ByButton type="success" round>success</ByButton> &nbsp; &nbsp;
                <ByButton type="warning" round>warning</ByButton>&nbsp; &nbsp;
                <ByButton type="danger" round>danger</ByButton>&nbsp; &nbsp;
                <div style={{height:"4px"}}></div>
                <hr/>

                <h3>大小尺寸 size:'small'|'default'|'lager'</h3>
                <ByButton type="primary"  size="small">primary</ByButton> &nbsp; &nbsp;
                <ByButton type="primary">primary</ByButton> &nbsp; &nbsp;
                <ByButton type="success"  size="lager">success</ByButton> &nbsp; &nbsp;

                <ByButton type="primary" round size="small">primary</ByButton> &nbsp; &nbsp;
                <ByButton type="primary" round>primary</ByButton> &nbsp; &nbsp;
                <ByButton type="success" round size="lager">success</ByButton> &nbsp; &nbsp;
                <div style={{height:"4px"}}></div>
                <hr/>

                <h3>块级按钮 block:boolean</h3>
                <ByButton block round>primary</ByButton>&nbsp;
                <ByButton type="primary" block round>primary</ByButton>&nbsp;
                <ByButton type="success" block round>success</ByButton> &nbsp;
                <ByButton type="warning" block round>warning</ByButton>&nbsp;
                <ByButton type="danger" block round>danger</ByButton>&nbsp;
                <div style={{height:"4px"}}></div>
                <hr/>

                <h3>禁用按钮 disabled:boolean</h3>
                <ByButton type="primary" disabled >disabled</ByButton> &nbsp; &nbsp;
                <ByButton type="primary" disabled round>disabled</ByButton> &nbsp;&nbsp; 
                <div style={{height:"4px"}}></div>
                <ByButton type="success" disabled block >disabled</ByButton> &nbsp; 
                <ByButton type="success" disabled block round>disabled</ByButton> &nbsp; 
                <div style={{height:"4px"}}></div>
                <hr/>
            </div>
           
        </div>
    }
}   

export default TestByButton