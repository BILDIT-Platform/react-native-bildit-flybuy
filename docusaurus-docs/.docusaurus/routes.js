
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';
export default [
{
  path: '/',
  component: ComponentCreator('/','deb'),
  exact: true,
},
{
  path: '/__docusaurus/debug',
  component: ComponentCreator('/__docusaurus/debug','3d6'),
  exact: true,
},
{
  path: '/__docusaurus/debug/config',
  component: ComponentCreator('/__docusaurus/debug/config','914'),
  exact: true,
},
{
  path: '/__docusaurus/debug/content',
  component: ComponentCreator('/__docusaurus/debug/content','c28'),
  exact: true,
},
{
  path: '/__docusaurus/debug/globalData',
  component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
  exact: true,
},
{
  path: '/__docusaurus/debug/metadata',
  component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
  exact: true,
},
{
  path: '/__docusaurus/debug/registry',
  component: ComponentCreator('/__docusaurus/debug/registry','0da'),
  exact: true,
},
{
  path: '/__docusaurus/debug/routes',
  component: ComponentCreator('/__docusaurus/debug/routes','244'),
  exact: true,
},
{
  path: '/blog',
  component: ComponentCreator('/blog','f38'),
  exact: true,
},
{
  path: '/blog/hello-world',
  component: ComponentCreator('/blog/hello-world','6e3'),
  exact: true,
},
{
  path: '/blog/hola',
  component: ComponentCreator('/blog/hola','a97'),
  exact: true,
},
{
  path: '/blog/tags',
  component: ComponentCreator('/blog/tags','600'),
  exact: true,
},
{
  path: '/blog/tags/docusaurus',
  component: ComponentCreator('/blog/tags/docusaurus','d0a'),
  exact: true,
},
{
  path: '/blog/tags/facebook',
  component: ComponentCreator('/blog/tags/facebook','9d6'),
  exact: true,
},
{
  path: '/blog/tags/hello',
  component: ComponentCreator('/blog/tags/hello','4dd'),
  exact: true,
},
{
  path: '/blog/tags/hola',
  component: ComponentCreator('/blog/tags/hola','9b3'),
  exact: true,
},
{
  path: '/blog/welcome',
  component: ComponentCreator('/blog/welcome','a64'),
  exact: true,
},
{
  path: '/markdown-page',
  component: ComponentCreator('/markdown-page','be1'),
  exact: true,
},
{
  path: '/docs',
  component: ComponentCreator('/docs','4de'),
  
  routes: [
{
  path: '/docs/Components/Customers',
  component: ComponentCreator('/docs/Components/Customers','5ad'),
  exact: true,
},
{
  path: '/docs/Components/Orders',
  component: ComponentCreator('/docs/Components/Orders','a10'),
  exact: true,
},
{
  path: '/docs/Components/Sites',
  component: ComponentCreator('/docs/Components/Sites','3f3'),
  exact: true,
},
{
  path: '/docs/intro',
  component: ComponentCreator('/docs/intro','e84'),
  exact: true,
},
{
  path: '/docs/Modules/Notify',
  component: ComponentCreator('/docs/Modules/Notify','65d'),
  exact: true,
},
{
  path: '/docs/Modules/Pickup',
  component: ComponentCreator('/docs/Modules/Pickup','ec5'),
  exact: true,
},
{
  path: '/docs/Modules/Presence',
  component: ComponentCreator('/docs/Modules/Presence','0f0'),
  exact: true,
},
{
  path: '/docs/Reference',
  component: ComponentCreator('/docs/Reference','7c8'),
  exact: true,
},
{
  path: '/docs/Setup',
  component: ComponentCreator('/docs/Setup','308'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];
