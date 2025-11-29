import { createHashRouter, Navigate } from 'react-router-dom'
import {
  MenuPath,
} from '../constants'
// tools
import JsonTool from '../views/json/Json'
import URLTool from '../views/url/URL'

const router = createHashRouter([
  {
    path: '/',
    element: (
      // 重定向到 json 页面
      <Navigate to={`${MenuPath.TOOL_JSON}`} />
    ),
  },
  {
    // json 处理
    path: MenuPath.TOOL_JSON,
    element: <JsonTool />,
  },
  {
    // url 处理
    path: MenuPath.TOOL_URL,
    element: <URLTool />,
  },
])

export { router }
