import classNames from 'classnames';
import { PropsWithChildren, ReactElement } from 'react';
import { Badge as BsBadge, BadgeProps as BsBadgeProps } from 'react-bootstrap';

export type BadgeVariant = 'esfront' | 'default' | 'tag';
export type BadgeBg = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

interface BadgeProps extends BsBadgeProps {
  variant?: BadgeVariant;
  bg?: BadgeBg;
  className?: string;
  icon?: ReactElement;
  iconPosition?: 'start' | 'end';
  iconFamily?: 'fa' | 'unicons' | 'feather';
}

const Badge = ({
  children,
  bg,
  icon,
  className,
  variant = 'default',
  iconPosition = 'start',
  iconFamily = 'feather',
  ...rest
}: PropsWithChildren<BadgeProps>) => {
  return (
    <BsBadge
      className={classNames(className, {
        [`badge-esfront badge-esfront-${bg}`]: variant === 'esfront',
        'badge-tag': variant === 'tag',
      })}
      bg={['esfront', 'tag'].includes(variant) ? '' : bg}
      {...rest}
    >
      {variant === 'esfront' ? (
        <>
          {icon ? (
            <>
              {icon && iconPosition === 'start' && icon}
              <span
                className={classNames({
                  'badge-label': iconFamily === 'feather',
                })}
              >
                {children}
              </span>
              {icon && iconPosition === 'end' && icon}
            </>
          ) : (
            children
          )}
        </>
      ) : (
        children
      )}
    </BsBadge>
  );
};

export default Badge;
