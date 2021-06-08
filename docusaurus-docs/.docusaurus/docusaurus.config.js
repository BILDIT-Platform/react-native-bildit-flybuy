export default {
  "title": "BILDIT's React Native FlyBuy SDK",
  "tagline": "FlyBuy Pickup, Notify, and Presence. The Flybuy cloud service and mobile SDKs from Radius Networks enable developers to integrate Flybuy functionality directly, streamlining customer pickup and staff tooling with other systems.",
  "url": "https://bilditon.com",
  "baseUrl": "/",
  "onBrokenLinks": "throw",
  "onBrokenMarkdownLinks": "warn",
  "favicon": "img/favicon.png",
  "organizationName": "bildit-llc",
  "projectName": "react-native-bildit-flybuy",
  "themeConfig": {
    "navbar": {
      "title": "BILDIT",
      "logo": {
        "alt": "BILIDIT Logo",
        "src": "img/bilditlogo.png"
      },
      "items": [
        {
          "type": "doc",
          "docId": "intro",
          "position": "left",
          "label": "Docs",
          "activeSidebarClassName": "navbar__link--active"
        },
        {
          "to": "/blog",
          "label": "Blog",
          "position": "left"
        },
        {
          "href": "https://github.com/bildit-Platform/react-native-bildit-flybuy",
          "label": "GitHub",
          "position": "right"
        }
      ],
      "hideOnScroll": false
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Docs",
          "items": [
            {
              "label": "Tutorial",
              "to": "/docs/intro"
            }
          ]
        },
        {
          "title": "Community",
          "items": [
            {
              "label": "Stack Overflow",
              "href": "https://stackoverflow.com/questions/tagged/flybuy"
            }
          ]
        },
        {
          "title": "More",
          "items": [
            {
              "label": "Blog",
              "to": "/blog"
            },
            {
              "label": "GitHub",
              "href": "https://github.com/bildit-Platform/react-native-bildit-flybuy"
            }
          ]
        }
      ],
      "copyright": "Copyright © 2021 BILDIT, LLC. Built with Docusaurus."
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadatas": [],
    "prism": {
      "additionalLanguages": []
    },
    "hideableSidebar": false
  },
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/macbookpro13/Desktop/Dev/BILDIT/react-native-flybuy/docusaurus-docs/sidebars.js",
          "remarkPlugins": [
            [
              null,
              {
                "sync": true
              }
            ]
          ],
          "editUrl": "https://github.com/bildit-Platform/react-native-bildit-flybuy/edit/main/website/"
        },
        "blog": {
          "showReadingTime": true,
          "editUrl": "https://github.com/bildit-Platform/react-native-bildit-flybuy/edit/main/website/blog/"
        },
        "theme": {
          "customCss": "/Users/macbookpro13/Desktop/Dev/BILDIT/react-native-flybuy/docusaurus-docs/src/css/custom.css"
        }
      }
    ]
  ],
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "customFields": {},
  "plugins": [],
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};