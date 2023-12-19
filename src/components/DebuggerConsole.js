import { useMagic } from "../MagicProvider";

const DebuggerConsole = () => {

    const data = useMagic();
    function flattenObject(obj, depth = 1, parentKey = '', result = {}) {
        for (const [key, value] of Object.entries(obj)) {
            const newKey = parentKey ? `${parentKey}.${key}` : key;
    
            if (typeof value === 'object' && value !== null) {
                if (depth < 3) {
                    flattenObject(value, depth + 1, newKey, result);
                } else {
                    result[newKey] = '[object]';
                }
            } else {
                if (value == null) { result[newKey] = '[blank]'; }
                else if (typeof value == 'function') { result[newKey] = '[function]'; }
                else { result[newKey] = value.toString(); }
            }
        }
        return result;
    }
    const flattenedData = flattenObject(data);

    return (
        <div className="debug">
            <button className="button" onClick={() => console.log(data)}>console.log(data)</button>
            {Object.entries(flattenedData).map(([key, value]) => {
                return (
                    <div key={key}><p><span style={{ color: 'darkgray' }}>{key}:</span> {value == null || typeof value === 'function' ? '-' : value.toString()}</p></div>
                );
            })}
        </div>
    );
};



export default DebuggerConsole;
