import cytoscape from "cytoscape"

import numberToAlpha from "../../utility/numberToAlpha";

export function createNodes(graphData : number[][], directed: boolean){

    var graphnodes = [];
    for (let i=0; i < graphData.length; i++){
        graphnodes.push({data: {id : numberToAlpha(i), label: numberToAlpha(i)}})
    } 
    if (directed){
      for (let i=0; i < graphData.length; i++){
        for (let j=0; j < graphData.length; j++){
            if (graphData[i][j] > 0){
              graphnodes.push({data: {source: numberToAlpha(i), target: numberToAlpha(j), label: graphData[i][j]}})
            }
        }
      }
    } else {
      const visitedEdges : number[][] = [];

      for (let i = 0; i < graphData.length; i++) {
        for (let j = 0; j < i; j++) {
          if (graphData[i][j] > 0) {
            const edgeKey = [i,j];
            const reverseEdgeKey = [j,i];

            // Check if the edge or its reverse has been visited before
            if (!visitedEdges.includes(edgeKey) && !visitedEdges.includes(reverseEdgeKey)) {
              graphnodes.push({
                data: {
                  source: numberToAlpha(j),
                  target: numberToAlpha(i),
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
                source: numberToAlpha(i),
                target: numberToAlpha(i),
                label: graphData[i][i]
              }
            });

        }
      }
    };



    return graphnodes;
}

export const directed_stylesheet : cytoscape.Stylesheet[] = [
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
  
export const undirected_stylesheet : cytoscape.Stylesheet[] = [
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