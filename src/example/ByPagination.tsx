import ByPagination from "@/components/ByPagination";
import  React  from "react";

interface ITestProps {}

interface ITestState {
    currenPage:number,
    pageSize:number,
    totals:number,
   
}
class Test extends React.Component<ITestProps,ITestState> {
    state = {
        currenPage:1,
        pageSize:30,
        totals:1000,
    }
    pageChange(e:number){
        console.log(e)
        this.setState({
            currenPage:e
        })
    }
    render(){
       
        return <div style={{margin:"20px"}}>
           
           <pre> {`
                参数：
                currenPage:number  当前页
                pageSize:number,  每页多少条数据
                totals:number, 总数
                pageNumView?:number, 按钮显示个数 默认5
                pageLayout?:Array<string>, 按需显示结构 如：["first", "prev", "pager", "next", "last",'jump', "counts", "totals"]
                change?:(current:number)=>void  页码改变回调事件
            `}</pre>
          <ByPagination 
            currenPage={this.state.currenPage}
            pageNumView={3} 
            pageSize={this.state.pageSize} 
            totals={this.state.totals}
            // pageLayout={["first", "prev", "pager", "next"]}
            change={(e)=>this.pageChange(e)}
            />

        </div>
    }
}   

export default Test