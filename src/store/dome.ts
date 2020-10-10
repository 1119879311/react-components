import {observable, action, computed} from  "mobx"


class DomeStore {

    @observable titile:string = "thi is title"

    @computed get getTitle(){
        return this.titile+'computed';
    }
    
    @action change(title:string):void{
        // 异步处理
        // runInAction(()=>{
        //     this.titile = title
        // })
        this.titile = title
    }
}

export default new DomeStore()