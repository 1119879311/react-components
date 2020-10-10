import  React from "react";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {GetQuery} from "@/utils/utils"
import ByPagination,{Iprops as IPageProp} from "@/components/ByPagination"
import ByCheckbox,{ByCheckboxGroup} from "@/components/ByCheckbox"

import {createBrowserHistory} from "history"
// import ByRadio,{ByRadioGroup} from "@/components/ByRadio"
// import ByRadio from "@/components/ByRadio"




import domeStore from "@/store/dome"
import gUserInfo from "@/store/userInfoStore";
import { observer } from "mobx-react";
import {Button} from "antd"


const byHistory = createBrowserHistory();
interface IProps extends  RouteComponentProps {};

interface Istate extends IPageProp {
    checked1:boolean,
    checked2:boolean,
    allchecked:boolean,
    groupCheck:string[],
    radioChecked1:boolean
    [key:string]:any
}

function Labels(props:any){
    return <span>sfsdf</span>
}

@observer
class Home extends React.Component<IProps,Istate> {
        state = {
            currenPage:1,
            pageSize:30,
            totals:1000,
            checked1:false,
            checked2:false,

            allchecked:false,
            groupCheck:[],
            radioChecked1:false,
            radioChecked2:1
        }
        public componentDidMount(){
            console.log(this.props)
        }
        pageChange(e:number){
            console.log(e)
            this.setState({
                currenPage:e
            })
        }

        clickCheck(){
            console.log(1212)
            byHistory.push("test?id=1");
            this.setState({
                allchecked:true
            })
        }
        callbackCheck(checked:boolean,fileds:keyof Istate){
            console.log("checked",checked)
            this.setState({
                allchecked:checked,
                [fileds]:checked
            })
        }
        callbackAllCheck(checked:boolean){
            this.setState({
                allchecked:checked,
                checked1:checked,
                checked2:checked,
                groupCheck:['A','B'],
                radioChecked1:true
            })
        }
        render(){
            return <div>home{GetQuery(this.props.location.search).get("id")}
                {gUserInfo.data.userName}
                {gUserInfo.data.uId}
                    {domeStore.titile}
                <Button type="primary" onClick={()=>domeStore.change("sfll")}>点击</Button>
                <Button type="primary" onClick={
                    ()=>this.clickCheck() }>点击全选</Button>

                <ByPagination 
                    currenPage={this.state.currenPage}
                    // pageNumView={5} 
                    pageSize={this.state.pageSize} 
                    totals={this.state.totals}
                    // pageLayout={["first", "prev", "pager", "next"]}
                    change={(e)=>this.pageChange(e)}
                />
                <ByCheckbox onChange={(e:boolean)=>{console.log(e)}} ><Labels data={{a:1}} />这是什么</ByCheckbox>
                <ByCheckbox  defaultChecked={true} onChange={(e:boolean)=>{console.log(e)}}><Labels data={{a:1}}/>不是法拉利第三方</ByCheckbox>

                <br/>

                <ByCheckbox onChange={this.callbackAllCheck.bind(this)} checked={this.state.allchecked} >全选</ByCheckbox>
                <ByCheckbox onChange={(e:boolean)=>this.callbackCheck(e,"checked1")} size="default" checked={this.state.checked1}>单选1</ByCheckbox>
                <ByCheckbox onChange={(e:boolean)=>this.callbackCheck(e,"checked2")} size="lager" checked={this.state.checked2}>单选2</ByCheckbox>
                
                {/* <Checkbox><div>sfsdf</div></Checkbox> */}
                <ByCheckboxGroup   name="bycheckbox" value={this.state.groupCheck}   onChange={(value:string[])=>{
                        //  this.setState({groupCheck:value});
                         console.log(value)
                    }} >
                        <ByCheckbox  indeterminate={true} value="C"  size="lager">3</ByCheckbox>
                        <ByCheckbox  value="D" size="lager">4</ByCheckbox>
                  
                    <div>
                        <div> <ByCheckbox value="A"  size="lager">1</ByCheckbox></div>
                       <div><ByCheckbox  value="B" size="lager">2</ByCheckbox> </div>
                    </div> 
                    
                </ByCheckboxGroup>
               
            </div>
        }
}
export default withRouter(Home)