import "./index.css"
let index = 0;
const Timer = 3000;
const TYPELIST = ["info","success","error","warning"]
class ByMessage{
    static render(option){
        index++
        const ioncTxt = {info:"i",success:"√",error:"×",warning:"!"}
        let type = TYPELIST.includes(option.type)?option.type:"info";
        let elHtml = `
           <div class="by-message message-${type}" id="by-message-${index}" style="transition: all 2s,opacity:0">
                <span class="message-ionic">${ioncTxt[type]}</span>
                <span class="message-text">${option.msg}</span>
            </div>
        `;
        //
        var lastEl = document.querySelectorAll(".by-message:last-child")[0];
        var lastElTop = lastEl?lastEl.offsetTop:50;
        let rootEl =  document.body||document.documentElement.body;
        rootEl.insertAdjacentHTML("beforeend",elHtml)
        let el = document.getElementById("by-message-"+index);
        // let ClinetH = document.body.clientHeight||document.documentElement.clientHeight
        el.style.top=parseInt(50+lastElTop) +"px";
        el.style.opacity=1;
        setTimeout(()=>{ //第一个定时器，停留显示多久
            if(el){
                el.style.opacity="0.3";
                el.style.top=parseInt(el.offsetTop-50*3)+'px';
                setTimeout(()=>{ //第二个定时器，隐藏动画后多久删除节点
                    rootEl.removeChild(el);
                    el=null;
                },1000)
            }
        },option.timer||Timer)
        
    }

    static info(option={}){
        if(typeof option==="string") option={msg:option}
        option={...{type:"info",msg:"操作完成",timer:Timer},...option}
        this.render(option)
    }
    static error(option={}){
        if(typeof option==="string") option={msg:option}
        option={...{type:"error",msg:"操作失败",timer:Timer},...option}
        this.render(option)
    }
    static success(option={}){
        if(typeof option==="string") option={msg:option}
        option={...{type:"success",msg:"操作成功",timer:Timer},...option}
        this.render(option)
    }
    static warning(option){
        if(typeof option==="string") option={msg:option}
        option={...{type:"warning",msg:"这是一个警告",timer:Timer},...option}
        this.render(option)
    }

}

const message = (option={})=>{
    if(typeof option==="string") option={msg:option}
    option={...{type:"info",msg:"操作完成",timer:3000},...option}
    option.type = TYPELIST.includes(option.type)?option.type:"info";
    return ByMessage[option.type](option)
}
message.error = (option)=>ByMessage.error(option)
message.info = (option)=>ByMessage.info(option)
message.success = (option)=>ByMessage.success(option)
message.warning = (option)=>ByMessage.warning(option)

export default message;