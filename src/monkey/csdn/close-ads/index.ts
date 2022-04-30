import { appnedStyle } from '@utils';
import config from '../config';
import styleContent from './index.css';

// main()
appnedStyle(styleContent, { className: config.styleClassName });
