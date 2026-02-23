Answer to Questions

1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer: The main difference between these methods is how they search the document and what they return. getElementById is used to find a single, specific element using its unique ID. getElementsByClassName is broader, returning all elements with a specific class name as a collection. For more flexibility, querySelector uses CSS selectors to find the very first element that matches a rule, while querySelectorAll finds every matching element.

2. How do you create and insert a new element into the DOM?

Answer: First, we need to create an element using document.createElement(). Next, properties like text content or class names are added to the element. Finally, the element is placed on the file by selecting a parent container and using a method such as appendChild() to insert the new element into it.

3. What is Event Bubbling? And how does it work?

Answer: Event bubbling is how an action, such as a click, propagates through the layers of a webpage. When a button inside a box is clicked, the click starts at the button, but then it bubbles up to the box, then to the body of the page. It works like a signal traveling upward. Any parent element that is listening for a click will also hear it and react.

4. What is Event Delegation in JavaScript? Why is it useful?

Answer: Event Delegation is a smart way to handle many items at once. Instead of putting a click listener on every single button in a long list, a single listener is added to the parent container. Because of bubbling, any click on a child item will eventually reach the parent. This is useful because it saves computer memory and ensures that any new items added to the list later will already work without requiring new code.

5. What is the difference between preventDefault() and stopPropagation() methods?

Answer: These two methods stop different things from happening. preventDefault() stops the browser from doing what it usually does, like stopping a link from jumping to a new website or a form from refreshing the page. stopPropagation() is different. It stops the "bubbling" process. It tells the click to stay on that specific element rather than travel up to any parent elements.
