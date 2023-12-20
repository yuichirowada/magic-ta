
import { useMagic } from "../MagicProvider";


function Wallet() {
    const { magic, magicUser, accountBalance } = useMagic();

    return (
        <div>
        <table>
            <tr><th>Wallet Type</th><td>{magicUser && magicUser.walletType ? magicUser.walletType : 'loading...'}</td></tr>
            <tr><th>Network</th><td>{magic && magic.networkHash ? magic.networkHash : 'loading...'}</td></tr>
            <tr><th>Your Public Address</th><td>{magicUser && magicUser.publicAddress ? magicUser.publicAddress : 'loading...'}</td></tr>
            <tr><th>Account Balance</th><td>{accountBalance}</td></tr>
        </table>
            <button className="button" onClick={() => magic.wallet.showUI()}>Make Transaction</button>
        </div>
    );
}

export default Wallet;
