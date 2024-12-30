import {useEffect, useState} from 'react';
import {SquareMatrix} from "../components/matrix/Matrix"
import {kruskal, KruskalResultProps, PrimResultProps} from "../utility/MSTcalculations"
import {prim} from "../utility/MSTcalculations"
import Graph from '../components/graph/Graph';
import convertMatrixStrToFloat from '../utility/convertMatrixStrToFloat';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//for undirected
const MST= () => {

  const [submittedMatrix, setSubmittedMatrix] = useState<string[][]>([])
  const [isMSTPossible, setIsMSTPossible] = useState(true)
  const [kruskalDict, setKruskalDict] = useState<KruskalResultProps>({edges: [], adjacencyMatrixes: []});
  const [primDict, setPrimDict] = useState<PrimResultProps>({startVertex: "",generatedGraphs : []});
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
                  <p>Original graph</p>
                  <Graph graphData = {convertMatrixStrToFloat(submittedMatrix)} width={600} height={200} directed={false}/>
                  <DisplayKruskal graphData={convertMatrixStrToFloat(submittedMatrix)} width={200} height={200}
                   kruskalDict={kruskalDict}/>
                  <DisplayPrim graphData={convertMatrixStrToFloat(submittedMatrix)} width={200} height={200}
                  primDict={primDict}/>
            </div>) : 
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
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const DisplayKruskal = ({width, height, kruskalDict} : DisplayKruskalProps) => {
    
    const [slides, setSlides] = useState<any[]>([]);

    useEffect(() => {
      // Update kruskalSlides whenever kruskalDict changes
      if (kruskalDict && kruskalDict.adjacencyMatrixes) {
        const newSlides = kruskalDict.adjacencyMatrixes.map((matrix, i) => (
          <>
          <Graph graphData={matrix} width={width} height={height} directed={false}/>
          <div style = {{display: "flex", justifyContent: "center", fontWeight: "normal", 
            fontSize: "16px"}}>
              Edge added from {number_to_alpha(kruskalDict.edges[i].source)} to {number_to_alpha(kruskalDict.edges[i].target)} with
          weight {kruskalDict.edges[i].weight}
          </div>
          </>

        ));
        setSlides(newSlides);
      }
    }, [kruskalDict, width, height]);
    return (
      <div>
        <h2>Kruskal's Algorithm</h2>
        <div style={{ display: 'flex' , justifyContent : "center"  }}>
        <div style = {{width : "300px"}}>
        <Slider {...settings}>
        {slides.map(slide => {
          return (
            <div key={slide}>
              <h3>{slide}</h3>
            </div>
          );
        })}
      </Slider>
        </div>
        </div>
      </div>

      
    );
  };
  

  const DisplayPrim = ({width, height, primDict} : DisplayPrimProps) => {

    const [slides, setSlides] = useState<any[]>([]);
    console.log(primDict.generatedGraphs)
    useEffect(() => {
      // Update kruskalSlides whenever kruskalDict changes
      if (primDict && primDict.generatedGraphs) {
        const newSlides = primDict.generatedGraphs.map((graph, i) => (
          <>
          <Graph graphData={graph.adjacencyMatrix} width={width} height={height} directed={false}/>
          <div style = {{display: "flex", justifyContent: "center", fontWeight: "normal", 
            fontSize: "16px"}}>
              Vertices added: {primDict.generatedGraphs[i].vertices.slice(-1)[0]}
          </div>
          </>

        ));
        setSlides(newSlides);
      }
    }, [primDict, width, height]);
    return (
      <div>
        <h2>Prim's Algorithm</h2>
        Start vertex: {primDict.startVertex}
        <div style={{ display: 'flex', justifyContent : "center" }}>
            <div style = {{width: "300px"}}>
            <Slider {...settings}>
              {slides.map(slide => {
                return (
                  <div key={slide}>
                    <h3>{slide}</h3>
                  </div>
                );
              })}
            </Slider>
            </div>
            
        </div>
      </div>
  
      
    );
  };

  
  const number_to_alpha = (number : number) => String.fromCharCode(97 + number);

