import * as React from 'react';

type ImgMode = 'normal' | 'base64' | 'cdn' | 'text' | 'textbase' | 'next';

interface ImgProps {
  src: string;
  alt?: string;
  mode?: ImgMode;
  width?: string | number;
  height?: string | number;
  format?: 'webp' | 'jpg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
  text?: string;
  theme?: 'light' | 'dark';
  fontsize?: string;
}

declare const Img: React.FC<ImgProps>;

export default Img;
