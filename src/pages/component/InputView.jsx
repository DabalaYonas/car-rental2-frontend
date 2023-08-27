
function InputView(props) {
    return <div className="input-container">
      <label><i className="{props.iconClass}"></i>{props.title}</label>
      <input type={props.type} placeholder={props.placeholder} className="input" />
    </div>
}

export default InputView()