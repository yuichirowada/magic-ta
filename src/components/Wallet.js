import React, { useState } from 'react';
import { useMagicOnAuth0OIDC } from "../MagicOnAuth0OIDCProvider";

function Wallet() {

    const { magic, magicUser, networks, network, updateNetwork } = useMagicOnAuth0OIDC();

    const [selectedNetwork, setSelectedNetwork] = useState(network);

    const handleSelectChange = (event) => {
        const newValue = event.target.value;
        setSelectedNetwork(newValue);
        updateNetwork(newValue);
    };

    return (
        <div>
            <select className="select" value={selectedNetwork} onChange={handleSelectChange}>
                {Object.keys(networks).map(network => <option key={network} value={network}>{network}</option>)}
            </select>
            <div>Wallet Type: {magicUser && magicUser.walletType ? magicUser.walletType : 'loading...'}</div>
            <div>Network: {magic && magic.networkHash ? magic.networkHash : 'loading...'}</div>
            <div>Your Public Address: {magicUser && magicUser.publicAddress ? magicUser.publicAddress : 'loading...'}</div>
            <button className="button" onClick={() => magic.wallet.showUI()}>Make Transaction</button>

        </div>
    );
}

export default Wallet;
