class mLoading{
    constructor(){
        this.el = null;
        this.rootEl  = document.body||document.documentElement.body;
        this.outTime = "0.5s"
    }
    static instances(){
        if (!this.instance) {
            this.instance = new mLoading();
        }
        return this.instance;
    }
     reander(val="加载中..."){
        var strHtml = `
        <div class="m-loading" id="m-loading" 
        style="text-align: center;min-width:280px;opacity:0;transition: all ${this.outTime};border-radius:5px;padding: 8px 20px;font-size: 16px;color: #fff;background: rgba(0,0,0,0.6);position:fixed;top: 30%;left: 50%;transform: translateX(-50%);z-index: 99999;">
            ${val}
        </div>
        `;
        this.rootEl.insertAdjacentHTML("beforeend",strHtml)
        this.el = document.getElementById("m-loading")
    }
     show(val){
        if(!this.el) this.reander(val);
        this.el.style.opacity="1";
    }
     hide(){
        if(!this.el) return;
        this.el.style.opacity="0";
        setTimeout(()=>{
            if(this.el){
                this.rootEl.removeChild(this.el);
                this.el = null;
            }
        },this.outTime)
    }
}

export default mLoading.instances();