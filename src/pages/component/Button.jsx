
function Button(props) {
    return <button type="submit" className={"btn btn-secondary " + props.size} onClick={props.onClick}>{props.value} <i className={props.iconClass}></i></button>
  }

  export default Button