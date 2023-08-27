
function Card(props) {         
    return <div className="my-card" style={{width: 400}}>
    <div className="my-card-header">
        <h2>{props.title}</h2>
    </div>
    
    <div className="my-card-body">
        {props.cardDetails && Object.entries(props.cardDetails).map(([key, value]) => (
        <div key={key} className="container-fluid">
            <p className="small-text">{key}</p>
            <p className="disc-text">{value}</p>
        </div>))}
    </div>
    
    {props.cardFooter && Object.entries(props.cardFooter).map(([key, value]) => (
        <div key={key} className="my-card-footer">
            <div className="container-fluid">
                <p className="small-text">{key}</p> 
                <p className="disc-text" style={{color: props.cardFooterColor}}>{value}</p>
            </div>
        </div>
    ))}
</div>
}

export default Card