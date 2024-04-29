
//ref: https://learnersbucket.com/tutorials/data-structures/trie-data-structure-in-javascript/

/**
 * TrieNode
// the "key" value will be the character in sequence
 */
const TrieNode = function (key) {
  console.log('===> TrieNode()', key)
  this.key = key;

  // we keep a reference to parent
  this.parent = null;

  // we have hash of children
  this.children = {};

  // check to see if the node is at the end
  this.end = false;

  this.level = null;

  this.getWord = function () {
    let output = [];
    let node = this;

    while (node !== null) {
      output.unshift(node.key);
      node = node.parent;
    }

    return output.join('');
  };
}

/**
 * TRIE TREE
 */
const TrieTree = function () {
  console.log('===> TrieTree()')
  this.root = new TrieNode(null);

  // keep track of levels to draw a pretty tree
  this.levels = new Map();

  /** 
   *  INSERT
   *  inserts a word into the trie.
   */
  this.insert = function (word) {
    let node = this.root; // start at the root, node is the tracker

    // for every character in the word
    for (let i = 0; i < word.length; i++) {

      // check to see if character node exists in children.
      if (!node.children[word[i]]) {

        // if it doesn't exist, we then create it.
        node.children[word[i]] = new TrieNode(word[i]);

        // we also assign the parent to the child node.
        let thisChild = node.children[word[i]]
        thisChild.parent = node;

        if (!thisChild.parent || !thisChild.parent.level) {
          thisChild.level = 1
        } else {
          thisChild.level = thisChild.parent.level + 1
        }
      }

      // proceed to the next depth in the trie.
      node = node.children[word[i]];

      // finally, we check to see if it's the last word.
      if (i == word.length - 1) {
        // if it is, we set the end flag to true.
        node.end = true;
      }
    }
  };
  /**
   *   SEARCH, CONTAINS()
   */
  this.contains = function (word) {
    let node = this.root
    for (let i = 0; i < word.length; i++) {
      if (node.children[word[i]]) {
        node = node.children[word[i]]
      } else {
        return false
      }
    }
    // we finished going through all the words, but is it a whole word?
    return node.end;
  }

  /**
   * FIND(prefix)
   * returns every word with given prefix
   */
  this.find = function (prefix) {
    let node = this.root;
    let output = [];

    // for every character in the prefix
    for (let i = 0; i < prefix.length; i++) {
      // make sure prefix actually has words
      if (node.children[prefix[i]]) {
        node = node.children[prefix[i]];
      } else {
        // there's none. just return it.
        return output;
      }
    }

    // recursively find all words in the node
    findAllWords(node, output);

    return output;
  };

  /**
   * FINDALLWORDS
   * recursive function to find all words in the given node.
   * @param {*} node 
   * @param {*} arr // output
   */

  const findAllWords = (node, arr) => {
    // base case, if node is at a word, push to output
    if (node.end) {
      arr.unshift(node.getWord());
    }

    // iterate through each children, call recursive findAllWords
    for (let child in node.children) {
      findAllWords(node.children[child], arr);
    }
  }

  /**
   * REMOVE
   */
  // removes the given word
  this.remove = function (word) {
    let root = this.root;

    if (!word) return;

    // recursively finds and removes a word
    const removeWord = (node, word) => {

      // check if current node contains the word
      if (node.end && node.getWord() === word) {

        // check and see if node has children
        let hasChildren = Object.keys(node.children).length > 0;

        // if has children we only want to un-flag the end node that marks end of a word.
        // this way we do not remove words that contain/include supplied word
        if (hasChildren) {
          node.end = false;
        } else {
          // remove word by getting parent and setting children to empty dictionary
          node.parent.children = {};
        }

        return true;
      }

      // recursively remove word from all children
      for (let key in node.children) {
        removeWord(node.children[key], word)
      }

      return false
    };

    // call remove word on root node
    removeWord(root, word);
  };


  /**
   * DEPTH of tree
   */
  this.calculateDepth = function (node) {
    if (!node) {
      return 0;
    }

    let maxChildDepth = 0;
    if (node.children) { // Assuming 'children' property for general tree

      for (const key in node.children) {
        // console.log("key", key) 
        maxChildDepth = Math.max(maxChildDepth, this.calculateDepth(node.children[key]));
      }
    }

    return 1 + maxChildDepth;
  }

  /**
   * WIDTH of tree
   */
  this.calculateWidth = function (root) {
    if (!root) {
      return 0;
    }

    let queue = [root];
    let maxWidth = 0;

    while (queue.length > 0) {
      let levelSize = queue.length;
      maxWidth = Math.max(maxWidth, levelSize);

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();

        if (node.children) {
          // Add children to queue
          queue.push(...Object.values(node.children));
        }
      }
    }

    return maxWidth;
  }

}// Class TrieTree