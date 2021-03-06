# Central.js

A lightweight jQuery tiling plugin.

## Motivation

Masonry is great. But centering the content in Masonry is a nightmare
when the width of the content is changing. Furthermore, Masonry provides
a lot of functionality Hangify just doesn't need.

Floating is simple but centering the content relative to the container
div is not simple.

Inline blocking is great, but the only way you can center it leaves the
bottom row of a grid of tiles center-align. This is not want.

## Solution

Use inline-block display with text aligned center. Then compensate for
the bottom row by added enough invisible elements to make it appear
left aligned. This part is extremely lightweight. If your project
only requires this, then it is better to cut out the rest of the javascript
and keep only the portions that fill in for "missing" elements.

But we like Masonry's animated transitions. Using inline block does not
implicitly expose CSS transitions because positions are never explicitly
declared or changed. (Because the positions are handled entirely by the
browser.) So, we deal with this by setting the real blocks hidden, letting
them move to their new position, then create visible replicas of the originals
that are absolutely positioned and moved to their absolutely positioned
new location. This explicit change exposes CSS transitions. Finally, once
in the new position, the fake blocks are removed from the DOM and the
old ones are set visible again.

## Example

Simply attach Central to a container div with class "block-container" containing
items with class "block":

    var container = $('block-container').Central();

Then call 'retile' with a CSS dictionary to adjust the width or position of the container:

    container.retile({'left': '20%', 'width': '80%'});

That's it! Please view index.html for a simple example. In the future, the plugin will
be more abstract and allow you to provide your own names for the container and the
inner blocks.

## Considerations

This plugin should perform much better than plugins like Masonry that
calculate and do repositioning in Javascript. No calculations are done
in this library; it is left entirely to the browser in terms of CSS's
inline-block directive.

Please note that this plugin is currently under development and should not
be considered production-ready, yet.

Specifically, this plugin is missing a way to handle window resizing with
transitions. This will be implemented in the future. Currently, window
resizing causes the blocks to relocate (correctly) without css transitions.

## Questions

Feel free to contact phil@hangify.com or dev@hangify.com with any questions.
