

export const UID:number = 0;

export function GetQuery(search:string):any{
    return new URLSearchParams(search)
} 




const data = [
    {id:1,children:[
        {id:1.1,children:null},
        {id:1.2,children:null},
        {id:1.3,children:[
            {id:1.31,children:null},
            {id:1.32,children:[
                {id:1.321,children:[
                    {id:1.3211,children:null}
                ]},
                {id:1.322,children:null}
            ]}
        ]},
    ]},
   
    {id:2,children:[
        {id:2.1,children:[
            {id:2.11,children:null},
            {id:2.12,children:[
                {id:2.121,children:null}
            ]},
            {id:2.13,children:null},
        ]},
    ]},
]
// 实现思路：
//1. 先递归数组往下找，根据当前属性keys的值如果和value 相等，找到要匹配当前value 所在的项，退出当前循环，把
// 把当前的项的属性kesy对应的值作为value 参数，递归循环，一层层往上找

// 递归法:根据子项的指定字段值找所有父级指定的字段值(rekeys的值)，比如所有父级id (这里不需要知道当前项的父级字段，如pid)

/**
 * 
 * @param dataArr 数据源（数状结构tree）
 * @param value  要匹配的值
 * @param keys  与value 匹配的属性keys ,比如'id' ,'index' 对象的值
 * @param rekeys  要返回的 属性 reskeys，比如'id' ,'index' 对应的值
 * @param childrenKeys 子节点的属性，默认 children
 */
export function findTreeParendId<T extends {[key:string]:any}>(dataArr:T[],value:any,keys:string,rekeys:string,childrenKeys?:string):Array<keyof T>{
    let data = JSON.parse(JSON.stringify(dataArr));//避免引用，做深拷贝处理
    var resArr:Array<keyof T> =  [];
    let childrenKey = childrenKeys||'children';
    if(data.length<0){
        return resArr
    }
    let recursion = (arrs:T[],itmeId:any,parendId?:any)=>{
        for(let i=0;i<arrs.length;i++){
      
            let itme:T = arrs[i]
            if(itme[keys]===itmeId){
                resArr.unshift(itme[rekeys]);// 找到匹配的就加进去
                if(parendId){
                    recursion(data,parendId)
                }
                break;//跳出当前循环
            }else{
                //找不到，如果有子级，递归往下找
                if(itme[childrenKey]&& Array.isArray(itme[childrenKey])){
                    recursion(itme[childrenKey],itmeId,itme[keys])
                }
            }
        }
    }
    recursion(data,value)
    return resArr;
}
console.log(findTreeParendId(data,2.121,"id","id"))

let data1 = [
    {id:1,pid:0,name:"name1"},
    {id:2,pid:0,name:"name2"},
    {id:3,pid:2,name:"name3"},
    {id:4,pid:1,name:"name4"},
    {id:5,pid:4,name:"name5"},
    {id:6,pid:5,name:"name6"},
    {id:7,pid:5,name:"name7"},
    {id:8,pid:7,name:"name8"},

]
//递归法：一维数组转无限极树状结构
/**
 * 
 * @param data 数据源，一维数据
 * @param idKeys 要匹配所在项的唯一idkey 属性字段，比如idkeys ='id',
 * @param pidKeys 要匹配所在项的上级 pidkey 属性字段，比如pidkeys = 'pid',
 * @param pid  要匹配所在项目的上级pidkey 字段的值,比如 pid = 0
 * @param leve 当前所在树状结构的层级数
 */
export function oneToTree<T extends {[key:string]:any}>(data:T[],idKeys?:string,pidKeys?:string,pid?:any,leve?:number){
    let idKey = idKeys||"id"
    let pidKey = pidKeys||'pid'
    let leveKey = "$leve"
    let childrenKey = "children"
    let pidData = pid||0
    let leves = leve||1;
    if(!Array.isArray(data)) return data;
    type resI = T&{$leve:number,children:resI[]};//使用交叉类型
    let resArr:Array<resI> =[];
    data.forEach( (itme:any)=> {
        if (itme[pidKey] === pidData) {
            itme[leveKey] = leves;
            itme[childrenKey] = oneToTree(data, idKey, pidKey, itme[idKey], leves + 1);
            resArr.push(itme)
        }
    })
    
    return resArr

}
let data4 = oneToTree(JSON.parse(JSON.stringify(data1)))
console.log(data4)

// 递归法：数状结构数据找所有子级指定字段值，比如所有子级id,需要指定chiredren字段(在没有上级pid字段的情况)
/**
 * 
 * @param data  数据源（数状结构tree）
 * @param value    给出指定要匹配的值 比 1
 * @param idkeys   被匹配的字段属性 ,比如：id(默认)
 * @param reKeys   要返回的字段属性，比如 id(默认)
 * @param childrenKeys  指定每项的子级字段，比如：children(默认)
 */
export function findChildFiled<T extends {[key:string]:any}>(data:T[],value:any,idkeys?:string,reKeys?:string,childrenKeys?:string){
    let idkey = idkeys||'id';
    let reKey = reKeys||'id';
    let childrenKey = childrenKeys||'children'
    let arrRes:T[] = []; 
    //2.对匹配的所在项，进行递归获取所有子项的指定字段值
    let findReKeys = function(arr:T[]){
        if(!Array.isArray(arr)) return arr;
        for(let i =0;i<arr.length;i++){
           let itme:T = arr[i];
           arrRes.push(itme[reKey])
           findReKeys(itme[childrenKey])
        }
    }
    //1.先递归找到指定值的所在项
    let findNode = function(arr:T[]){
        if(!Array.isArray(arr)) return arr;
        for(let i =0;i<arr.length;i++){
            let itme:T = arr[i];
            if(itme[idkey]===value){
                findReKeys([itme])
                break;
            }else{
                findNode(itme[childrenKey])    
            }
          
        }
   }
   findNode(data)
   return arrRes
} 
console.log(findChildFiled(data,1.3))
console.log(findChildFiled(data,2.1))

/**
 * 一维数组，每项之间依赖字段存在上下层关系，根据依赖项字段，给出指定字段的值找出当前项所有的下级/上级指定字段/所有项
 * @param data ，数据源，一维数组
 * @param value  给出要与依赖字段(PidKeys) 匹配的值
 * @param idKeys    所在项的唯一key ,也是作为下级的依赖字段，默认为id，比如：id,pid
 * @param pidKeys   要与指定value 匹配的字段(不是值,是字段key)，也是所在项的依赖字段,默认为pid,比如，id，pid
 * @param reKeys  要返回的指定字段值，默认为 和idkeys一样的
 * @param field    是否要返回匹配项的所有字段，默认为false
 */
/*
    1. 找所有上级：把每项的存在依赖关系的字段(如pid)作为匹配字段(idkeys),依赖字段作为为匹配字段
    2. 找所有下级：和上级刚好相反
*/
export function findTreenField<T extends {[key:string]:any}>(data:T[],value:any,idKeys?:string,pidKeys?:string,reKeys?:string,field?:boolean){
    let idKey = idKeys||"id"
    let pidKey = pidKeys||"pid"
    let reKey = reKeys||idKey;
    let fields = field||false
    if(!value ||value===0) return [];
    if(!Array.isArray(data)) return [];
    var resArr:any[] = [];
    for (let i = 0; i < data.length; i++) {
        let itme:T = data[i];
        if(itme[pidKey]===value){
            if(fields){
                resArr.push(itme);
            }else{
                resArr.push(itme[reKey]);
            }            
            resArr = resArr.concat(findTreenField(data, itme[idKey],idKey, pidKey, reKey,fields))
        }
        
    }
    return resArr
}
// 找所有子级
console.log(findTreenField(data1,5))
//找所有父级
console.log(findTreenField(data1,5,"pid","id"))

// 数状结构数据转一维数组
/**
 * @param data 数据源(数状结构)
 * @param childrenKeys : 每项的子级字段key，默认为：children
 */
export function treeToOneArr<T extends {[key:string]:any}>(data:T[],childrenKey?:string):T[]{
    let resArr:T[] = [];
    childrenKey = childrenKey||'children'
    for(let i=0;i<data.length;i++){
        let itme:any = data[i];// 这里有点不好，用了any 类型，返回数据的成员掉失了类型检测，
        if(Array.isArray(itme[childrenKey])){
            let child:T[] = itme[childrenKey];
            itme[childrenKey] = [];
            resArr = resArr.concat(itme).concat(treeToOneArr(child,childrenKey))
        }else{
            resArr.push(itme)
        }
    }

    return resArr
}

// console.log(treeToOneArr(data4));


console.log(treeToOneArr(JSON.parse(JSON.stringify(data4))))




