template scopes: current, parent, root, page, toc, ... would be good if we didn't have to write current._ for 99% of template bindings, but we might in rare cases want to have access to parent level? hmm, really? is not really functional mapped style... in xaml/jsx you could bind the parent param as an attribute to the child, how would we express that here?

the concept of a paragraph engine seems to emerge, as a subentity of a section. we want to allow the user to write multiple paragraph with some simple inline styles. (reduced) markdown could be a good way to do this. Do we want multiple paragraph engines? template needs to be able to say here can come some paragraphs, bound to this field. we don't want to say explicitly markdown there, so we could have a default, but maybe we really only need one paragraph engine for the whole site. The internal paragraph format (outputed by any paragraph engine) could look like:

```
  [
    ["paragraph 1 in ", {type: "strong", value: "bold"], "."],
    ["paragraph 2 has a ", {type: "link", href: "http://google.com", value: [{type: "italic", value: "beautiful"}, " link"]}, "."]
  ]
```

definitely one paragraph engine for the whole site for now, as a plugin. Would there be a section type for paragraphs? We could easily write a section that takes paragraphs as it's data and just render that with the paragraph engine. That wouldn't be confusing, paragraphs at 2 levels?

let's say we have a page header that contains a carousel. How wil we allow the user to set the images for the carousel. Does that need to be a section, or will we also allow properties/WYSIWYG editing of a sort of default section in the header?

what kind of value types will we have?

 - paragraphs
 - image
 - text
 - image-list? for something like carousel? or image is part of every record and you edit one record at the time if it's nested within a repetition? that sounds a lot more composable... need to think if we can keep UI nice.
 - sections for page template?


how to express a repetition within a template? say convert array to li

what will page template look like? how to include body? sections value kind in binding?

the closer we can stay to really decensing into the `page.json` structure, without a lot of custom rules, the nicer, more flexible and fewer code we need to write.

what are the responsabilities of a section type?
  
  - provide tabs of section in editor, of which the first one should always provide preview/WYSIWG editing.
    - template section would have another tab with data form, and one to choose/edit?/create? the template
    - carousel section would have a data form tab
    - markdown would have a preview and markdown editor tab (or both merged into one later on)
  - generate static html from page data
  - descend/ascend into data tree
  - include assets, like a script, (once) into page if needed
  - construct TOC
  - in other words, it would manage the complete DOM of a section in the editor, and should also create the static HTML for that section when generating the whole website's HTML. Where to draw the line between UI and logic? Data forms would be generated, field DOM can be responsability of value type.

    - we can have a HTMLWriter abstraction, that can be implemented for static HTML and DOM
      - this could be used in html generation, and as help to construct preview/WYSIWG
    - need strong separation between website and app/section UI styles

what are the responsabilities of a value type?

  - create field control for data form
  - if available, manage fields in WYSIWG editor. This will include using the textInput event to cancel out invalid input and build up internal model. Or provide an image picker for image field, ...
  - render subparts of tree when generating static HTML
  - (de)serialize data to and from `page.json`

can we use JSX for our first template language? Would prefer not to write template engine myself.


NAVIGATION??? TOC??? Scroll navigation within one page is important.
