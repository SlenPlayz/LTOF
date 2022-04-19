import './style.css';
import './fa.js';
import './pwa-192x192.png';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import Underline from '@tiptap/extension-underline';
import FloatingMenu from '@tiptap/extension-floating-menu';
import * as markmap from 'markmap-view';
import { Transformer } from 'markmap-lib';
const turndownService = new TurndownService();
const transformer = new Transformer();
const { Markmap, loadCSS, loadJS } = markmap;
const filename = document.querySelector('#filename');
const title = document.querySelector('.title');
let titleSav;
let content;
let editor;

function newEditor(data) {
  document.querySelector('.editorWrap').innerHTML = '';
  document.querySelector('.editorWrap').innerHTML = `
  <div class="topBar"></div>
  <h1 class="title" contenteditable='true'>${titleSav}</h1>
  <div id="editor"></div>
  <div class="inlineToolbar">
    <button onclick="editor.chain().focus().toggleBold().run()">
      <i class="fa-solid fa-bold"></i>
    </button>
    <button onclick="editor.chain().focus().toggleUnderline().run()">
      <i class="fa-solid fa-underline"></i>
    </button>
    <button onclick="editor.chain().focus().toggleItalic().run()">
      <i class="fa-solid fa-italic"></i>
    </button>
    <button onclick="editor.chain().focus().toggleStrike().run()">
      <i class="fa-solid fa-strikethrough"></i>
    </button>
  </div>
  <div class="FloatMenu">
    <button
      onclick="editor.chain().focus().setHeading({ level: 1 }).run()"
    >
      <i class="fa-solid fa-heading"> 1</i>
    </button>
    <button
      onclick="editor.chain().focus().setHeading({ level: 2 }).run()"
    >
      <i class="fa-solid fa-heading"> 2</i>
    </button>
    <button onclick="editor.chain().focus().toggleBulletList().run()">
      <i class="fa-solid fa-list"></i>
    </button>
  </div>`;
  title.innerHTML = data.title;
  editor = new Editor({
    element: document.querySelector('#editor'),
    extensions: [
      StarterKit,
      Underline,
      BubbleMenu.configure({
        element: document.querySelector('.inlineToolbar'),
      }),
      FloatingMenu.configure({
        element: document.querySelector('.FloatMenu'),
      }),
    ],
    content: data.data,
  });
  editor.commands.focus();
}

// newEditor({ title: 'feua' });

window.editor = editor;

window.mmap = () => {
  if (editor) {
    document.querySelector('.mmapSelect').classList.add('active');
    document.querySelector('.textSelect').classList.remove('active');
    content = editor.getHTML();
    editor.destroy();
    titleSav = title.innerHTML;
    document.querySelector('.editorWrap').innerHTML = '';
    document.querySelector('.editorWrap').innerHTML =
      '<svg id="markmap" style="width: 100%; height: 100%"></svg>';
    const { root, features } = transformer.transform(
      `# ${title.innerHTML} \n` + turndownService.turndown(content)
    );
    Markmap.create('#markmap', undefined, root);
  }
};

window.textShow = () => {
  if (titleSav) {
    document.querySelector('.mmapSelect').classList.remove('active');
    document.querySelector('.textSelect').classList.add('active');
    newEditor({ title: 'fwa', data: content });
  }
};

document.addEventListener('alpine:init', () => {
  Alpine.data('mock', () => ({ type: 'note', title: 'lol', data: '' }));
});
