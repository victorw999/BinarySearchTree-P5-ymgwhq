class Tree {
  constructor() {
    this.root = null;
  }
  addValue(val) {
    let node = new Node(val);
    if (this.root === null) {
      this.root = node;
    } else {
      this.root.insert(val);
    }
  }
}
