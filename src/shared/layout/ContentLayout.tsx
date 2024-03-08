import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  title: string;
}

const ContentLayout = ({ title, children }: IProps) => {
  return (
    <div>
      <h2 className="mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default ContentLayout;
