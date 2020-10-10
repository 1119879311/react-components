import  React  from "react"
import ByRadio ,{ByRadioGroup}from "@/components/ByRadio"
interface ITestProps {}
interface ITestState {
    check1:boolean,
    check2:boolean,
    check3:boolean
    group1:string|number,
    group2:string|number,
    group3:string|number,


}


class Test extends React.Component<ITestProps,ITestState> {
    state = {
        check1:false,
        check2:true,
        check3:true,
        group1:'',
        group2:'1',
        group3:'1'

    }
    render(){
      
        return <div style={{margin:"20px"}}>
             <h3>不受控</h3>
            <ByRadio onChange={(e:boolean)=>{this.setState({check1:e})}}>{this.state.check1+''}</ByRadio>
            <hr/>

            <h3>不受控,默认值 defaultChecked:boolean</h3>
            <ByRadio defaultChecked onChange={(e:boolean)=>{this.setState({check2:e})}}>{this.state.check2+''}</ByRadio>
            <hr/>

            <h3>受控,checked:boolean</h3>
            <ByRadio checked={this.state.check3} onChange={(e:boolean)=>{this.setState({check3:e})}}>{this.state.check3+''}</ByRadio>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <ByRadio checked={this.state.check3} onChange={(e:boolean)=>{this.setState({check3:e})}}>{this.state.check3+''}</ByRadio>
            <hr/>
           
            <h3>分组：不受控</h3>
            <ByRadioGroup name="group1" onChange={(e:any)=>{this.setState({group1:e})}}>
                     <ByRadio value="1" >1</ByRadio>
                     <ByRadio value="2">2</ByRadio>
            </ByRadioGroup>
            [{this.state.group1+''}]
            <hr/>
           
            <h3>分组：不受控，默认值 defaultValue:[]</h3>
            <ByRadioGroup name="group2" defaultValue={this.state.group2} onChange={(e:any)=>{this.setState({group2:e})}}>
                     <ByRadio value="1" >1</ByRadio>
                     <ByRadio value="2">2</ByRadio>
            </ByRadioGroup>
            [{this.state.group2+''}]
            <hr/>


            <h3>分组：受控,默认值 value:[]</h3>
            <ByRadioGroup name="group3" value={this.state.group3} onChange={(e:any)=>{this.setState({group3:e})}}>
                     <ByRadio value="1" >1</ByRadio>
                     <ByRadio value="2">2</ByRadio>
            </ByRadioGroup>
            [{this.state.group3+''}]
            <ByRadioGroup name="group4" value={this.state.group3} onChange={(e:any)=>{this.setState({group3:e})}}>
                     <ByRadio value="1" >1</ByRadio>
                     <ByRadio value="2">2</ByRadio>
            </ByRadioGroup>
            [{this.state.group3+''}]
            <hr/>

            <h3>尺寸</h3>
            <ByRadio size="small">small</ByRadio>
            <ByRadio size="default">default</ByRadio>
            <ByRadio size="lager">lager</ByRadio>
            <hr/>

            <h3>禁用状态</h3>
            <ByRadio disabled>disabled</ByRadio>
            {/*

           
           

          

          

            <h3>尺寸</h3>
            <ByCheckbox size="small">small</ByCheckbox>
            <ByCheckbox size="default">default</ByCheckbox>
            <ByCheckbox size="lager">lager</ByCheckbox>
            <hr/>

            <h3>半选状态</h3>
            <ByCheckbox indeterminate>indeterminate</ByCheckbox>
          
            <hr/>

            <h3>禁用状态</h3>
            <ByCheckbox disabled>disabled</ByCheckbox>
          
            <hr/> */}
           

 
        </div>
    }
}   
export default Test