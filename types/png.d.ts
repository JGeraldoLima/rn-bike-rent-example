declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';

  const value: ImageSourcePropType | ImageURISource;
  export default value;
}
