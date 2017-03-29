Redux Regexp Router
=========================

Declarative routing for [React Redux](https://github.com/reactjs/react-redux) 
using RegExps as patterns.
* Nested routing
* Relative links
* Regexp patterns


## Installation

```
npm install --save redux-regexp-router
```

## How to use
1. Add routeReducers to your Store
2. Wrap your app to History component
3. Use Route's

```js
import ReactDom from 'react-dom';
import { combineReducers, createStore } from 'redux';

import { routeReducers, createHistory, HashHistory } from 'redux-regexp-router';

let store = createStore(combineReducers({ ...routeReducers, yourAppReducers }));
ReactDom.render(
    <Provider store={store}>
        <HashHistory>
            <div>
                <ul>
                    <li><Link to="/link1">To Link1</Link></li>
                    <li><Link to="/link2">To Link2</Link></li>
                    <li><Link to="/link3">To Link3</Link></li>
                </ul>
                
                <h4>Result</h4>
                <Route path="^link1">
                    <div>Link1</div>
                </Route>
                <Route path="^link2">
                    <div>Link2</div>
                </Route>
                <Route path="^link3">
                    <div>Link2</div>
                </Route>
            </div>
        </HashHistory>
    </Provider>
    , document.getElementById('app'));

```

### Nested Routes
Just put one Route to another.
```js
...
    <ul>
        <li><Link to="/link1">To Link1</Link></li>
        <li><Link to="/link1/1">To Link1 / 1</Link></li>
        <li><Link to="/link2">To Link2</Link></li>
    </ul>
    
    <h4>Result</h4>
    <Route path="^link1">
        <div>Link1</div>
        <Route path="^1">
            <div>SubRoute</div>
        </Route>
    </Route>
    <Route path="^link2">
        <div>Link2</div>
    </Route>
...
```

### Relative links
You can pass relative link to Link component. This link have an adress based on Route location.
```js
...
    <Route path="^about/">
        <Link to="company">Company</Link>
    </Route>
...
```
Link will have an address: /about/company

### Patterns / Path
Path matching based on RegExp. Also you can set kwargs for your routes.
```js
    <Route path="^products/(id{\d+})/$" component={<Product/>}/>
    <Route path="^products/(slug{\w+})/$" component={<Product/>}/>
    <Route path="^products/(category{\w+})/(id{\d+})/$" component={<Product/>}/>
```
* ^products/(id{\d+})/$ - `id` kwarg with digits
* ^products/(slug{\d+})/$ - `slug` kwarg with [0-9a-z_]
* ^products/(category{\w+})/(id{\d+})/$ - creates `category` and `id` kwargs