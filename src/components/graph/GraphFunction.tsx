import cytoscape from "cytoscape"
const number_to_alpha = (number : number) => String.fromCharCode(97 + number);
function getDefaultStylesheet() {
  return [{ selector: "node", style: { label: "data(label)" } }];
}

export function createNodes(graphData : number[][], directed: boolean){

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