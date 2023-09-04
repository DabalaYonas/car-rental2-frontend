
function BoxIconSmall(props) {
    return <div className="box-container align-items-center ">
      <div className="box box-thin box-square item-center">
        <i className={props.iconClass}></i>
      </div>
      <span className="disc-text">{props.title}</span>
    </div>
  }

  export default BoxIconSmall;