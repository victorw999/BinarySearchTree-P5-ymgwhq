//https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
/**
 * Binary Search Tree Implementation
 */
class Node {
  constructor(data) {
    this.root = null;
    this.data = data;
    this.left = null;
    this.right = null;
  }

  /**
   * INSERT
   * */
  insert(data) {
    let newNode = new Node(data);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode); // find the correct position in the tree and add the node
    }
  } // insert

  /*
    INSERT NODE
  */
  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
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
      this.root.visit();
    } else if (this.left) {
      this.left.visit();
    } else if (this.right) {
      this.right.visit;
    } else {
      this.visit();
    }
  }

  /**
   * VISIT
   */
  visit() {
    if (this.left !== null) {
      this.left.visit();
    }
    console.log('===> Visiting: ', this.data);
    if (this.right !== null) {
      this.right.visit();
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
