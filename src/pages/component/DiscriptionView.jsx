
function DiscriptionBox(props) {

    return <div className="box-disc">
      <div className="box box-large box-square item-center">
      <i className={props.iconClass}></i>
      </div>
      <h2 className="box-title">{props.title}</h2>
      <p className="small-text">{props.children}</p>
    </div>
  }

  
  export default DiscriptionBox