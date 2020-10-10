
import { observable, action } from 'mobx';
export interface IStoreUserInfo {
    userName?:string;
    uId?:number|string;
    [key:string]:any
}
class UserInfo {
    @observable userName:string = ''
    @observable uId:number|string = ''
    @observable data:IStoreUserInfo = {}
    constructor(){
        let res = localStorage.getItem("USER_INFO")
        if(res){
             this.data = JSON.parse(res);
        }
        
    }
    @action setData(data:IStoreUserInfo={userName:"",uId:''}){
        this.data = {...this.data,...data}
        localStorage.setItem("USER_INFO",JSON.stringify(this.data) )
    }
    @action delData(){
        this.data = {};
        localStorage.removeItem("USER_INFO")
    }


}

export default new UserInfo();