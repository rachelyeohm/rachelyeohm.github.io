import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';


const number_to_alpha = (number) => String.fromCharCode(97 + number);
function getDefaultStylesheet() {
  return [{ selector: "node", style: { label: "data(label)" } }];
}

function createNodes(graphData, directed){

    var graphnodes = [];
    for (let i=0; i < graphData.length; i++){
        graphnodes.push({data: {id : number_to_alpha(i), label: number_to_alpha(i)}})
    } 
    if (directed){
      for (let i=0; i < graphData.length; i++){
        for (let j=0; j < graphData.length; j++){
            if (graphData[i][j] > 0){
              graphnodes.push({data: {source: number_to_alpha(i), target: number_to_alpha(j), label: graphData[i][j]}})
            }
        }
      }
    } else {
      const visitedEdges = [];

      for (let i = 0; i < graphData.length; i++) {
        for (let j = 0; j < i; j++) {
          if (graphData[i][j] > 0) {
            const edgeKey = [i,j];
            const reverseEdgeKey = [j,i];

            // Check if the edge or its reverse has been visited before
            if (!visitedEdges.includes(edgeKey) && !visitedEdges.includes(reverseEdgeKey)) {
              graphnodes.push({
                data: {
                  source: number_to_alpha(j),
                  target: number_to_alpha(i),
                  label: graphData[i][j]
                }
              });

              visitedEdges.push(edgeKey);
            }
          }
        }
        if (graphData[i][i] > 0) {
          graphnodes.push({
              data: {
                source: number_to_alpha(i),
                target: number_to_alpha(i),
                label: graphData[i][i]
              }
            });

        }
      }
    };



    return graphnodes;
}

const directed_stylesheet = [
  {
    selector: 'node[label]',
    style: {
      label: 'data(label)',
      "text-valign": "center",
      "text-halign": "center"
    },
  },
  {
    selector: 'edge[label]',
    style: {
      label: 'data(label)',
      'curve-style': 'bezier',
      width: 2,
      targetArrowShape: 'triangle',


    },
  },
];

const undirected_stylesheet = [
  {
    selector: 'node[label]',
    style: {
      label: 'data(label)',
      "text-valign": "center",
      "text-halign": "center"
    },
  },
  {
    selector: 'edge[label]',
    style: {
      label: 'data(label)',
      'curve-style': 'bezier',
      width: 2,


    },
  },
];

export default function Graph(props) {
    console.log(props.graphData);
    const graphnodes = createNodes(props.graphData, props.directed);

    return (<CytoscapeComponent 
                elements={graphnodes} 
                style={{ width: props.width, height: props.height, border: "1px solid black", margin: "auto" }}
                layout =  {{
                  name: 'circle'
                }}
                stylesheet={props.directed ? directed_stylesheet : undirected_stylesheet}


            />);

};

export function PrimGraph(props){

  // TODO: add options for selected. maybe a usestate.
    const graphnodes = createNodes(props.graphData, props.directed);
    // componentDidMount = () => {
    //   this.setState({
    //     w: window.innerWidth,
    //     h:window.innerHeight
    //   })
    //   this.setUpListeners()
    // }

    // setUpListeners = () => {
    //   this.cy.on('click', 'node', (event) => {
    //     console.log(event.target)
    //   })
    // }
    return (<CytoscapeComponent 
                elements={graphnodes} 
                style={{ width: props.width, height: props.height, border: "1px solid black", margin: "auto" }}
                layout =  {{
                  name: 'circle'
                }}
                stylesheet={props.directed ? directed_stylesheet : undirected_stylesheet}
                //cy = {(cy) => {this.cy = cy}}


            />);
}