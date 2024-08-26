(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[7578],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return s},kt:function(){return f}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),d=u(n),f=i,m=d["".concat(l,".").concat(f)]||d[f]||p[f]||o;return n?r.createElement(m,a(a({ref:t},s),{},{components:n})):r.createElement(m,a({ref:t},s))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var u=2;u<o;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2316:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return a},metadata:function(){return c},toc:function(){return l},default:function(){return s}});var r=n(2122),i=n(9756),o=(n(7294),n(3905)),a={sidebar_position:2},c={unversionedId:"Migration",id:"Migration",isDocsHomePage:!1,title:"Migration to 2.20.x",description:"Version 2.20.x and higher move to a modularized architecture where the react native modules mirror the modules in the native SDK. This allows app to pull in only the modules they need. To migrate to the new architecture, please perform the following steps.",source:"@site/docs/Migration.md",sourceDirName:".",slug:"/Migration",permalink:"/react-native-bildit-flybuy/docs/Migration",editUrl:"https://github.com/bildit-Platform/react-native-bildit-flybuy/edit/main/website/docs/Migration.md",version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/react-native-bildit-flybuy/docs/intro"},next:{title:"Setup",permalink:"/react-native-bildit-flybuy/docs/Setup"}},l=[{value:"package.json dependencies",id:"packagejson-dependencies",children:[]}],u={toc:l};function s(e){var t=e.components,n=(0,i.Z)(e,["components"]);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Version 2.20.x and higher move to a modularized architecture where the react native modules mirror the modules in the native SDK. This allows app to pull in only the modules they need. To migrate to the new architecture, please perform the following steps."),(0,o.kt)("h2",{id:"packagejson-dependencies"},"package.json dependencies"),(0,o.kt)("p",null,"Remove ",(0,o.kt)("inlineCode",{parentName:"p"},'"react-native-bildit-flybuy"')," from package.json dependencies, and include the modules that are needed as follows. Core is required. Other modules depend on the features your app is using."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'  "dependencies": {\n    "react-native-bildit-flybuy-core": "2.20.5",\n    "react-native-bildit-flybuy-livestatus": "2.20.4",\n    "react-native-bildit-flybuy-notify": "2.20.4",\n    "react-native-bildit-flybuy-pickup": "2.20.4",\n    "react-native-bildit-flybuy-presence": "2.20.4"\n  }\n')))}s.isMDXComponent=!0}}]);