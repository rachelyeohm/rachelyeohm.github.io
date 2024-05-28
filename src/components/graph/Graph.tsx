import React from "react"
import CytoscapeComponent from 'react-cytoscapejs';
import {createNodes, directed_stylesheet, undirected_stylesheet} from "./GraphFunction"

type GraphProps = {
    graphData : number[][],
    width : number,
    height : number,
    directed : boolean
}

const Graph = ({graphData, width, height, directed} : GraphProps) => {
    const graphnodes = createNodes(graphData, directed);

    return (<CytoscapeComponent 
                elements={graphnodes} 
                style={{ width: width, height: height, border: "1px solid black", margin: "auto" }}
                layout =  {{
                  name: 'circle'
                }}
                stylesheet={directed ? directed_stylesheet : undirected_stylesheet}


            />);
}
export default Graph


