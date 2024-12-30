import CytoscapeComponent from 'react-cytoscapejs';
import {createNodes, directed_stylesheet, undirected_stylesheet} from "./GraphFunction"
import { LIGHT_COLOUR, MAIN_COLOUR } from '../../main';

type GraphProps = {
    graphData : number[][],
    width : number,
    height : number,
    directed : boolean,
    highlightNodes?: string[]
}

const Graph = ({graphData, width, height, directed, highlightNodes} : GraphProps) => {
    const graphnodes = createNodes(graphData, directed);

    const baseStylesheet = directed ? directed_stylesheet : undirected_stylesheet;

    const highlightStylesheet = highlightNodes && highlightNodes.length > 0
        ? [
            ...baseStylesheet,
            {
                selector: highlightNodes.map(id => `node[id='${id}']`).join(', '),
                style: {
                    'background-color': LIGHT_COLOUR, // Highlight color
                    'border-color': MAIN_COLOUR,  
                    'border-width': 2,
                    'color': 'black'
                }
            }
        ]
        : baseStylesheet;

    return (<CytoscapeComponent 
                elements={graphnodes} 
                style={{ width: width, height: height, border: "1px solid black", margin: "auto" }}
                layout =  {{
                  name: 'circle'
                }}
                stylesheet={highlightStylesheet}


            />);
}
export default Graph


