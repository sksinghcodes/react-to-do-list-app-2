const Control = props => {
    const { action, classNameValue, text} = props;
    return (
        <button 
            onClick={action}
            className={classNameValue}
        >{text}
        </button>
    );
}

export default Control;