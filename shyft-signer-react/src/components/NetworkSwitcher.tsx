import { FC } from 'react';
import { useNetworkConfiguration } from '../contexts/NetworkConfigurationProvider';

export const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } = useNetworkConfiguration();

  return (
		<div className="w-100">
			<div className="w-25 ms-1 ms-lg-auto">
      <select             
        value={networkConfiguration}
        onChange={(e) => setNetworkConfiguration(e.target.value)} 
        className="form-select"
      >
        <option value="mainnet-beta">mainnet</option>
        <option value="devnet">devnet</option>
        <option value="testnet">testnet</option>
      </select>
			</div>
		</div>
  );
};
