import { createContext, useState, useEffect } from "react";

import axios from "axios";

export const BrokerContext = createContext({});

export function BrokerContextProvider({children}){
    const [broker, setBroker] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if(!broker){
            axios.get('/profile').then(({data}) => {
            setBroker(data);
            setReady(true);
            })
            
        }
    }, [])
    return(
        <BrokerContext.Provider value = {{broker, setBroker, ready}}>
            {children}
        </BrokerContext.Provider>
    )
}