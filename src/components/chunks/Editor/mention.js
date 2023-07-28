import Quill from 'quill'

const Parchment = Quill.import('parchment');



class Mention2 extends Parchment.Embed {
  static create(data) {
    const node = super.create();
    node.setAttribute('link', data.link);
    node.innerHTML = data.denotationChar + data.text
    return node;
  }

  static formats(node) {
    return node.getAttribute('data-mention');
  }
}

Mention2.blotName = 'mention'
Mention2.tagName = 'span'
Mention2.className = 'mention'





Quill.register(Mention2,true)
