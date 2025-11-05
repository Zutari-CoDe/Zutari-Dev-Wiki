import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Why Automate?',
    Image: require('@site/static/img/autorobo.jpg').default,
    description: (
      <>
        Automation reduces manual work, eliminates errors, and accelerates productivity.
        From data cleanup to model generation, automation allows teams to focus on creative and analytical tasks.
        “Let technology handle repetition — so humans can innovate.”
      </>
    ),
  },
  {
    title: 'Computation & Design',
    Image: require('@site/static/img/auto.png').default,
    description: (
      <>
        Computational thinking bridges creativity and logic.
        Through parametric modeling, scripting, and data-driven design, computation transforms ideas into intelligent systems.
        “Code meets creativity — shaping smarter design workflows.”
      </>
    ),
  },
  {
    title: 'Explore the Hub',
    Image: require('@site/static/img/process.png').default,
    description: (
      <>
        This is your central knowledge base for automation and computation.
        Browse documented apps, explore tutorials, and share workflows that push the boundaries of digital engineering.
        “A connected ecosystem for innovation.”
      </>
    ),
  },
];

function Feature({ Image, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={Image} className={styles.featureImage} alt={title} style={{height: "200px", width: "300px", marginTop: "30px"}}/>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
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
