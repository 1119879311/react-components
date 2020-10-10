
import {IByModalType} from "./interface"
import {modalMothodBase} from "./base"
import ByModal from "./Modal"
ByModal.info = (props:IByModalType)=>modalMothodBase({...props,type:'info',typeIoc:'i'})
ByModal.error=(props:IByModalType)=>modalMothodBase({...props,type:'error',typeIoc:'×'})
ByModal.success=(props:IByModalType)=>modalMothodBase({...props,type:'success',typeIoc:'√'})
ByModal.warning=(props:IByModalType)=>modalMothodBase({...props,type:'warning',typeIoc:'!'})
ByModal.comfirm=(props:IByModalType)=>modalMothodBase({...props,type:'comfirm'})
export default ByModal
