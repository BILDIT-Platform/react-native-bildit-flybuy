(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[428],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),u=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=u(n),m=i,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||a;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,o[1]=s;for(var u=2;u<a;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9443:function(e,t,n){"use strict";var r=(0,n(7294).createContext)(void 0);t.Z=r},944:function(e,t,n){"use strict";var r=n(7294),i=n(9443);t.Z=function(){var e=(0,r.useContext)(i.Z);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},6566:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return h},frontMatter:function(){return v},metadata:function(){return y},toc:function(){return b}});var r=n(2122),i=n(9756),a=n(7294),o=n(3905),s=n(944),l=n(6010),u="tabItem_1uMI",c="tabItemActive_2DSg";var p=37,d=39;var m=function(e){var t=e.lazy,n=e.block,r=e.defaultValue,i=e.values,o=e.groupId,m=e.className,f=(0,s.Z)(),v=f.tabGroupChoices,y=f.setTabGroupChoices,b=(0,a.useState)(r),g=b[0],h=b[1],k=a.Children.toArray(e.children),N=[];if(null!=o){var w=v[o];null!=w&&w!==g&&i.some((function(e){return e.value===w}))&&h(w)}var O=function(e){var t=e.currentTarget,n=N.indexOf(t),r=i[n].value;h(r),null!=o&&(y(o,r),setTimeout((function(){var e,n,r,i,a,o,s,l;(e=t.getBoundingClientRect(),n=e.top,r=e.left,i=e.bottom,a=e.right,o=window,s=o.innerHeight,l=o.innerWidth,n>=0&&a<=l&&i<=s&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(c),setTimeout((function(){return t.classList.remove(c)}),2e3))}),150))},S=function(e){var t,n;switch(e.keyCode){case d:var r=N.indexOf(e.target)+1;n=N[r]||N[0];break;case p:var i=N.indexOf(e.target)-1;n=N[i]||N[N.length-1]}null==(t=n)||t.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":n},m)},i.map((function(e){var t=e.value,n=e.label;return a.createElement("li",{role:"tab",tabIndex:g===t?0:-1,"aria-selected":g===t,className:(0,l.Z)("tabs__item",u,{"tabs__item--active":g===t}),key:t,ref:function(e){return N.push(e)},onKeyDown:S,onFocus:O,onClick:O},n)}))),t?(0,a.cloneElement)(k.filter((function(e){return e.props.value===g}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},k.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==g})}))))};var f=function(e){var t=e.children,n=e.hidden,r=e.className;return a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)},v={sidebar_position:2},y={unversionedId:"Setup",id:"Setup",isDocsHomePage:!1,title:"Setup",description:"Installation",source:"@site/docs/Setup.md",sourceDirName:".",slug:"/Setup",permalink:"/react-native-bildit-flybuy/docs/Setup",editUrl:"https://github.com/bildit-Platform/react-native-bildit-flybuy/edit/main/website/docs/Setup.md",version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/react-native-bildit-flybuy/docs/intro"},next:{title:"Usage",permalink:"/react-native-bildit-flybuy/docs/Usage"}},b=[{value:"Installation",id:"installation",children:[]},{value:"Post-install Steps",id:"post-install-steps",children:[{value:"iOS",id:"ios",children:[]},{value:"Android",id:"android",children:[]}]}],g={toc:b};function h(e){var t=e.components,n=(0,i.Z)(e,["components"]);return(0,o.kt)("wrapper",(0,r.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("p",null,"You can install the React Native Flybuy SDK with npm or yarn, as follows:"),(0,o.kt)(m,{defaultValue:"npm",groupId:"npm2yarn",values:[{label:"npm",value:"npm"},{label:"Yarn",value:"yarn"}],mdxType:"Tabs"},(0,o.kt)(f,{value:"npm",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"npm install --save react-native-bildit-flybuy\n\n# RN >= 0.60\n\ncd ios && pod install\n\n# RN < 0.60\n\nreact-native link react-native-bildit-flybuy\n"))),(0,o.kt)(f,{value:"yarn",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add react-native-bildit-flybuy\n\n# RN >= 0.60\n\ncd ios && pod install\n\n# RN < 0.60\n\nreact-native link react-native-bildit-flybuy\n")))),(0,o.kt)("h2",{id:"post-install-steps"},"Post-install Steps"),(0,o.kt)("h3",{id:"ios"},"iOS"),(0,o.kt)("h4",{id:"setting-permissions"},"Setting Permissions"),(0,o.kt)("p",null,"Refer to the ",(0,o.kt)("a",{parentName:"p",href:"https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/ios?id=setting-permissions"},"Flybuy Documentation on configuring permissions")," on iOS."),(0,o.kt)("h3",{id:"android"},"Android"),(0,o.kt)("h4",{id:"google-api-keys"},"Google API Keys"),(0,o.kt)("p",null,"Refer to ",(0,o.kt)("a",{parentName:"p",href:"https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/android?id=google-api-keys"},"Flybuy Documentation on setting Google API Keys"),"."),(0,o.kt)("h4",{id:"permissions"},"Permissions"),(0,o.kt)("p",null,"Refer to ",(0,o.kt)("a",{parentName:"p",href:"https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/android?id=setting-permissions"},"Flybuy Documentation for permission requirements")," on Android."),(0,o.kt)("h4",{id:"requesting-location-permissions-at-runtime"},"Requesting location permissions at runtime"),(0,o.kt)("p",null,"The following code snipper provides an example of requesting location permissions at runtime."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import {\n  requestMultiple,\n  PERMISSIONS,\n  RESULTS,\n} from 'react-native-permissions';\n\nconst getLocationPermissions = async () => {\n  const granted = await requestMultiple(\n    Platform.select({\n      android: [\n        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,\n        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,\n      ],\n      ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],\n    }),\n    {\n      title: 'ExampleApp',\n      message: 'ExampleApp would like access to your location ',\n    }\n  );\n  return granted === RESULTS.GRANTED;\n};\n\nReact.useEffect(() => {\n  getLocationPermissions();\n}, []);\n")),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"Whenever the location permission changes (accepted or declined), make sure to call:"),(0,o.kt)("pre",{parentName:"div"},(0,o.kt)("code",{parentName:"pre",className:"language-js"},"// If using pickup module\n\nFlyBuy.Pickup.onPermissionChanged();\n\n// If using notify module\n\nFlyBuy.Notify.onPermissionChanged();\n")))))}h.isMDXComponent=!0},6010:function(e,t,n){"use strict";function r(e){var t,n,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(i&&(i+=" "),i+=n);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}function i(){for(var e,t,n=0,i="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(i&&(i+=" "),i+=t);return i}n.d(t,{Z:function(){return i}})}}]);