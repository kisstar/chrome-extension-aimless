/**
 * @description
 */

import { $$ } from '@chrome-extension-aimless/shared'
import config from '../config'

function showMore() {
  Array.from($$<HTMLImageElement>(config.showMoreBtnSelector)).forEach(item =>
    item.click(),
  )
}

// main()
showMore()
