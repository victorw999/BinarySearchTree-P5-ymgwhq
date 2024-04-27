class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.random = null;
    this.x = null
    this.y = null
  }
  insert(val){
    let node = new Node(val);
    this.insertNode(node)
  }
  insertNode(node) {    
    if (node.val < this.val) {
      if (this.left === null){
        this.left = node
      }else{
        this.left.insertNode(node)
      }
      
    } else if (node.val > this.val) {
        if(this.right === null){
          this.right= node
        }else{
          this.right.insertNode(node)
        }
    } else {
      // if the val equals or else, do nothing
    }
    return node;
  }

  visit() {
    if (this.left !== null) {
      this.left.visit()
    }
    console.log('==> ', this.val)
    if (this.right !== null) {
      this.right.visit()
    }
  }
}
