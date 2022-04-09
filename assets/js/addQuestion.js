hljs.configure({
    languages: ['javascript', 'ruby', 'python']
});
let toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike', 'formula'],
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'direction': 'rtl' }],
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']
];
let options = {
    modules: {
        syntax: true,              // Include syntax module 
        toolbar: toolbarOptions  // Include button in toolbar
    },
    theme: 'snow'
};
let quill = new Quill('#questionEditor', options);
let quillOption1 = new Quill('#optionEditor1', options);
let quillOption2 = new Quill('#optionEditor2', options);
let quillOption3 = new Quill('#optionEditor3', options);
let quillExplaination = new Quill('#editorExplaination', options);
let quillCorrectAnswer = new Quill('#editorCorrectAnswer', options);
let quillDisplay = new Quill('#editorDisplay', {
    modules: {
        syntax: true,
    },
    readOnly: true,
    theme: 'bubble'
});
// post req
const addQuestion = () => {
    let allOptionsNode = document.querySelectorAll("[name='option']");
    let incorrectOptions = [];
    Array.from(allOptionsNode).forEach(function (el) {
        let option = el.querySelector("[class='ql-editor']");
        if (option !== null)
            incorrectOptions.push(el.querySelector("[class='ql-editor']").innerHTML);
    });

    let title = quill.root.innerHTML.split('  ').join(' &nbsp;');
    let correctAnswer = quillCorrectAnswer.root.innerHTML.split('  ').join(' &nbsp;');
    let explaination = quillExplaination.root.innerHTML.split('  ').join(' &nbsp;');
    let subjectId = document.getElementById('autoSizingSelect').value;
    const data = { title, incorrectOptions, correctAnswer, subjectId, explaination };
    fetch("/question/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            $(".status").html(`<div class='card border border-success'> <div class='card-body text-success'>${data.msg}</div></div>`);
        })
        .catch((error) => {
            console.error("Error:", error);
            $(".status").html(`<div class='card border border-danger'> <div class='card-body text-danger'>${data.msg}</div></div>`);
        });
}

quillDisplay.root.innerHTML = '<p>What is the output of this code?</p><pre class="ql-syntax" spellcheck="false"><span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"hello world"</span>);\n<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">"namnamnam"</span>);\n<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;<span class="hljs-number">10</span>; i++){\n &nbsp;<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(i);\n}\n</pre><p><br></p>'