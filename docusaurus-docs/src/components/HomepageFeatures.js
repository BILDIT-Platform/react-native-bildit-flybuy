import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Pickup',
    Svg: require('../../static/img/code.svg').default,
    link: './docs/Modules/Pickup',
  },
  {
    title: 'Notify',
    Svg: require('../../static/img/code.svg').default,
    link: './docs/Modules/Notify',
  },
  {
    title: 'Presence',
    Svg: require('../../static/img/code.svg').default,
    link: './docs/Modules/Presence',
  },
  {
    title: 'LiveStatus',
    Svg: require('../../static/img/code.svg').default,
    link: './docs/Modules/LiveStatus',
  },
];

function Feature({ Svg, title, link }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <a href={link}>
          <h3>{title}</h3>
        </a>
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
