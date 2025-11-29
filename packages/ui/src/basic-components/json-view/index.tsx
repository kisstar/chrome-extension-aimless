import type { ReactJsonViewProps } from 'react-json-view'
import ReactJson from 'react-json-view'

const ReactJsonComp = (ReactJson as any).default

const JsonView: React.FC<ReactJsonViewProps> = (props: ReactJsonViewProps) => {
  return (
    <ReactJsonComp
      iconStyle="square"
      displayDataTypes={false}
      {...props}
    />
  )
}

export default JsonView
