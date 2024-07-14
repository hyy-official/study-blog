const ImageLoader = ({ src, width, quality }) => {
    const isProd = process.env.NODE_ENV === 'production';
    const basePath = isProd ? '/study-blog' : '';
    return `${basePath}${src}?w=${width}&q=${quality || 75}`;
  }
  
  export default ImageLoader;