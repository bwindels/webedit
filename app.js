const PageIO = require('./src/io/pageio');



new PageIO("./sample-project").getPageNames().then(pages => {
  pages.sort();
  let ul = document.createElement("ul");
  pages.forEach(pageName => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = "#/page/" + pageName;
    a.appendChild(document.createTextNode(pageName));
    li.appendChild(a);
    ul.appendChild(li);
  });

  document.body.appendChild(ul);
});
