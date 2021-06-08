
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
  component: ComponentCreator('/blog','faa'),
  exact: true,
},
{
  path: '/blog/hello-world',
  component: ComponentCreator('/blog/hello-world','c16'),
  exact: true,
},
{
  path: '/blog/hola',
  component: ComponentCreator('/blog/hola','b39'),
  exact: true,
},
{
  path: '/blog/tags',
  component: ComponentCreator('/blog/tags','3e4'),
  exact: true,
},
{
  path: '/blog/tags/docusaurus',
  component: ComponentCreator('/blog/tags/docusaurus','04d'),
  exact: true,
},
{
  path: '/blog/tags/facebook',
  component: ComponentCreator('/blog/tags/facebook','25a'),
  exact: true,
},
{
  path: '/blog/tags/hello',
  component: ComponentCreator('/blog/tags/hello','bd9'),
  exact: true,
},
{
  path: '/blog/tags/hola',
  component: ComponentCreator('/blog/tags/hola','c5f'),
  exact: true,
},
{
  path: '/blog/welcome',
  component: ComponentCreator('/blog/welcome','72a'),
  exact: true,
},
{
  path: '/markdown-page',
  component: ComponentCreator('/markdown-page','be1'),
  exact: true,
},
{
  path: '/docs',
  component: ComponentCreator('/docs','756'),
  
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
  path: '/docs/Setup',
  component: ComponentCreator('/docs/Setup','308'),
  exact: true,
},
{
  path: '/docs/Types/CircularRegion',
  component: ComponentCreator('/docs/Types/CircularRegion','fa6'),
  exact: true,
},
{
  path: '/docs/Types/Customer',
  component: ComponentCreator('/docs/Types/Customer','560'),
  exact: true,
},
{
  path: '/docs/Types/CustomerInfo',
  component: ComponentCreator('/docs/Types/CustomerInfo','78e'),
  exact: true,
},
{
  path: '/docs/Types/CustomerState',
  component: ComponentCreator('/docs/Types/CustomerState','37a'),
  exact: true,
},
{
  path: '/docs/Types/NotificationInfo',
  component: ComponentCreator('/docs/Types/NotificationInfo','94e'),
  exact: true,
},
{
  path: '/docs/Types/Order',
  component: ComponentCreator('/docs/Types/Order','178'),
  exact: true,
},
{
  path: '/docs/Types/OrderState',
  component: ComponentCreator('/docs/Types/OrderState','e05'),
  exact: true,
},
{
  path: '/docs/Types/PickupType',
  component: ComponentCreator('/docs/Types/PickupType','ba2'),
  exact: true,
},
{
  path: '/docs/Types/PickupWindow',
  component: ComponentCreator('/docs/Types/PickupWindow','2a1'),
  exact: true,
},
{
  path: '/docs/Types/Site',
  component: ComponentCreator('/docs/Types/Site','491'),
  exact: true,
},
{
  path: '/docs/Usage',
  component: ComponentCreator('/docs/Usage','06a'),
  exact: true,
},
]
},
{
  path: '*',
  component: ComponentCreator('*')
}
];
