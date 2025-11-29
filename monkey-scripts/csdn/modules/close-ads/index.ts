import { appendStyle } from '@chrome-extension-aimless/shared'
import config from '../../config'
import styleContent from './index.css?raw'

// main()
appendStyle(styleContent, { className: config.styleClassName })
