
import { useMagic } from "../MagicProvider";


function Wallet() {
    const { magic, magicUser, accountBalance } = useMagic();

    return (
        <div>
            <div>Wallet Type: {magicUser && magicUser.walletType ? magicUser.walletType : 'loading...'}</div>
            <div>Network: {magic && magic.networkHash ? magic.networkHash : 'loading...'}</div>
            <div>Your Public Address: {magicUser && magicUser.publicAddress ? magicUser.publicAddress : 'loading...'}</div>
            <div>Account Balance: {accountBalance}</div>
            <button className="button" onClick={() => magic.wallet.showUI()}>Make Transaction</button>
        </div>
    );
}

export default Wallet;
