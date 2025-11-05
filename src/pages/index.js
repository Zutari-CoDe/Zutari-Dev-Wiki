import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={{
        backgroundImage: `url(https://Zutari-CoDe.github.io/Zutari-Dev-Wiki/img/Banner_Mustard_logo.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '250px',
      }}
    >
      <div className="container">
        {/* Content here */}
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
	<Layout
		title={`Zutari Dev Wiki`}
		description="A centralized knowledge hub for developers at Zutari. This repository serves as a collaborative space for documenting best practices, coding standards, workflows, and technical guidelines.">
		<HomepageHeader />
		<main>
			<HomepageFeatures />
		</main>
	</Layout>
  );
}
