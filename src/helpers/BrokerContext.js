import { createContext, useState, useEffect } from "react";

import axios from "axios";

export const BrokerContext = createContext({});

export function BrokerContextProvider({children}){
    const [broker, setBroker] = useState(null);
    useEffect(() => {
        if(!broker){
            axios.get('/profile').then(({data}) => {
            setBroker(data);
            })
            
        }
    }, [])
    return(
        <BrokerContext.Provider value = {{broker, setBroker}}>
            {children}
        </BrokerContext.Provider>
    )
}