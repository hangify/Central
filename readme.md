The MIT License (MIT)

Copyright (c) 2014 Hangify

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

# Central.js

A lightweight jquery tiling plugin.

## Motivation

Masonry is great. But centering the content in Masonry is a nightmare
when the width of the content is changing. Furthermore, Masonry provides
a lot of functionality Hangify just don't need.

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

Please view index.html for a simple example.

## Considerations

This plugin should perform much better than plugins like Masonry that
calculate and do repositioning in Javascript. No calculations are done
in this library; it is left entirely to the browser in terms of CSS's
inline-block directive.

## Questions

Feel free to contact phil@hangify.com or dev@hangify.com with any questions.
