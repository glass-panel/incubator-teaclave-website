// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Apache Teaclave (incubating)',
  tagline: 'Apache Teaclave (incubating) is an open source universal secure computing platform, making computation on privacy-sensitive data safe and simple.',
  favicon: 'img/logo.svg',
  /*markdown: {
    format: 'md'
  },*/

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://teaclave.apache.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'apache', // Usually your GitHub org/user name.
  projectName: 'incubator-teaclave', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  
  markdown: {
    format: 'detect',
    // Replace autolinks to avoid mdx rendering issues.
    preprocessor: (file) => {
      const autolinks = file.fileContent.match(/<((https?:)|(mailto:))[\S]+>/gi);
      autolinks?.forEach((link) => {
        file.fileContent = file.fileContent.replaceAll(link, `[${link.slice(1, -1)}](${link.slice(1, -1)})`);
      });
      return file.fileContent;
    },
    
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/apache/incubator-teaclave-website/tree/master/sgx-sdk-api-docs',
        },
        blog: {
          showReadingTime: false,
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/apache/incubator-teaclave-website/tree/master/site/blog',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: undefined,
        logo: {
          alt: 'Apache Teaclave',
          src: 'img/logo.svg',
          style: {
            height: '2rem',
            paddingLeft: '1.6rem',
            transform: 'scale(2.8)',
          }
        },
        items: [
          { to: '/', label: 'ABOUT', position: 'right' },
          { to: '/powered-by', label: 'POWERED BY', position: 'right' },
          {
            to: '/community',
            label: 'COMMUNITY',
            items: [
              { label: 'CONTRIBUTING', to: '/contributing' },
              { label: 'CONTRIBUTORS', to: '/contributors' },
            ],
            position: 'right',
          },
          { to: '/download', label: 'DOWNLOAD', position: 'right' },
          {
            to: '/docs',
            label: 'DOCS',
            items: [
              { label: 'Teaclave', to: '/docs/' },
              { label: 'Teaclave SGX SDK', to: '/docs/sgx-sdk-docs/' },
              { label: 'Teaclave TrustZone SDK', to: '/docs/trustzone-sdk-docs/' },
              { label: 'Teaclave Client SDK (Rust)', href: 'https://teaclave.apache.org/api-docs/client-sdk-rust/', target: '_self', rel: '' },
              { label: 'Teaclave Client SDK (Python)', href: 'https://teaclave.apache.org/api-docs/client-sdk-python/', target: '_self', rel: '' },
              { label: 'Teaclave SGX SDK', href: 'https://teaclave.apache.org/api-docs/sgx-sdk/', target: '_self', rel: '' },
              { label: 'Teaclave TrustZone SDK (Host)', href: 'https://teaclave.apache.org/api-docs/trustzone-sdk/optee-teec', target: '_self', rel: '' },
              { label: 'Teaclave TrustZone SDK (TA)', href: 'https://teaclave.apache.org/api-docs/trustzone-sdk/optee-utee', target: '_self', rel: '' },
              { label: 'Crates in Teaclave (Enclave)', href: 'https://teaclave.apache.org/api-docs/crates-enclave/', target: '_self', rel: '' },
              { label: 'Crates in Teaclave (App)', href: 'https://teaclave.apache.org/api-docs/crates-app/', target: '_self', rel: '' },
            ],
            position: 'right',
          },
          { to: '/blog', label: 'Blog', position: 'right' },
          {
            label: 'ASF',
            items: [
              { label: 'ASF Homepage', href: 'https://www.apache.org/' },
              { label: 'License', href: 'https://www.apache.org/licenses/' },
              { label: 'Sponsorship', href: 'https://www.apache.org/foundation/sponsorship.html' },
              { label: 'Security', href: 'https://www.apache.org/security/' },
              { label: 'Privacy', href: 'https://privacy.apache.org/policies/privacy-policy-public.html' },
              { label: 'Thanks', href: 'https://www.apache.org/foundation/thanks.html' },
              { label: 'Events', href: 'https://www.apache.org/events/current-event.html' },
            ],
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `<div style="font-size:.7rem; text-align:left;">`
          + `Apache Teaclave (incubating) is an effort undergoing incubation at The Apache Software Foundation (ASF), sponsored by the Apache Incubator. `
          + `Incubation is required of all newly accepted projects until a further review indicates that the infrastructure, communications, and decision making process have stabilized in a manner consistent with other successful ASF projects. `
          + `While incubation status is not necessarily a reflection of the completeness or stability of the code, it does indicate that the project has yet to be fully endorsed by the ASF. `
          + `Copyright © 2020 The Apache Software Foundation. `
          + `Licensed under the Apache License, Version 2.0. Apache Teaclave, Apache, the Apache feather, and the Apache Teaclave project logo are either trademarks or registered trademarks of the Apache Software Foundation.`
          + `</div>`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
