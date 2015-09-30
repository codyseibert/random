Task 001
=============

# Before
Grab a cup of coffee

# Topics Covered
- javascript:
  - variables
  - functions
  - objects

# Lesson
We have learned how HTML tags are used to make up the page, and we have also learned how CSS is used to style those tags.  That is cool and all, but everything you have learned only allows you to make a static website.  By static, I mean a site that never changes.

We need dynamic websites, and making those requires something extra: **javascript**.

Javascript is a programming language that can be used to manipulate the CSS and HTML of your page dynamically.  For instance, we can use javascript listen to when the user clicks on a row and change the color of the row.  We can use javascript to generate 50 stars on a flag automatically instead of copy and pasting them 50 times.

First off, we need to learn a little about programming.

A program is a list of **commands**.  Each command is executed sequentially, one at a time, line by line.  Imagine it as instructions to baking a cake.  Each instruction must be followed in the exact order or else your cake will more than likely turn out terrible.

So, with that being said, what are these **commands**?

## Variables

Well, to start off, the basic command of a programming language is setting a **variable**.

A **variable** is something that holds a value.  Imagine a variable like a box.  This box can hold one **thing**, and this **thing** can be **anything**.  We can also remove everything from the box if we choose to do so, but we still have that box.

That is very abstract, so let's break that down further with an example:

Imagine we have a cardboard box which has "name" written on the outside of it with a marker.  Now, what can we put in this box?  **ANYTHING**.  But, it would make more sense to store something related to a name inside the box.  Maybe name tags or a piece of paper with someones name on it.

How does this translate to code?  

Well, think of what we need...  We need a **box**, and for our purposes, it holds a **name**.  In other words, we need a **variable** denoted **name**:

```javascript
var name;
```
This creates a variable denoted name.  In javascript, **var** tells the computer to create me a variable, and the **token** following var is the name of that variable, or the name of our box.

Now, what do we need now?  We want to store something in that variable.  Let's store the **string** "Christina":

```javascript
var name;
name = "Christina"
```

Ok, we created a variable denoted name, and we set its value to "Christina".

Cool.... but how does this help us?  In this example, it doesn't help too much, but understand that we just **assigned a value to a variable**.

We can continue to **reassign** values to that same variable whenever we want.

```javascript
var name;
name = "Christina"
name = "Cody"
name = "Bailey"
```

As mentioned, a programming language is executed one command at a time, line by line, in order.  So, if we were to print out the value of name **after all three** of those lines executed, it will be **Bailey**.  That is because command 2 overwrote the value of name set from command 1, and command 3 overwrote the value of name set from command 2.  Because **a variable can only hold one thing**, and that thing can be **ANYTHING**.

So we just learned how to **declare a variable**, we learned how to **assign a value to a variable**, and we also learned how easily we can **reassign values to a variable**.

So far the values we have been assigning have been **strings**, but we can also assign numbers:

```javascript
var number;
number = 5;
number = 5 + 10;
number = 100 - 50;
```

From the above example, we set number to 5.  Then we reassigned the value to (5 + 10), which is computed to be 15 and stored inside the values.  Finally, we assign (100 - 50) which is 50 to the variable.

Now, again, how does this help us?  Variables are one of the fundamental building block to programming; therefore, you truly must understand them.

## Functions
If you are not confused yet, you will be soon as you try to grasp the concepts of functions.  

A function is a sequence of commands that execute line by line, in order.

Dang, that sounds very similar to a program.  The main difference is that a function is a small portion of code organized to accomplish a simple task.

Let's start off with another abstract idea.  Imagine a human.  We have a list of different actions we can do: jump, duck, speak, laugh, cry, etc.  These actions can be repeated many times over again, and for the most part, the steps to do the action are the same each time.

A function can act as one of those actions, and it is made up of a list of commands (steps).

Let's take the jump action as an example and turn it into a function:
```javascript
var jump;
jump = function() {

}
```
Oh look, that looks familiar.  We created a variable denoted jump, and we assigned something to it.  It turns out that something was a function.  Everything inside those curly braces { } are the list of commands that make up the function.  The steps needed to perform the jump action.

For right now, let's imagine the jump function already does something.  Imagine it moves a person on the screen up, or something like that.  3

So, we have a function, and it makes something move.  How do we actually use it?

We can **invoke** (or **call**) functions by place parathesis after the function, like so:
```javascript
var jump;
jump = function () {
  // Imagine this is already implemented
};
jump();
jump();
jump();
```
This code example invoked the jump function 3 times in a row.  What that really means is that whatever we placed inside the curly braces { } of the function, will be executed 3 times.

Let's actually implement the jump function to print something to the console.
```javascript
var jump;
jump = function () {
  console.log("hello")
};
jump();
jump();
jump();
```
Now, if we ran the program, "hello" would be printed 3 times to our console.

If you put this example inside **js/source.js**, you can see it print to your chrome console.  You can open your chrome console by pressing ctrl + shift + I in chrome.  Make sure to click the tab denoted **console**.

The last thing to note is what is **console**, where did that come from?  

Console is a variable defined on the global scope.  Global scope is accessible by anything, anywhere inside your program.  More specifically, console is an object which contains a function called log.

Imagine this was defined somewhere:
```javascript
var console;
console.log = function (message) {

};
```
Notice the **message** defined inside the ( ).  This is called an argument.  An argument is something we can pass into the function so that the function and changes how it works based on what we pass in.

So, remember when we did console.log("hello")?  We are passing "hello" into the log function, and that function will print to our developer console.

Last thing on functions: Function can **return** values.

A function has the ability to send a value back to the person calling the function.  For instance, let's say we have a function which returns a random number to us:

```javascript
var myRandomNumber;
myRandomNumber = Math.random();
```
Nothing new here, we made a variable and we assigned it the value which was returned from invoking the random function.

## Objects
An Object is something which has attributes.  Attributes are the same thing as variables.  They can hold a value, and that value can be ANYTHING.

So, going back to the **console** example, we had an object denoted **console**, it had an attribute denoted **log**, and the value of **log** happened to be a function.

Let's make sure we really understand this by doing another example.  Let's make an object which represents a person.  We want that "person" object to have attributes which define that person, such as their name, age, weight, height, etc.  
```javascript
var cody;
cody.name = "Cody"
cody.age = 24;
cody.weight = 160;
cody.height = "5 foot, 10 inch"
```
We created a variable called cody, and then we started adding attributes to it, thus turning it into an object.  This is just one way to define an object and assign attributes to it.  Another way to do the same thing is like so:
```javascript
var cody;
cody = {
  name: "Cody",
  age: 24,
  weight: 160,
  height: "5 foot, 10 inch"
}
```
Those are two different ways to do the same thing.

# Task
Give your brain a full days rest, and then read this entire document again.  This didn't even scratch the surface of javascript, but it did cover some of the most fundamental terms needed to be able to make a program.

Don't worry if this stuff doesn't make sense yet.  It will take multiple examples building things with javascript and jQuery before it will click.
