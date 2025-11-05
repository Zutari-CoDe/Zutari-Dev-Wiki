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
				backgroundImage: "url('/img/Banner_Mustard_logo.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				height: 250
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
		title={`Hello from ${siteConfig.title}`}
		description="Description will go into a meta tag in <head />">
		<HomepageHeader />
		<main>
			<HomepageFeatures />
		</main>
	</Layout>
  );
}
