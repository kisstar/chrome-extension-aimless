/**
 * @description
 */

import { $$ } from '@aimless/shared'
import config from '../config'

function showMore() {
  Array.from($$<HTMLImageElement>(config.showMoreBtnSelector)).forEach(item =>
    item.click(),
  )
}

// main()
showMore()
