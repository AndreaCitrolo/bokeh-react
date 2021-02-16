import React, { useState, useEffect } from 'react'
import getFlowers from './middleware/getFlowers'
import Axios from 'axios'

const Plot = () =>{
    const [tokenSource] = useState(Axios.CancelToken.source) 
    const [plot, setPlot] = useState(false)
    useEffect(() => {
        console.log("called getFlowers")
        if(!plot){
            getFlowers({cancelToken: tokenSource.token})
                .then((response)=>{
                    console.log("called setPlot")
                    window.Bokeh.embed.embed_item(response.data, 'testPlot')
                    setPlot(true)
                })
                .catch((error) => console.log(error))
        }
        return () => {
            console.log("canceling ...")
            tokenSource.cancel("Plot component cancels request during unmount")
        }
    })

    return (
        <div
            style={{
                width:"100%",
                display:"flex",
                flexDirection: "column",
                justifyContent:"center",
                alignItems: "center"
            }}>
            {!plot && <p>Loading</p>}<div id='testPlot'/>
        </div>
    )
    
}

export default Plot