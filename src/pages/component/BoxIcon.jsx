
function BoxIcon(props) {
    return <div className="box-container">
      <div className="box box-small box-square item-center">
        <i className={props.iconClass}></i>
      </div>
      <span className="disc-text">{props.title}</span>
    </div>
  }

  export default BoxIcon