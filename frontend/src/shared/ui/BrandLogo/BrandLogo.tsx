import React from 'react';
import { Link } from 'react-router-dom';
import feviconSvg from '@/assets/fevicon.svg';
import logoTextSvg from '@/assets/logo_text.svg';
import './BrandLogo.css';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  collapsed?: boolean;
  showDivider?: boolean;
  linkTo?: string;
  className?: string;
  altText?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = React.memo(({
  size = 'md',
  collapsed = false,
  showDivider = false,
  linkTo,
  className = '',
  altText = 'Jeevayurniketan - Restore | Align | Awaken',
}) => {
  const content = (
    <>
      <img
        src={feviconSvg}
        alt="Jeevayurniketan Emblem"
        className="brand-logo__emblem"
      />
      {!collapsed && (
        <img
          src={logoTextSvg}
          alt={altText}
          className="brand-logo__text"
        />
      )}
    </>
  );

  const classes = [
    'brand-logo',
    `brand-logo--${size}`,
    collapsed ? 'brand-logo--collapsed' : '',
    showDivider && !collapsed ? 'brand-logo--with-divider' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (linkTo) {
    return (
      <Link to={linkTo} className={classes} title="Jeevayurniketan">
        {content}
      </Link>
    );
  }

  return (
    <div className={classes} title="Jeevayurniketan">
      {content}
    </div>
  );
});

BrandLogo.displayName = 'BrandLogo';
