/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: "BILDIT's React Native Flybuy SDK",
  tagline:
    'Flybuy Pickup, Notify, and Presence. The Flybuy cloud service and mobile SDKs from Radius Networks enable developers to integrate Flybuy functionality directly, streamlining customer pickup and staff tooling with other systems.',
  url: 'https://bilditon.com',
  baseUrl: '/react-native-bildit-flybuy/',
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'bildit-llc', // Usually your GitHub org/user name.
  projectName: 'react-native-bildit-flybuy', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'BILDIT',
      logo: {
        alt: 'BILIDIT Logo',
        src: 'img/bilditlogo.png',
      },
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        // { to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/bildit-Platform/react-native-bildit-flybuy',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/flybuy',
            },
          ],
        },
        {
          title: 'More',
          items: [
            // {
            //   label: 'Blog',
            //   to: '/blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/bildit-Platform/react-native-bildit-flybuy',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BILDIT, LLC. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
          // Please change this to your repo.
          editUrl:
            'https://github.com/bildit-Platform/react-native-bildit-flybuy/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/bildit-Platform/react-native-bildit-flybuy/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
