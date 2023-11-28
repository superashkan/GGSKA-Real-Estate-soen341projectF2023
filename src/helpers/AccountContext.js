import { createContext, useState, useEffect } from "react";

import axios from "axios";

export const AccountContext = createContext({});

export function AccountContextProvider({children}){
    const [account, setAccount] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if(!account){
            axios.get('/profile').then(({data}) => {
            setAccount(data);
            setReady(true);
            })
            .catch((err)=>{
                console.log(err);
              })
            
        }
    }, [])
    return(
        <AccountContext.Provider value = {{account, setAccount, ready}}>
            {children}
        </AccountContext.Provider>
    )
}