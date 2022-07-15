###	1. What is the difference between Component and PureComponent? give an example where it might break my app.
`React.Component` does not implement `shouldComponentUpdate` while `React.PureComponent` implements it comparing `prop` and `state` in a shallow equality comparison.

Because the `props` and `state` equality are checked via shallow equality, `React.PureComponent` only works if the `props` and `state` are immutable. If you pass an object prop into a component derived from `React.Purecomponent`, a new `prop` object should be created on every change instead of modifying its values. 
The same with a state - always create a new state within `this.setState()` call instead of changing the existing one. If this isn't done, then shallow equality won’t be able to detect the change, and the component won’t re-render when it needs to.

`shallowEqual` performs a shallow equality check by iterating on the keys of the objects being compared and returning true when the values of a key in each object are not strictly equal. If the props and the state hasn’t changed, the component is not re-rendered.

###	2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
`Context` is used to communicate state anywhere inside the tree so that components can react to state changes. In the example below, when the theme changes all the components inside the `ThemeProvider` reacts to it and update their theme.

```
function App() {
  return (
    <ThemeProvider>
      <div>
        <Header/>
        <Content/>
        <Footer/>
      </div>
    </ThemeProvider>
  )
}


```
`shouldComponentUpdate()` is a performance optimization technique used to prevent `React` from re-rendering a component and all of its children.

```
class UpdateBlocker extends React.Component {
  shouldComponentUpdate() {
    return false
  }
  render () {
    return this.props.children
  }
}
```
From the `Context` example above we can prevent the `<Footer/>` from getting theme update by wrapping it inside `<UpdateBlocker>`.
```
function App() {
  return (
    <ThemeProvider>
      <div>
        <Header/>
        <Content/>
        <UpdateBlocker> 
          <Footer/>
        </UpdateBlocker>
      </div>
    </ThemeProvider>
  )
}


```
While this is just a theme, if same is done for important state update it could break the app making `<Footer/>` render stale state which are no longer needed.


### 3. Describe 3 ways to pass information from a component to its PARENT.
*  **A callback function passed as props**
Here, a callback function is passed from  `Parent` to the `Child` component as `props`, the function is called within the child component with data passed as arguments. The data is accessed in the function present in the `Parent` 
*  **context api/redux** 
Using state management, the `Parent` and `Child` component will subscribe to the same store, the `Child` updates the store with data, then the `Parent` get the data from the store.

*  **useState**
  Example of this can be found when a form is created as a `Child` component and the `onChange` function to update the inputs and initial form data are declared in the `Parent`.  Each time the `onChange` function is called the form data in the `Parent` get updated.

### 4. Give 2 ways to prevent components from re-rendering.
*  Memoization using `useMemo()` and `UseCallback()` Hooks
*   `shouldComponentUpdate()` method.

### 5. What is a fragment and why do we need it? Give an example where it might break my app.
`<Fragment>` or `<React.Fragment>` is the `React` syntax for grouping a list of children without adding extra nodes to the `DOM`. `Fragment`s are not rendered to the `DOM`.  It makes the DOM inspector less cluttered and has less memory usage
For Example:

```
function A () {
	return (
      <React.Fragment>
        <Header />
        <Content />
        <Footer />
      </React.Fragment>
    );
}

function B () {
	return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
    );
}


// Take note of the extra div when rendering `B`, it's unnecessary. div for it's part is not semantic
```
When `Fragment` is used alongside UI frameworks it might break the styling. Sometimes, a UI framework might add  certain styles to the immediate child of a parent component, however, if `Fragment` is inserted between the `Parent` and `Child` components the styling will be missing sincd `Fragment` which is the immediate child doesn't get rendered in the `DOM`
### 6. Give 3 examples of the HOC pattern.
A higher-order component is a function that takes a component and returns a new component. Using the Higher Order Component pattern allows us to keep logic that we want to re-use all in one place.

a. 
```
import {createContext} from "react
const Context = createContext();

<Context.Provider>
  <Home />
<Context.Provider/>
```
b. 
```
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
const SidebarWithRouter = withRouter(Sidebar);

``` 

c. **Functional HOC**
```
function withDarkTheme(Component) {
  return ({ style, ...rest }) => (
    <Component style={{ ...darkThemeObj, ...style }} {...rest} />
  );
}

```

### 7. what's the difference in handling exceptions in promises, callbacks and async...await.
* `.catch` handles errors in promises of all kinds: be it a reject() call, or an error thrown in a handler.
```
new Promise((resolve, reject) => reject('This in an exception')).catch(() =>
  console.log('Handling exception')
);

```
* `async...await` function uses try catch to handle exception.

```
async function () {
  try{
    await badFunction();
  }
  catch(err) {
    console.log('Handling exception:', err);
  }
}

```
* In callbacks  an argument is passed to the function in which we implement error handling.
 ```
//syntax
function (err, result) {}

//sample:
const fs = require("fs)

fs.readFile("/somefilepath, (err, result) => {
  if (err) {
    doSomethingWithError(err)
  }
  doSomethingWithResult(result)
})

 ```

### 8. How many arguments does setState take and why is it async.
`setState` takes 2 arguments;
* an object or function that's used to update the state.
* a callback function that always run after `setState` is run.
```
// a function passed as first argument and callback function passed as second argument
updateCount ()  {
  this.setState(
    ({ count }) => ({
      count: count + 1
    }),
    () => {
      this.setState(({ count }) => ({
        count: count + 2
      }));
    }
  );
}

// object passed as first argment and callback function passed as second argument

updateName (value)  {
    this.setState({ name: value}, ()=>{
      console.log("Current name: "+this.state.name)
    });
  };

```

The `setState` method is used to update the state of react class components, updating the state can be expensive if done synchronously. Using `setState` to update state means altering the state, and this causes re-rendering. For a better user experience and performance, the `setState` calls are batched.  


###	9. List the steps needed to migrate a Class to Function Component.
* Use function instead of class.
* Remove the constructor.
* Remove the `render` method but keep the `return` statement.
* Add `const` before all methods.
* Remove `this.state` throughout the component.
* Remove all references to `this`
* Set initial state with `useState()`
* Change `this.setState()`, call the function that was named in the step above to update state. For example, it could be 
``` 
const [name, setName] = useState("")
setName(event.target.value)
//instead of 
this.setState(event.target.value)

```
* Replace `componentDidMount() and componentDidUpdate` with `useEffect()`

### 10. List a few ways styles can be used with components.
* Inline CSS
* SASS and SCSS
* LESS
* Styled component
* CSS modules
* Native CSS
* CSS in JS


### 11. How to render an HTML string coming from the server.
* `dangerouslySetInnerHTML` is a property we can use on HTML elements in a React application to programmatically render strings coming from the server. Using this property makes React aware of `HTML` tags used inside strings.

```
const App = () => {
  const data = 'lorem ipsum dolor <em>adipscing</em>';

  return (
    <div
      dangerouslySetInnerHTML={{__html: data}}
    />
  );
}

```

if the data is rendered between normal `div` element the `em` tag won't work as required, it will just be a normal string.

```
const App = () => {
  const data = 'lorem ipsum dolor <em>adipscing</em>';

  return (
    <div>
      {data}
    </div>

  );
}

```
* A package called `html-react-parser` can also be used


```
import parse from 'html-react-parser');
const App = () => {
  const data = 'lorem ipsum dolor <em>adipscing</em>';
  const parsedData = parse('<div> ${data}</div>')

  return (
    <>
      {parsedData}
    </>

  );
}

```