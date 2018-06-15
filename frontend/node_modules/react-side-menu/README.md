# React Side Menu
Multi level side menu component

![react-side-menu](https://cloud.githubusercontent.com/assets/4214509/19636936/7482a036-99f6-11e6-8429-d6efb75ef6ce.gif)

# Install

```bash
npm install --save react-side-menu
```

# Usage

Define menu object:

```js
 const menu = [
   {
     key: 'accounts', name: 'Accounts', icon: 'fa-home', link: '#accounts',
     childs: [
       {
         key: 'siliconstraits', name: 'Silicon Straits', link: '#siliconstraits',
         childs: [
           {
             key: 'spacewalker', name: 'Space Walker', link: '#spacewalker',
             childs: [
               { key: 'internal', name: 'Internal Team', link: '#internal' },
               { key: 'external', name: 'External Team', link: '#external' },
             ]
           },
           { key: 'minion', name: 'Minion', link: '#minion' },
           { key: 'tinker', name: 'Tinker', link: '#tinker' },
         ],
       },
       {
         key: 'microsoft', name: 'Microsoft', link: '#microsoft',
         childs: [
           { key: 'bill', name: 'Bill', link: '#bill' },
           { key: 'gates', name: 'Gates', link: '#gates' },
         ],
       },
       {
         key: 'google', name: 'Google', link: '#google',
         childs: [
           { key: 'chrome', name: 'Chrome', link: '#chrome' },
           { key: 'gmail', name: 'Gmail', link: '#gmail' },
         ],
       },
       {
         key: 'life', name: 'Life', link: '#life',
         childs: [
           { key: 'giang', name: 'Giang', link: '#giang' },
           { key: 'code', name: 'Code', link: '#code' },
         ],
       },
     ]
   },
   {
     key: 'setting', name: 'Setting', link: '#setting', icon: 'fa-gear',
   }
 ];
```

In your `render()`:
```jsx
<Menu menu={menu} activeMenu={'siliconstraits'} />
```

You can also use this as a third-party libraries in your non-React application:

```js
<script src="lib/react-side-menu.browser.js"></script>
<script>
  ReactSideMenu(menu, 'siliconstraits', document.getElementById('menu'));
</script>
```

# Disclaimer

This component depends on global Font Awesome icon pack to renders some icons.

# Options
## `<Menu>` Component:
- `menu` - [`MenuObject`](#menuobject): describe menu structure & content.
- `activeMenu` - `String`: unique identity of the active menu, this is used to decide what menu to highlight.

## `MenuObject`:
- `key` - `String`: Unique identity of a menu item
- `name` - `String`: Text to display
- `link` - `String` - (optional): This will be put in `href` of the `<a>` tag when render the menu item, if this is empty the link will be rendered with `<a href="#">`.
- `icon` - `String` - (optional): font awesome class icon, will be append to class name of `<i class="fa ">`.
- `childs` - `Array[MenuObject]`: child menus.

# Styling
You can style your menu as whatever you want. This component generate class name based on nesting level and role of a menu: `group-level-{x}`, `item-level-{x}`... with `{x}` is increased based on the nesting level of `MenuObject` you defined. Ex `group-level-1`, `group-level-2`, `group-level-3`...

There are several more classes with different roles defined from the render method, as it takes too much effort for me to explain every single class, I suggest you to read an example bellow of a styling LESS.

```less
@menu-item-height: 40px;
.react-sidemenu {
  ul {
    padding: 0;
    list-style: none;
  }

  li.selected {
    position: relative;
    &:after {
      display: block;
      content: '';
      position: absolute;
      top: 8px;
      left: 3px;
      height: 23px;
      width: 3px;
      background-color: #2494F2;
    }
  }

  .menu-item {
    position: relative;
    display: block;
    height: @menu-item-height;
    line-height: @menu-item-height;
    font-family: OpenSans-Bold;
    font-size: 12px;
    color: #858B99;
    letter-spacing: 1px;
    margin-left: 26px;
    text-decoration: none;

    &:hover {
      color: #d9d9d9;
    }

    &.active {
      color: #fff;
    }

    .menu-item-icon {
      margin-right: 16px;
      font-size: 15px;
    }

    .expand-state {
      position: absolute;
      right: 0;
      top: 0;
      height: @menu-item-height;
      padding: 0 15px;
      color: #0098D7;
    }
  }

  .menu-item-group {
    overflow: hidden;
    max-height: @menu-item-height;
    transition: max-height 0.5s;
  }

  .group-level-1 {
    background-color: #2D3440;
  }

  .group-level-2 {
    background-color: #262C36;
    .menu-item {
      padding-left: 30px;
    }
  }

  .group-level-3 {
    background-color: #1F242D;
    .menu-item {
      padding-left: 50px;
    }
  }

  .group-level-4 {
    background-color: #14171f;
    .menu-item {
      padding-left: 70px;
    }
  }
}

```

Take a look at live demo: https://trungdq88.github.io/react-side-menu/simple

# ROADMAP

- [ ] Don't depends on Font Awesome for icons
- [ ] More options (Ex: `onClick` callback, custom height menu item, custom JSX component as a menu item...)

# LICENSE

```
MIT License

Copyright (c) 2016 Dinh Quang Trung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
