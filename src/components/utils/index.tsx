

// 实现思路：
//1. 先递归树状数往下找，根据当前属性keys的值如果和value 相等，找到要匹配当前value 所在的项，退出当前循环，把
// 把当前的项的属性kesy对应的值作为value 参数，递归循环，一层层往上找


/**
 * 
 * @param data : 数据源（数状结构tree）
 * @param keys : 与value 匹配的属性keys ,比如'id' ,'index' 对象的值
 * @param rekeys ：要返回的 属性 reskeys，比如'id' ,'index' 对应的值
 * @param value  ：要匹配的值
 * @return 
 */
const data = [
    {id:1,children:[
        {id:1.1,children:null},
        {id:1.2,children:null},
        {id:1.3,children:null},
    ]},
    {id:2,children:[]},
]

// 递归找父级所有指定的rekeys属性的值，比如所有父级id 
export function findTreeParendId<T extends {[key:string]:any}>(dataArr:T[],value:any,keys:string,rekeys:string,childrenKeys?:string,parendKeys?:string):Array<keyof T>{
    let data = JSON.parse(JSON.stringify(dataArr))
    var resArr:Array<keyof T> =  [];
    let childrenKey = childrenKeys||'children';

    if(data.length<0){
        return resArr
    }
    if(!parendKeys){
         // 如果没有指定parendkeys,将递归建立parndId
        let setParedId = (arrs:T[],parenId:any)=>{
            for(let i=0;i<arrs.length;i++){
                let itme:any = arrs[i];
                itme['$parendId'] = parenId;
                if(itme[childrenKey]&& Array.isArray(itme[childrenKey])){
                    setParedId(itme[childrenKey],itme[keys])
                }

            }
        }
        setParedId(data,null)
    }
 
    let parendKey = parendKeys||'$parendId';
    let recursion = (arrs:T[],itmeId:any)=>{
        for(let i=0;i<arrs.length;i++){
      
            let itme:T = arrs[i]
            if(itme[keys]===itmeId){
                resArr.unshift(itme[rekeys]);// 找到匹配的就加进去
                if(itme[parendKey]){
                    recursion(data,itme[parendKey])
                }
               
                break;//跳出当前循环
            }else{
                //找不到，如果有子级，递归往下找
                if(itme[childrenKey]&& Array.isArray(itme[childrenKey])){
                    recursion(itme[childrenKey],itmeId)
                }
            }
        }
    }
    recursion(data,value)
  
    return resArr;
}