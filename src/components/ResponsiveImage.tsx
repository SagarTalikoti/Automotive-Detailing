import React from 'react';
import manifestData from '../data/imageManifest.json';

interface ImageManifestEntry {
  base: string;
  width: number;
  height: number;
  aspectRatio: number;
  fallbackSrc: string;
  srcSetAvif: string;
  srcSetWebp: string;
  srcSetJpg: string;
  widths: number[];
}

const manifest: Record<string, ImageManifestEntry> = manifestData as Record<string, ImageManifestEntry>;

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  className = '',
  imgClassName = '',
  width,
  height,
  ...props
}) => {
  const entry = manifest[src];

  if (!entry) {
    return (
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        // @ts-expect-error - fetchpriority is standard in modern HTML
        fetchpriority={priority ? 'high' : 'auto'}
        width={width}
        height={height}
        className={className || imgClassName}
        {...props}
      />
    );
  }

  const explicitWidth = width || entry.width;
  const explicitHeight = height || (width ? Math.round(Number(width) / entry.aspectRatio) : entry.height);

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={entry.srcSetAvif} sizes={sizes} />
      <source type="image/webp" srcSet={entry.srcSetWebp} sizes={sizes} />
      <source type="image/jpeg" srcSet={entry.srcSetJpg} sizes={sizes} />
      <img
        src={entry.fallbackSrc || src}
        alt={alt}
        width={explicitWidth}
        height={explicitHeight}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        // @ts-expect-error - fetchpriority is standard in modern HTML
        fetchpriority={priority ? 'high' : 'auto'}
        className={imgClassName || className}
        {...props}
      />
    </picture>
  );
};
