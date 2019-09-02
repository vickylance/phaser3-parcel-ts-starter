// images.ts
import Images from '../../assets/**/*.png';
import { iterate } from './utils/utils';

export default Object.assign(...iterate(Images, ''));
