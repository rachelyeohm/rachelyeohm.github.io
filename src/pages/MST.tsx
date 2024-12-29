import {useState} from 'react';
import {SquareMatrix} from "../components/matrix/Matrix"
import {kruskal, KruskalResultProps, PrimResultProps} from "../utility/MSTcalculations"
import {prim} from "../utility/MSTcalculations"
import { EdgeProps } from '../utility/MSTcalculations';
import Graph from '../components/graph/Graph';
import convertMatrixStrToFloat from '../utility/convertMatrixStrToFloat';


//for undirected
const MST= () => {

  const [submittedMatrix, setSubmittedMatrix] = useState<string[][]>([])
  const [isMSTPossible, setIsMSTPossible] = useState(true)
  const [kruskalDict, setKruskalDict] = useState<KruskalResultProps>({edges: [], adjacencyMatrix: []});
  const [primDict, setPrimDict] = useState<PrimResultProps>({start_vertex: "", vertices: [], adjacencyMatrix: []});
  const handleFormSubmit = (matrix : string[][]) => {
    setSubmittedMatrix(matrix)
    const kruskalDictNew = kruskal(convertMatrixStrToFloat(matrix))
    setKruskalDict(kruskalDictNew)
    setPrimDict(prim(convertMatrixStrToFloat(matrix), 0))
    setIsMSTPossible(kruskalDictNew.edges.length >= matrix.length - 1)
  }

  return (
    <div>
          <p className='general'>A minimum spanning tree is a subgraph with every vertex of the graph that is also a tree.</p>
          <p className='general'>We will use Kruskal's Algorithm and Prim's Algorithm to calculate the minimum spanning tree.</p>
          <p className='general'>Here, an adjacency matrix is used to represent a graph.</p>
          <SquareMatrix directed = {false} onFormSubmit={handleFormSubmit}/>
          {submittedMatrix.length === 0 ? null  :
          (
            <>
            {isMSTPossible  ? 
            (<div>
                  <DisplayKruskal graphData={convertMatrixStrToFloat(submittedMatrix)} width={200} height={200}
                   kruskalDict={kruskalDict}/>
                  <DisplayPrim graphData={convertMatrixStrToFloat(submittedMatrix)} width={200} height={200}
                  primDict={primDict}/>
            </div>
            ) : 
            <div style = {{display : "flex", justifyContent : "center"}}>
              A minimum spanning tree is not possible.
            </div>
            }</>
          )
        }
          
    </div>
    
  );
};

export default MST;


type DisplayKruskalProps = {
    graphData : number[][],
    width : number,
    height : number,
    kruskalDict : KruskalResultProps,
}

type DisplayPrimProps = {
  graphData : number[][],
  width : number,
  height : number,
  primDict : PrimResultProps,
}

const DisplayKruskal = ({graphData, width, height, kruskalDict} : DisplayKruskalProps) => {
    
    const kruskal_dict = kruskal(graphData);
    console.log(kruskal_dict.edges.length >= graphData.length - 1);
    
    return (
      <div>
        <h2>Kruskal's Algorithm</h2>
        <div style={{ display: 'flex' }}>
          <div>
            <p>Original graph</p>
            <Graph graphData = {graphData} width={width} height={height} directed={false}/>
          </div>
          <div  style={{ marginLeft: 32 }}>
            <EdgeList edges={kruskalDict.edges}/>
          </div>
          <div style={{ marginLeft: 16 }}>
            <p>Minimum Spanning Tree</p>
            <Graph graphData = {kruskalDict.adjacencyMatrix} width={width} height={height} directed={false}/>
          </div>
        </div>
      </div>

      
    );
  };
  

  const DisplayPrim = ({graphData, width, height, primDict} : DisplayPrimProps) => {
    return (
      <div>
        <h2>Prim's Algorithm</h2>
        <div style={{ display: 'flex' }}>
          <div>
            <p>Original graph</p>
            <Graph graphData = {graphData} width={width} height={height} directed={false}/>
          </div>
          <div  style={{ marginLeft: 100 }}>
            <VertexList vertexList = {primDict}/>
          </div>
          <div style={{ marginLeft: 100}}>
            <p>Minimum Spanning Tree</p>
            <Graph graphData = {primDict.adjacencyMatrix} width={width} height={height} directed={false}/>
          </div>
        </div>
      </div>
  
      
    );
  };

  
  const number_to_alpha = (number : number) => String.fromCharCode(97 + number);

  type VertexProps = {
    start_vertex : string, 
    vertices : string[], 
    adjacencyMatrix : number[][]
  }


  const VertexList = ({ vertexList } : {vertexList : VertexProps}) => {
    const listStyle = {
        padding: 0,
        margin: 0,
        listStyleType: 'decimal',
      };
  
      const listItemStyle = {
        padding: 0,
        margin: 0,
        fontSize: '0.9em',  
      };
    return (
      <div>
        <p>Vertices added</p>
        <p style = {listStyle}>Start vertex: {vertexList.start_vertex}</p>
        <ol style={listStyle}>
          {vertexList.vertices.map((vertex, index) => (
            <li key={index} style={listItemStyle}>
              Vertex added: {vertex}
            </li>
          ))}
        </ol>
      </div>
    );
  };

  const EdgeList = ({ edges } : {edges : EdgeProps[]}) => {
    const listStyle = {
        padding: 0,
        margin: 0,
        listStyleType: 'decimal',
      };
  
      const listItemStyle = {
        padding: 0,
        margin: 0,
        fontSize: '0.9em',  
      };
    return (
      <div>
        <p>Edges added</p>
        <ol style={listStyle}>
          {edges.map((edge, index) => (
            <li key={index} style={listItemStyle}>
              First node: {number_to_alpha(edge.source)}, Second node: {number_to_alpha(edge.target)}, Weight: {edge.weight}
            </li>
          ))}
        </ol>
      </div>
    );
  };
  