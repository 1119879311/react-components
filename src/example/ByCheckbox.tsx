import  React  from "react"
import ByCheckbox ,{ByCheckboxGroup}from "@/components/ByCheckboxs"
interface ITestProps {}
interface ITestState {
    check1:boolean,
    check2:boolean,
    check3:boolean
    group1:object,
    group2:object,
    group3:object,


}


class Test extends React.Component<ITestProps,ITestState> {
    state = {
        check1:false,
        check2:true,
        check3:true,
        group1:[],
        group2:['1'],
        group3:['1']

    }
    render(){
      
        return <div style={{margin:"20px"}}>
            <h3>不受控</h3>
            <ByCheckbox onChange={(e:boolean)=>{this.setState({check1:e})}}>{this.state.check1+''}</ByCheckbox>
            <hr/>

            <h3>不受控,默认值 defaultChecked:boolean</h3>
            <ByCheckbox defaultChecked onChange={(e:boolean)=>{this.setState({check2:e})}}>{this.state.check2+''}</ByCheckbox>
            <hr/>

            <h3>受控,checked:boolean</h3>
            <ByCheckbox checked={this.state.check3} onChange={(e:boolean)=>{this.setState({check3:e})}}>{this.state.check3+''}</ByCheckbox>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <ByCheckbox checked={this.state.check3} onChange={(e:boolean)=>{this.setState({check3:e})}}>{this.state.check3+''}</ByCheckbox>
            <hr/>

            <h3>分组：不受控</h3>
            <ByCheckboxGroup name="group1" onChange={(e:object)=>{this.setState({group1:e})}}>
                     <ByCheckbox value="1" >1</ByCheckbox>
                     <ByCheckbox value="2">2</ByCheckbox>
            </ByCheckboxGroup>
            [{this.state.group1+''}]
            <hr/>

            <h3>分组：不受控，默认值 defaultValue:[]</h3>
            <ByCheckboxGroup name="group2" defaultValue={this.state.group2} onChange={(e:object)=>{this.setState({group2:e})}}>
                     <ByCheckbox value="1" >1</ByCheckbox>
                     <ByCheckbox value="2">2</ByCheckbox>
            </ByCheckboxGroup>
            [{this.state.group2+''}]
            <hr/>

            <h3>分组：受控,默认值 value:[]</h3>
            <ByCheckboxGroup name="group3" value={this.state.group3} onChange={(e:object)=>{this.setState({group3:e})}}>
                     <ByCheckbox value="1" >1</ByCheckbox>
                     <ByCheckbox value="2">2</ByCheckbox>
            </ByCheckboxGroup>
            [{this.state.group3+''}]
            <ByCheckboxGroup name="group4" value={this.state.group3} onChange={(e:object)=>{this.setState({group3:e})}}>
                     <ByCheckbox value="1" >1</ByCheckbox>
                     <ByCheckbox value="2">2</ByCheckbox>
            </ByCheckboxGroup>
            [{this.state.group3+''}]
            <hr/>

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
          
            <hr/>
           

 
        </div>
    }
}   
export default Test