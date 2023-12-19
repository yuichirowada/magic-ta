import { useMagicOnAuth0OIDC } from "../MagicOnAuth0OIDCProvider";

const DebuggerConsole = ({ dataObject }) => {

    const data = useMagicOnAuth0OIDC();
    console.log(data);

    const renderSecondLevel = (parentKey, secondLevelObject) => {
        return (
            <ul>
                {Object.entries(secondLevelObject).map(([key, value]) => {
                    const compositeKey = `${parentKey}.${key}`;
                    let displayValue = (typeof value === 'object' && value != null) ? '[Object]' : value;
                    return <li key={compositeKey}>{compositeKey}: {displayValue} [{typeof displayValue}]</li>;
                })}
            </ul>
        );
    };

    return (
        <div className="debug">
            {Object.entries(data).map(([key, value]) => {
                return (
                    <div key={key}>
                        {typeof value === 'object' && value != null
                            ? renderSecondLevel(key, value)
                            : <p>{key}: {value} [{typeof value}]</p>}
                    </div>
                );
            })}
        </div>
    );
};



export default DebuggerConsole;
