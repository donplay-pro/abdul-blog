const selection = (props) => {
    const defaultOption = props.defaultOption;
    const options = props.operator;

    return ( 
            <select onChange={(e) => props.onValueChange(e.target.value)}>
                <option defaultValue> {defaultOption} </option>
                {
                    options.map( (item) => (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))
                }
            </select>
     );
}

export default selection;