/**
 * P5
 */


function setup() {
  
  createCanvas(400, 500);
  // background('black') 
  background(31)
  
  let bst = new Node();
  bst.insert(5);
  bst.insert(3);
  bst.insert(7);
  bst.insert(10);
  bst.insert(12);
  bst.insert(11);
  bst.insert(13);

  bst.traverse();

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

// function setup() {
//   createCanvas(600, 400);
//   background(51);
//   // tree = new Tree();
//   // for (var i = 0; i < 100; i++) {
//   //   tree.addValue(floor(random(0, 100)));
//   // }
//   // console.log(tree);
//   // tree.traverse();

//   // var result = tree.search(10);
//   // if (result == null) {
//   //   console.log('not found');
//   // } else {
//   //   console.log(result);
//   // }
// }
