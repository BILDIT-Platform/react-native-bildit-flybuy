import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Pickup',
    Svg: require('../../static/img/code.svg').default,
    description: (
      <>
        <a href="./docs/Modules/Pickup">React Native Reference</a> |{' '}
        <a href="https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/pickup">
          Pickup Guide
        </a>
      </>
    ),
  },
  {
    title: 'Notify',
    Svg: require('../../static/img/code.svg').default,
    description: (
      <>
        <a href="./docs/Modules/Notify">React Native Reference</a> |{' '}
        <a href="https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/notify">
          Notify Guide
        </a>
      </>
    ),
  },
  {
    title: 'Presence',
    Svg: require('../../static/img/code.svg').default,
    description: (
      <>
        <a href="./docs/Modules/Presence">React Native Reference</a> |{' '}
        <a href="https://www.radiusnetworks.com/developers/flybuy/#/sdk-2.0/presence">
          Presence Guide
        </a>
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
