//https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
/**
 * Binary Search Tree Implementation
 */



class Node {
  // config
  static ROOT_POS = { x: window.width / 2, y: 40 }
  static NODE_HORIZONTAL_DISTANCE = 40
  static NODE_VERTICAL_DISTANCE = 40
  static NODE_SIZE = 40

  
  /**
   * In this tree structure, only the very first Node object 
   * has its 'root' property pointing to the 
   * actual root of the tree. 
   * All other Nodes have their 'root' properties set to null.
   */
  constructor(data) {
    this.root = null;   // 
    this.data = data;
    this.left = null;
    this.right = null;
    this.x = null
    this.y = null
    
  }

  /**
   * INSERT
   * */
  insert(data) {
    let newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode; 
      // init node position on canvas
      this.root.x = width / 2     // width is canvas width
      // this.root.x = Node.ROOT_POS.x 
      this.root.y = Node.ROOT_POS.y
    } else {
      this.insertNode(this.root, newNode); // find the correct position in the tree and add the node'
    }
  } // insert

  /**
   * SET NEW NODE's coordinates
   */
  setNewNodePos(newNode, flag) {
    if (flag === 'left') {
      newNode.x = this.x - Node.NODE_HORIZONTAL_DISTANCE
      newNode.y = this.y + Node.NODE_VERTICAL_DISTANCE
    }
    else if (flag === 'right') {
      newNode.x = this.x + Node.NODE_HORIZONTAL_DISTANCE
      newNode.y = this.y + Node.NODE_VERTICAL_DISTANCE
    } else {
      console.error('setNewNodePos() wrong flag')
    }
  }

  /*
    INSERT NODE
    insertNode(originNode, newNode)
  */
  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.setNewNodePos(newNode, 'left')
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.setNewNodePos(newNode, 'right')
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  /**
   * REMOVE
   * - helper method that calls the removeNode with a given data
   */
  remove(data) {
    this.root = this.removeNode(this.root, data);
  }

  /**
   * REMOVE NODE
   */
  removeNode(node, data) {
    if (node === null) {
      return;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      // found node, and this node has no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      } else if (node.left == null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      } else {
        // if current node has 2 children, then replace current node with the smallest node from the right tree
        let minNode = this.findMinNode(node.right);
        node.right = this.removeNode(node.right, minNode.data); // remove the minNode from the right tree
        return node;
      }
    }
  }

  /**
   * FIND MIN NODE
   * */
  findMinNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  /**
   * TRAVERSE
   */

  traverse() {
    console.log('===> traverse(): ', this); 
    if (this.root) {
      this.root.visit(this.root); 
    }  else {
      console.log('===> traverse(): no Nodes in this tree',  );     
    }
    
  }

  /**
   * VISIT
   */
  visit(parent) {
    if (this.left !== null) {
      this.left.visit(this);
    }
    console.log('===> Visiting: ', this.data, this.x, this.y);

    // DRAW TREE
    
    // Lines
    stroke(255)
    line(parent.x, parent.y, this.x, this.y)

    // circle
    // noFill()
    fill('white')
    ellipse(this.x, this.y, Node.NODE_SIZE, Node.NODE_SIZE)

    // Text  
    fill('red')
    noStroke()
    textAlign(CENTER, CENTER)
    textStyle(BOLD);
    text(this.data, this.x, this.y) 


    if (this.right !== null) {
      this.right.visit(this);
    }
  }

  /**
   * SEARCH
   *  return Node
   */
  search(data) {
    if (data < this.data && this.left !== null) {
      return this.left.search(data);
    } else if (data > this.data && this.right !== null) {
      return this.right.search(data);
    } else if (data === this.data) {
      return this;
    } else if (!this.data) {
      return this.root.search(data);
    } else {
      console.log(` search() failed! ${data} is not found `);
      return null;
    }
  }
} // class Node
