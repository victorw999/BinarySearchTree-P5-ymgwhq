/**
 * P5
 */


function setup() {

  createCanvas(400, 500);
  // background('black') 
  background(31)

  // let bst = new Node();
  // bst.insert(5);
  // bst.insert(3);
  // bst.insert(7);
  // bst.insert(10);
  // bst.insert(12);
  // bst.insert(11);
  // bst.insert(13);

  // bst.traverse();

  let bst = new Node(6);
  bst.insert(5);
  bst.insert(3);
  bst.insert(7);
  bst.insert(10);
  bst.insert(12);
  bst.insert(11);
  bst.insert(13);
  // bst.visit()

  drawTree(bst)
  // console.log('===>   bst', bst.search(15));

  // generateRandNodes(20);
}
function rand(n) {
  return Math.floor(Math.random() * n);
}
function generateRandNodes(numOfNodes) {
  let n = new Node(rand(1000));
  for (let i = 0; i < numOfNodes; i++) {
    n.insert(rand(1000));
  }
  n.traverse();
}

function draw() {
  // background(220);
  // ellipse(50, 50, 80, 80);
}

/**
 * Traverse the tree the draw all nodes
 * @param {*} node 
 */
function drawTree(node) {
  drawNode(null, null, node, null)
}

/**
 * 
 * @param {*} parent 
 * @param {*} p_Pos | parent's position
 * @param {*} current 
 * @param {*} c_Pos  | current's position
 */
function drawNode(parent, p_Pos, current, c_Pos) {
  let rootPos = {
    x: width / 2,
    y: 16
  }
  let spacing = 40
  let NODE_SIZE = 40

  if (!current) return

  // get node.val or node.data
  let current_val = current.val ? current.val : current.data ? current.data : 'null'

  let parentPos = p_Pos;
  let currentPos = c_Pos

  if (!parent) {
    currentPos = rootPos // root node
  }

  let leftPos = {
    x: currentPos.x - spacing,
    y: currentPos.y + spacing
  }
  let rightPos = {
    x: currentPos.x + spacing,
    y: currentPos.y + spacing
  }


  // Lines
  if (parentPos && currentPos) {
    stroke(255)
    line(parentPos.x, parentPos.y, currentPos.x, currentPos.y)
  }
  // circle
  fill('white')
  ellipse(currentPos.x, currentPos.y, NODE_SIZE, NODE_SIZE)

  // Text  
  fill('red')
  textStyle(BOLD); textAlign(CENTER, CENTER)
  text(current_val, currentPos.x, currentPos.y)

  drawNode(current, currentPos, current.left, leftPos)
  drawNode(current, currentPos, current.right, rightPos)



  if (current.left === null & current.right === null) {
    // draw node x based on paretn's x,y
  }
}