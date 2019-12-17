import React, { Component, Fragment } from 'react'
import "./index.css"
const PrevPageCpt = ({ currenPage, change }) => {
    return (
        <Fragment>
            <div data-page={currenPage - 1} className={'prveItem ' + (currenPage - 1 < 1 ? "pageItemDisable" : "pageItem")} onClick={change(currenPage - 1)}>上一页</div>
        </Fragment>
    )
}
const NextPageCpt = ({ currenPage, pageCounts, change }) => {
    return (
        <Fragment>
            <div data-page={currenPage + 1} className={'nextItem ' + (currenPage + 1 > pageCounts ? "pageItemDisable" : "pageItem")} onClick={change(currenPage + 1)}>下一页</div>
        </Fragment>
    )
}
const FirstPageCpt = ({ currenPage, change }) => {
    return (
        <Fragment>
            <div data-page={1} className={'firstItem ' + (currenPage - 1 < 1 ? "pageItemDisable" : "pageItem")} onClick={change(1)}>首页</div>
        </Fragment>
    )
}
const LastPageCpt = ({ currenPage, pageCounts, change }) => {
    return (
        <Fragment>
            <div data-page={pageCounts} className={'lastItem ' + (currenPage + 1 > pageCounts ? "pageItemDisable" : "pageItem")} onClick={change(pageCounts)}>尾页</div>
        </Fragment>
    )
}
const JumpPageCpt = ({ currenPage, inputVal, change, jumpchang }) => {
    return (
        <Fragment>
            <div className="jump-main">
                <input type="text" className="inpval" value={inputVal} onChange={(e) => { jumpchang(e.target.value) }} />
                <button type="button" className={"jumpbtn " + (!inputVal || inputVal === currenPage ? "pageItemDisable" : 'pageItem')} onClick={change(inputVal)}>
                    Go
                </button>
            </div>
        </Fragment>
    )
}
const PageListCpt = ({ viewsList, currenPage, change }) => {
    return (
        <Fragment>
            {
                viewsList.map(itme => <div className={"pageItem " + (itme === currenPage ? 'pageItemActive' : '')}
                    data-page={itme}
                    key={itme} onClick={change(itme)}>{itme}</div>)
            }
        </Fragment>
    )
}
const PageCountsCpt = ({ pageCounts }) => <div className="page-counts" >共{pageCounts}页</div>;
const PagetotalsCpt = ({ totals }) => <div className="page-totals">共{totals}条</div>;

const pageLayoutCpt = {
    "first": FirstPageCpt, "prev": PrevPageCpt, "pager": PageListCpt, "next": NextPageCpt, "last": LastPageCpt, "jump": JumpPageCpt, "counts": PageCountsCpt, "totals": PagetotalsCpt
};


export default class Pageination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize: props.pageSize || 10,// 每一页多少条数据
            currenPage: props.currenPage || 1, //当前页面
            totals: props.totals !== undefined ? props.totals : 100, //总数
            pageNumView: props.pageNumView !== undefined ? props.pageNumView : 5, //页码显示个数
            pageCounts: 0,//总页数
            viewsList: [],//当前要渲染的页码
            inputVal: props.currenPage || 1,
            pageLayout: props.pageLayout || ["first", "prev", "pager", "next", "last", "jump", "counts", "totals"]
        }
    }
    async componentWillReceiveProps(nextprops) {
        let { currenPage, totals } = nextprops;
        if ((currenPage && currenPage !== this.state.currenPage)
            || (totals !== undefined && totals !== this.state.totals)) {
            await this.setState({ currenPage, totals, inputVal: currenPage })
            await this.setInit();
        }
    }
    async setInit() {
        await this.getPageCount();
        await this.setCurrentPage();
        await this.setPageList();
    }
    async setCurrentPage() {
        let { currenPage, pageCounts } = this.state;
        currenPage = currenPage < 1 ? 1 : currenPage;
        currenPage = currenPage > pageCounts ? pageCounts : currenPage;
        await this.setState({ currenPage, inputVal: currenPage })
    }
    async getPageCount() {//计算页数  = 总数 /每页数
        let { totals, pageSize } = this.state;
        let pageCounts = totals % pageSize > 0 ? Math.ceil(totals / pageSize) : totals / pageSize
        console.log(pageCounts)
        await this.setState({ pageCounts })
    }
    async setPageList() {
        var viewsList = [];
        //重置页码个数
        let { pageNumView, pageCounts, currenPage } = this.state;
        console.log(currenPage, pageNumView, pageCounts)
        pageNumView = pageNumView < 3 ? 3 : pageNumView;
        pageNumView = pageNumView > pageCounts ? pageCounts : pageNumView;
        let startVal = currenPage - parseInt(pageNumView / 2);//
        startVal = startVal < 1 ? 1 : startVal;

        let endVal = parseInt(startVal + pageNumView);
        console.log(startVal, pageNumView, endVal)
        if (endVal > pageCounts) {
            startVal = pageCounts - pageNumView + 1;
        }
        for (var i = 0; i < pageNumView; i++) {
            viewsList.push(startVal);
            ++startVal;
        }
        console.log(viewsList)
        await this.setState({ pageNumView, viewsList })
    }
    componentDidMount() {
        this.setInit();
    }
    async change(currenPage) {
        currenPage = Number(currenPage);
        if (!currenPage || currenPage === this.state.currenPage
            || currenPage < 1 || currenPage > this.state.pageCounts) return;
        await this.setState({ currenPage, inputVal: currenPage })
        await this.getPageCount();
        await this.setPageList();
        if (this.props.change && typeof this.props.change === "function") {
            this.props.change(currenPage)
        }
    }
    jumpchang(inputVal) {
        let { currenPage, pageCounts } = this.state;
        var reg = /^[1-9][0-9]*$/;
        if (inputVal === "") {
            return this.setState({ inputVal })
        }
        if (!reg.test(inputVal) || inputVal === currenPage || inputVal > pageCounts) {
            this.setState((prevState) => {
                if (!Number(prevState.inputVal)) {
                    inputVal = currenPage;
                } else {
                    inputVal = Number(prevState.inputVal)
                }
                return { inputVal }
            })
        } else {
            this.setState({ inputVal })
        }
    }
    render() {
        let { pageLayout } = this.state;
        return (

            <div className="by-pageination">
                {/* <FirstPageCpt {...this.state} change={(e)=>this.change.bind(this,e)}></FirstPageCpt>
                    <PrevPageCpt {...this.state} change={(e)=>this.change.bind(this,e)}></PrevPageCpt>
                    <PageListCpt {...this.state} change={(e)=>this.change.bind(this,e)}></PageListCpt>
                    <NextPageCpt {...this.state} change={(e)=>this.change.bind(this,e)}></NextPageCpt>
                    <LastPageCpt {...this.state} change={(e)=>this.change.bind(this,e)}></LastPageCpt>
                    <JumpPageCpt {...this.state} change={(e)=>this.change.bind(this,e)} jumpchang={(e)=>this.jumpchang(e)}></JumpPageCpt>
                    <div className="page-counts" >共{pageCounts}页</div>
                    <div className="page-totals">共{totals}条数据</div>  */}
                {
                    pageLayout.map((itme, index) => {
                        let Cpt = pageLayoutCpt[itme];
                        return <Cpt key={index} {...this.state} change={(e) => this.change.bind(this, e)} jumpchang={(e) => this.jumpchang(e)} />
                    })
                }

            </div>

        )
    }
}