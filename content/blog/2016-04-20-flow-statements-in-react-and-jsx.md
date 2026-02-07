---
title: "Flow Statements in React and JSX"
publishedDate: 2016-04-20
author: ely-lucas
summary: "An exploration of different approaches to handle conditional rendering in React JSX, including logical AND, ternary expressions, IIFEs, and wrapper components."
canonicalUrl: https://www.elylucas.net/post/flow-statements-in-react-and-jsx/
---

If you have ever tried to use an if statement in JSX, you may have encountered a transpiler error. For example, this approach fails:

```jsx
<div>
  {
    if(true) {
      <div>some conditional text</div>;
    }
  }
</div>
```

The reason is that JSX transpiles into a series of JavaScript function calls and object creation, where you can't legally use an if statement. So how do we handle conditional logic in JSX? Let's look at a few options.

## Logical AND Operator

A recommended approach leverages JavaScript short-circuiting:

```jsx
{ shouldShow && <div>conditional content</div> }
```

This technique executes the JSX only when the condition is true. This is clean and works well for simple conditionals.

## Ternary Expressions

For binary choices, ternary operators work within JSX:

```jsx
{ showShow ? <div>Content A</div> : <div>Content B</div> }
```

However, ternarys become ugly quickly inside of JSX for more complex scenarios.

## Immediately Invoked Function Expression (IIFE)

The React documentation recommends wrapping logic in an IIFE:

```jsx
<div>
  {
    (()=>{
      if(false) {
        <div>{test('truthy')}truthy</div>
      } else{
        <div>{test('falsey')}falsey</div>
      }
    })()
  }
</div>
```

While functional, this approach feels inelegant despite its effectiveness.

## Conditional Wrapper Component

A cleaner syntax uses a wrapper component:

```jsx
<Maybe show={shouldShow}>
  <div>Content</div>
</Maybe>
```

The drawback is that child components always execute because JSX will turn the child components into `React.createElement` calls, potentially causing performance issues with complex components.

## JSX-Control-Statements

Another option worth exploring is the [JSX-Control-Statements](https://github.com/AlexGilleran/jsx-control-statements) project. It is a Babel plugin that enables native-looking conditional syntax without executing unneeded children, offering a compelling alternative to the approaches above.
