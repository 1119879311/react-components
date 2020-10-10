import React, { useEffect, useRef } from "react"
import "./index.less"
interface IByCarousle {
    dir?:string
    speed?:number
    delay?:number
    easing?:string
    isDots?:boolean
    autoplay?:boolean
    change?:Function
    children?:any
    className?:string
}

const ByCarousel = (props:IByCarousle)=>{
    let {dir="bottom",speed=500,delay=3000,easing="ease",isDots = true,autoplay=true,change = function(){}} = props
    let carouselRef = useRef<HTMLDivElement>(null)
    let ListRef = useRef<HTMLDivElement>(null)
    let CR:DOMRect|null;
    let  itmes:NodeListOf<HTMLDivElement>|null
    let  DotsItmes:NodeListOf<HTMLDivElement>|null
    let count = Array.isArray(props.children)?props.children.length*2:0
    let index = 0
    useEffect(()=>{
        //获取容器宽度高度
          // eslint-disable-next-line
        CR = carouselRef.current!.getBoundingClientRect()
        if(dir==="left"||dir==="right"){
            let mainDom = carouselRef.current!.querySelector(".by-carousel-main") as HTMLDivElement
            mainDom.style.height = `${CR.height}px`
            ListRef.current!.style.cssText=`width:${CR.width}px;height:${CR.height*count}px`
        }else{
           
            ListRef.current!.style.cssText=`width:${CR.width*count}px;height:${CR.height}px`
        }
        
        //设置itme
          // eslint-disable-next-line
        itmes= carouselRef.current!.querySelectorAll(".by-carousel-itme")
        // eslint-disable-next-line
        DotsItmes = carouselRef.current!.querySelectorAll(".by-carousel-dots-itme")

       for(let i =0;i<itmes.length;i++){
            itmes[i].style.cssText=`width:${CR.width}px;height:${CR.height}px`
         
       }
       setDotsActive()
       carouselRef.current!.addEventListener("mouseenter",function(){
           Timer&&clearInterval(Timer)
       },false)
       carouselRef.current!.addEventListener("mouseleave",function(){
            autoplay&&(Timer = setInterval(autoplayFn,delay))
        },false)
       //定时器
       let  Timer:any = null

       const autoplayFn = ()=>{
            index++;
            if(index>count/2){ //4
                ListRef.current!.style.transition = ''
                ListRef.current!.style.transform = `translate3d(0,0,0)`
                // eslint-disable-next-line
                index = 1
               
            }
            setTimeout(()=>{
                carousel()
            },5)
           
       }
       if(autoplay){
            Timer = setInterval(autoplayFn,delay)
            return ()=>{
                clearInterval(Timer)
            }
       }
       
    },[dir,autoplay])
    // 设置当前指示点激活
    const setDotsActive = (ids=0)=>{
          // eslint-disable-next-line
        DotsItmes = DotsItmes||carouselRef.current!.querySelectorAll(".by-carousel-dots-itme")
        for(let i=0;i<DotsItmes?.length;i++){
            DotsItmes![i].classList.remove("active")
        }
        DotsItmes![ids]?.classList.add("active")
    }
    // 滑动
    const carousel = ()=>{
        CR = CR||carouselRef.current!.getBoundingClientRect()
        ListRef.current!.style.transition = `transform ${speed}ms ${easing}`
        if(dir==="left"||dir==="right"){
            ListRef.current!.style.transform = `translate3d(0,-${CR!.height*index}px,0)`
        }else{
            ListRef.current!.style.transform = `translate3d(-${CR!.width*index}px,0,0)`
        }
        let j = index===count/2?0:index
        change&&change(j)
        setDotsActive(j)
    }
    // 点击指示点事件
    const clickDots = (ids:number)=>{
         // eslint-disable-next-line
        index= ids
        carousel()
    }
    // 渲染
    function __render(inde:number){
        if(!Array.isArray(props.children)) return ''
        return   props.children.map((itme,ids)=>{
            return <div className="by-carousel-itme"  data-index={ids+inde} key={ids}>{itme}</div>
        })
    }
    //渲染指示点
    function __renderDots(){
        if(!isDots) return ''
        return <ul className="by-carousel-dots">
                {Array.isArray(props.children)?
                    props.children.map((_,ids)=>{
                         return <li className="by-carousel-dots-itme" key={ids} onClick={()=>clickDots(ids)}></li>
                    })
                :''} 
            </ul>
    }

    return (
        <div className={`by-carousel by-carousel-${dir}`} ref={carouselRef}>
            <div className="by-carousel-warp">
                <div className="by-carousel-main">
                    <div className="by-carousel-list" ref={ListRef}>
                        {__render(0)}
                        {__render(props.children?.length)}
                    </div>
                </div>
                {__renderDots()}
            </div>

        </div>
    )
}

export default ByCarousel