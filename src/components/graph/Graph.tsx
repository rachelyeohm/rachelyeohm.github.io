import CytoscapeComponent from 'react-cytoscapejs';
import {createNodes, directed_stylesheet, undirected_stylesheet} from "./GraphFunction"
import numberToAlpha from '../../utility/numberToAlpha';

type GraphProps = {
    graphData : number[][],
    width : number,
    height : number,
    directed : boolean,
    highlightNodes?: number[]
}

const Graph = ({graphData, width, height, directed, highlightNodes} : GraphProps) => {
    const graphnodes = createNodes(graphData, directed);

    const baseStylesheet = directed ? directed_stylesheet : undirected_stylesheet;

    const highlightStylesheet = highlightNodes && highlightNodes.length > 0
        ? [
            ...baseStylesheet,
            {
                selector: highlightNodes.map(id => `node[id='${numberToAlpha(id)}']`).join(', '),
                style: {
                    'background-color': 'yellow', // Highlight color
                    'border-color': 'red',       // Optional: border styling for emphasis
                    'border-width': 2,
                    'color': 'black'             // Text color (optional)
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


