import { FC } from "react";

const ErrorComponent: FC<any> = ({err}: any) => {
  return (
    <div className="alert alert-danger" role="alert">
  		<h4 className="alert-heading">Error!</h4>
  		<p>Transaction not initiated due to</p>
			<hr />
  		<p className="mb-0"><code>{ err ? err : 'Some error occured' }</code></p>
		</div>
  )
}

export default ErrorComponent;