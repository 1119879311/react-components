import React, { Component, Fragment, useState, useEffect} from 'react'
import "./index.css"



export interface Iprops {
    currenPage:number
    pageSize:number,
    totals:number,
    pageNumView?:number,
    pageLayout?:Array<string>,
    change?:(current:number)=>void
}

interface Istate extends Omit<Iprops,'change'>{
    viewsList:Array<number>,
    inputVal:number,
    pageCounts:number
}

interface IchrenCpt extends Istate{
    change:(current:number)=>any,
    jumpChang:(current:any)=>any,

}


// 上一页 prev
const PrevPageCpt:React.FC<IchrenCpt> = ({ currenPage, change }:IchrenCpt) => {
    return (
        <Fragment>
            <button type="button" data-page={currenPage - 1} className={'prveItem ' + (currenPage - 1 < 1 ? "pageItemDisable" : "pageItem")} disabled={currenPage - 1 < 1 ?true:false} onClick={change(currenPage - 1)}>上一页</button>
        </Fragment>
    )
}
// 下一页 next
const NextPageCpt:React.FC<IchrenCpt> = ({ currenPage, pageCounts, change }:IchrenCpt) => {

    return (
        <Fragment>
            <button type="button" data-page={currenPage + 1} className={'nextItem ' + (currenPage + 1 > pageCounts ? "pageItemDisable" : "pageItem")} disabled={currenPage + 1 > pageCounts?true:false} onClick={change(currenPage + 1)}>下一页</button>
        </Fragment>
    )
}
// 首页first
const FirstPageCpt:React.FC<IchrenCpt> = ({ currenPage, change }:IchrenCpt) => {
    return (
        <Fragment>
            <button type="button" data-page={1} className={'firstItem ' + (currenPage - 1 < 1 ? "pageItemDisable" : "pageItem")}  disabled={currenPage - 1 < 1?true:false} onClick={change(1)}>首页</button>
        </Fragment>
    )
}
// 最后一页last
const LastPageCpt :React.FC<IchrenCpt>= ({ currenPage, pageCounts, change }:IchrenCpt) => {
    return (
        <Fragment>
            <button type="button" data-page={pageCounts} className={'lastItem ' + (currenPage + 1 > pageCounts ? "pageItemDisable" : "pageItem")} disabled={currenPage + 1 > pageCounts?true:false} onClick={change(pageCounts)}>尾页</button>
        </Fragment>
    )
}
// 输入框跳转input
const JumpPageCpt:React.FC<IchrenCpt> = ({ currenPage,pageCounts, change }:IchrenCpt) => {
    const [inputData,setInputData] = useState(currenPage)
    const iptChagne = (val:any)=>{
        if (val === "") {
            return setInputData(currenPage)
        }
        var reg = /^[1-9][0-9]*$/;
       
        if(!reg.test(val) || val === currenPage || val > pageCounts){ 
        }else{
            setInputData(Number(val))
        }
    }
    useEffect(()=>{
        setInputData(currenPage)
    },[currenPage])
    return (
        <Fragment>
            <input type="number" className="inpval" value={inputData} onChange={(e) => { iptChagne(e.target.value) }} onKeyPress={(event)=>{ return( /^[1-9]{1,}$/.test(String.fromCharCode(event.keyCode) ) ) }}  />
            <button type="button" className={"jumpbtn " + (!inputData || inputData === currenPage ? "pageItemDisable" : 'pageItem')}  disabled={!inputData || inputData === currenPage} onClick={change(inputData)}>
                Go
            </button>
        </Fragment>
    )
}
// 页码列表paper
const PageListCpt:React.FC<IchrenCpt> = ({ viewsList, currenPage, change }:IchrenCpt) => {
    return (
        <Fragment>
            {
                viewsList.map(itme => <button className={"pageItem " + (itme === currenPage ? 'pageItemActive' : '')}
                    data-page={itme} disabled={itme === currenPage ?true:false}
                    key={itme} onClick={change(itme)}>{itme}</button>)
            }
        </Fragment>
    )
}
//页码总数counts
const PageCountsCpt:React.FC<IchrenCpt> = ({ pageCounts }:IchrenCpt) => <button className="page-counts" >共{pageCounts}页</button>;
//数据总数totles
const PageTotalsCpt:React.FC<IchrenCpt> = ({ totals }:IchrenCpt) => <button className="page-totals">共{totals}条</button>;

type IArrCpt = {
    [key:string]:any
}
const pageLayoutCpt:IArrCpt = {
    "first": FirstPageCpt, "prev": PrevPageCpt, "pager": PageListCpt, "next": NextPageCpt, "last": LastPageCpt, "jump": JumpPageCpt, "counts": PageCountsCpt, "totals": PageTotalsCpt
};

export default  class ByPagination extends Component<Iprops,Istate>{

    readonly state = {
      
        currenPage:this.props.currenPage||1,
        pageSize:this.props.pageSize||15,
        totals:this.props.totals||0,
        pageNumView:this.props.pageNumView||5,
        pageLayout: this.props.pageLayout || ["first", "prev", "pager", "next", "last",'jump', "counts", "totals"],
        viewsList:[],
        inputVal:this.props.currenPage||1,
        pageCounts:0,
       
    }
    // 渲染dom 钩子
    componentDidMount() {
        this.setInit(this.state);
    }
    /**
     * setInit
     */
    public async setInit (option:Iprops){
        // 1.计算页数  = 总数 /每页数
        let { totals, pageSize ,currenPage,pageNumView} = option;
        let pageCounts:number = totals % pageSize > 0 ? Math.ceil(totals / pageSize) : totals / pageSize

        // 2. 重置当前页码
        currenPage = currenPage < 1 ? 1 : currenPage;
        currenPage = currenPage > pageCounts ? pageCounts : currenPage;
       

        // 3. 计算显示页码个数
        pageNumView = pageNumView?pageNumView:5;
        pageNumView = pageNumView < 3 ? 3 : pageNumView;
        pageNumView = pageNumView > pageCounts ? pageCounts : pageNumView;

        //4. 计算页码列表

        var viewsList:number[] = [];
        let startVal:number = currenPage - Math.floor( pageNumView/2);
        startVal = startVal < 1 ? 1 : startVal;

        let endVal:number= startVal+pageNumView;
     
        if (endVal > pageCounts) {
            startVal = pageCounts - pageNumView + 1;
        }
        for (var i = 0; i < pageNumView; i++) {
            viewsList.push(startVal);
            ++startVal;
        }

        this.setState({ currenPage, inputVal: currenPage,pageCounts,pageNumView ,viewsList,totals,pageSize})
    }
    
   
    
    async change(currenPage:number) {
        // await this.setInit();
        if (this.props.change && typeof this.props.change === "function") {
            this.props.change(currenPage)
        }
    }
    async UNSAFE_componentWillReceiveProps(nextprops:any) {
     
        let { currenPage, totals,pageSize } = nextprops;
      
        if (
            (currenPage && currenPage !== this.state.currenPage)
            || (totals !== undefined && totals !== this.state.totals) 
            || (pageSize !== undefined && pageSize !== this.state.pageSize)
        ) { 
            await this.setInit(nextprops);
        }
    }
    render() {
       console.log(this.props)
        let {pageLayout} = this.state
        return (

            <div className="by-pageination">
                {
                    pageLayout.map((keyCpt, index) => {
                        let Cpt = pageLayoutCpt[keyCpt];
                        return Cpt?<Cpt key={index} {...this.state} change={(e:number) => this.change.bind(this, e)}  />:""
                    })
                }

            </div>

        )
    }
    
}


