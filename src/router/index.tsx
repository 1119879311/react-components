import React from 'react';
import {BrowserRouter as Router, Route,Switch, Redirect } from 'react-router-dom'

import data,{IDataRouter} from "./routerData"


function LoadRouter(data:IDataRouter[]){
    return data.map((Itme,index)=>{
        if(Itme.childrens&&Itme.childrens.length>0){
            let ops = {path:Itme.path,exact:Itme.exact}
            return <Route {...ops} key={index}><Itme.component >
                        <Switch>
                            { LoadRouter(Itme.childrens)}
                        </Switch>
                </Itme.component></Route> 
        }else{
            return  <Route key={index} path={Itme.path} exact={Itme.exact}><Itme.component title={Itme.title}/></Route>
        }
    }) 
}

export default function RouterCpt(){
    return   (
        <Router> 
            <Switch> {LoadRouter(data)}</Switch>
            <Redirect to="/"/>
        </Router> 
    )
}

