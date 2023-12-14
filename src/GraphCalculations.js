
const Graph = ({graphData, width, height}) => {
  
  return (
      
    <div className="general">
        
        <p>Determinant: {determinant(graphData)}</p>
        <p>Symmetric: {symmetric(graphData) ? "Yes" : "No"}</p>
        <p>Euler: {euler(graphData) ? "Yes" : "No"}</p>
        
    </div>
      
    
  );
};
export default Graph;





const sum = (xs) =>
  xs . reduce ((a, b) => a + b, 0)
  
const excluding = (i) => (xs) => 
  [... xs .slice (0, i), ...xs .slice (i + 1)]

const determinant = ([xs, ...xss]) => 
  xs .length == 1
    ? xs [0]
    : sum (xs .map (
        (x, i) => (-1) ** i * x * determinant (xss .map (excluding (i)))
      ))

const sum_arr = (arr) => arr.reduce((partialSum, a) => partialSum + a, 0);

const col = (arr,idx) => arr.map((value,index) =>{ return value[idx]; });

const row = (arr,idx) => arr[idx];

function degree(array){
  let sum = 0;
  for (let i=0; i < array.length; i++){
    alert(row(array,i));
    for (let j=0; j < array[0].length; j++){
      sum += sum_arr(row(array,i)) + sum_arr(col(array,j))
    }

  }
  alert(sum);
  return sum;
}
function symmetric(matrix){
    if (!Array.isArray(matrix) || matrix.length === 0 || matrix[0].length === 0) {
      return false; // Not a valid matrix
    }
  
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    if (rows !== cols) {
      return false; // Not a square matrix, so it can't be symmetric
    }
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (matrix[i][j] !== matrix[j][i]) {
          return false; // The matrix is not symmetric if the corresponding elements are not equal
        }
      }
    }
  
    return true; // The matrix is symmetric

}

function euler(matrix) {
  const numVertices = matrix.length;

  // Step 1: Check if all vertices have even degree
  for (let i = 0; i < numVertices; i++) {
    let degree = 0;
    for (let j = 0; j < numVertices; j++) {
      degree += matrix[i][j];
    }
    if (degree % 2 !== 0) {
      return false; // Not all vertices have even degree
    }
  }

  // Step 2: Check if the graph is connected
  const visited = new Array(numVertices).fill(false);
  let count = 0;

  // Depth-first search function to traverse the graph
  function DFS(v) {
    visited[v] = true;
    count++;
    for (let i = 0; i < numVertices; i++) {
      if (matrix[v][i] && !visited[i]) {
        DFS(i);
      }
    }
  }

  DFS(0); // Start DFS traversal from the first vertex

  return count === numVertices; // Graph is Eulerian if and only if it is connected
}


