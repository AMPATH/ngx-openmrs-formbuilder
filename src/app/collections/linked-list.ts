export class Node {
  formMetadata: any;
  next: Node;
  previous: Node;
  constructor(formMetadata: any) {
    this.formMetadata = formMetadata;
    this.next = null;
    this.previous = null;
  }
}

export class LinkedList {
  head: Node = null; //points to the first added list.

  append(formMetadata: any) {
    let list = new Node(formMetadata);
    if (this.head == null) {
      this.head = list; //this is the first list;
    } else {
      let temp = this.head;
      while (temp.next) {
        temp = temp.next;
      }
      list.previous = temp;
      list.next = null;
      temp.next = list; //append new list to the end of the linked list.
    }
  }
}
