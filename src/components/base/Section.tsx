import classNames from 'classnames';

interface SectionProps extends Omit<null, 'className'> {
  className?: string;
  containerClassName?: string;
}

const Section = ({ className, containerClassName, ...rest }: SectionProps) => {
  return (
    <section className={classNames(className)}>
    </section>
  );
};

export default Section;
