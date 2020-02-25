# CSS Grid in IE11

## Usecase
this all started because there was a heading in chopshop that was a single row with a back button, title, and buttons on the right.

it was using floats and absolute positioning which caused things to break when the text was translated.

I could've fixed it with flexbox, but...... I wanted the grid to be content-aware.

where the columns would look like this:

`the width of the back button || free space || the width of the button container`

perfect use case for CSS grid.
```css
display: grid;
grid-template-columns: auto 1fr auto;
```

easy, right?

but it doesn't work in IE11. everything broke.

e.v.e.r.y.t.h.i.n.g.

## What went wrong?
Well, first thing I did was check if anyone else was using CSS grid in chopshop... Not really.

Then I looked to see if this was even possible to do in IE11. Can I Use says.... [kind of](https://caniuse.com/#feat=css-grid)? IE11 partially supports CSS grid. But what does that mean?! I'll get to that in a second... Let's first look at what happened...

The component was styled with stylus so I looked at how the CSS the compiled.
```css
display: grid;
-ms-display: grid;
grid-template-columns: auto 1fr auto;
-ms-grid-template-columns: auto 1fr auto;
```

apparently adding `-ms-` to everything doesn't work. go figure.

## Autoprefixer
so I did some googling, which said to use [autoprefixer](https://autoprefixer.github.io/), the tried and true solution for getting almost anything in CSS to work in IE11.
here's what it gave me:
```css
display: grid;
display: -ms-grid;
grid-template-columns: auto 1fr auto;
-ms-grid-columns: auto 1fr auto;
```

well that 'works'... as in IE11 recognizes those properties... but the component layout was still broken.

that's because you have to explicitly tell each child item in the grid where they should live using `grid-column` or the IE equivalent `-ms-grid-column`

```css
&:first-child {
    -ms-grid-column: 1;
}
&:nth-child(2) {
    -ms-grid-column: 2;
}
&:nth-child(3) {
    -ms-grid-column: 3;
}
```

you'd think this would work........ but it doesn't. For some reason IE11 thinks `first-child` is the parent 🤷‍♀
instead, you have to add classes to each child and then explicitly declare each child class' placement in the grid.

and if it takes up more than a column, use `-ms-grid-column-span`

## Side note...
Another thing to be aware of... by default `display: block` behaves differently in IE11. Usually, if you have a parent container with content inside, the parent will by default be the size of the content. In IE11, the parent is by default the width of its parent.

none of the articles I read mentioned this, which tells me they didn't actually test in IE11. Or [read the specs](https://www.w3.org/TR/2011/WD-css3-grid-layout-20110407/). But I did for you, so you don't have to.

## What Doesn't Work
`grid-template-` columns and row
`grid-auto-` columns and rows and flow
`auto-fill` and `auto-fit`
`fit-content`
`inline` elements
    or elements that came after IE11
`grid` shorthand
`span`
`grid-gap`
    but you can hack your way around it
`grid-template-areas`
    but you can hack it with `-ms-grid-` columns and rows

## What Does Work
repeat... it's just syntactically weird
`(1fr 20px)[12]` instead of `repeat(12, 1fr 20px)`

`minmax()`

## What does this mean for you?
Don't rely on your CSS compiler to prefix for you, make sure it uses autoprefixer, or add it manually.

If you can bring autoprefixer in as a dependency, use it.. just know you have to explicitly tell your grid items where to live.

Styled components DOES NOT include prefixing for grid in IE11. You'll have to manually write them out.
styled components uses stylis to compile everything which still doesn't include prefixes for [ie11](https://github.com/thysultan/stylis.js/issues/119) and they seem reluctant to add them.
also since styled components are at runtime, autoprefixer won't work because it's at build time..... [💩](https://github.com/styled-components/styled-components/issues/2078)

