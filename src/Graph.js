import { useState, useRef} from "react";
import cytoscape from 'cytoscape';

import React, { Component } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

export default class Graph extends Component{

  constructor(props){
    super(props);
    
}
    
    getDefaultStylesheet = () => [{ selector: "node", style: { label: "data(label)" } }];
    createNodes(graphData, directed) {
  
          var graphnodes = [];
          for (let i=0; i < graphData.length; i++){
              graphnodes.push({data: {id : String.fromCharCode(97 + i), label: String.fromCharCode(97 + i)}})
          } 
          if (directed){
            for (let i=0; i < graphData.length; i++){
              for (let j=0; j < graphData.length; j++){
                  if (graphData[i][j] > 0){
                    graphnodes.push({data: {source: String.fromCharCode(97 + j), target: String.fromCharCode(97 + i), label: graphData[i][j]}})
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
                        source: String.fromCharCode(97 + j),
                        target: String.fromCharCode(97 + i),
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
                      source: String.fromCharCode(97 + i),
                      target: String.fromCharCode(97 + i),
                      label: graphData[i][i]
                    }
                  });
      
              }
            }
          };
      
        
          
          return graphnodes;
      }
      directed_stylesheet = [
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

    undirected_stylesheet = [
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

    graphnodes = this.createNodes(this.props.graphData, this.props.directed);
    render(){
      return (<CytoscapeComponent 
        elements={this.graphnodes} 
        style={{ width: this.props.width, height: this.props.height, border: "1px solid black", margin: "auto" }}
        layout =  {{
          name: 'circle'
        }}
        stylesheet={this.props.directed ? this.directed_stylesheet : this.undirected_stylesheet}

      
    />);
    }
} 

export class PrimGraph extends Graph{

  constructor(props){
    super(props);
    }
    componentDidMount = () => {
      this.setUpListeners()
    }
    
    setUpListeners = () => {
      this.cy.on('click', 'node', (event) => {
        console.log(event.target)
      })
    }    
    render(){
      return (<CytoscapeComponent 
        elements={this.graphnodes} 
        style={{ width: this.props.width, height: this.props.height, border: "1px solid black", margin: "auto" }}
        layout =  {{
          name: 'circle'
        }}
        stylesheet={this.props.directed ? this.directed_stylesheet : this.undirected_stylesheet}
        cy = {(cy) => {this.cy = cy}}

      
    />);
    }
} 



  
// }
// function getDefaultStylesheet() {
//   return [{ selector: "node", style: { label: "data(label)" } }];
// }

// function createNodes(graphData, directed){
  
//     var graphnodes = [];
//     for (let i=0; i < graphData.length; i++){
//         graphnodes.push({data: {id : String.fromCharCode(97 + i), label: String.fromCharCode(97 + i)}})
//     } 
//     if (directed){
//       for (let i=0; i < graphData.length; i++){
//         for (let j=0; j < graphData.length; j++){
//             if (graphData[i][j] > 0){
//               graphnodes.push({data: {source: String.fromCharCode(97 + j), target: String.fromCharCode(97 + i), label: graphData[i][j]}})
//             }
//         }
//       }
//     } else {
//       const visitedEdges = [];

//       for (let i = 0; i < graphData.length; i++) {
//         for (let j = 0; j < i; j++) {
//           if (graphData[i][j] > 0) {
//             const edgeKey = [i,j];
//             const reverseEdgeKey = [j,i];

//             // Check if the edge or its reverse has been visited before
//             if (!visitedEdges.includes(edgeKey) && !visitedEdges.includes(reverseEdgeKey)) {
//               graphnodes.push({
//                 data: {
//                   source: String.fromCharCode(97 + j),
//                   target: String.fromCharCode(97 + i),
//                   label: graphData[i][j]
//                 }
//               });

//               visitedEdges.push(edgeKey);
//             }
//           }
//         }
//         if (graphData[i][i] > 0) {
//           graphnodes.push({
//               data: {
//                 source: String.fromCharCode(97 + i),
//                 target: String.fromCharCode(97 + i),
//                 label: graphData[i][i]
//               }
//             });

//         }
//       }
//     };

  
    
//     return graphnodes;
// }

// const directed_stylesheet = [
//   {
//     selector: 'node[label]',
//     style: {
//       label: 'data(label)',
//       "text-valign": "center",
//       "text-halign": "center"
//     },
//   },
//   {
//     selector: 'edge[label]',
//     style: {
//       label: 'data(label)',
//       'curve-style': 'bezier',
//       width: 2,
//       targetArrowShape: 'triangle',
                  

//     },
//   },
// ];

// const undirected_stylesheet = [
//   {
//     selector: 'node[label]',
//     style: {
//       label: 'data(label)',
//       "text-valign": "center",
//       "text-halign": "center"
//     },
//   },
//   {
//     selector: 'edge[label]',
//     style: {
//       label: 'data(label)',
//       'curve-style': 'bezier',
//       width: 2,
                  

//     },
//   },
// ];

// export default function Graph(props) {

  
//     const graphnodes = createNodes(props.graphData, props.directed);
    
//     return (<CytoscapeComponent 
//                 elements={graphnodes} 
//                 style={{ width: props.width, height: props.height, border: "1px solid black", margin: "auto" }}
//                 layout =  {{
//                   name: 'circle'
//                 }}
//                 stylesheet={props.directed ? directed_stylesheet : undirected_stylesheet}

              
//             />);
  
// };

// export function PrimGraph(props){

//   // add options for selected. maybe a usestate.
//     const graphnodes = createNodes(props.graphData, props.directed);
//     // componentDidMount = () => {
//     //   this.setState({
//     //     w: window.innerWidth,
//     //     h:window.innerHeight
//     //   })
//     //   this.setUpListeners()
//     // }
    
//     // setUpListeners = () => {
//     //   this.cy.on('click', 'node', (event) => {
//     //     console.log(event.target)
//     //   })
//     // }
//     return (<CytoscapeComponent 
//                 elements={graphnodes} 
//                 style={{ width: props.width, height: props.height, border: "1px solid black", margin: "auto" }}
//                 layout =  {{
//                   name: 'circle'
//                 }}
//                 stylesheet={props.directed ? directed_stylesheet : undirected_stylesheet}
//                 //cy = {(cy) => {this.cy = cy}}

              
//             />);
// }