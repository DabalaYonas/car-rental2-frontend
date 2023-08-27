export function SucceessfulCard(props) {
    return <div className="successful-card">
    <div class="my-card">
        <div className="card-head">
            <i class="checkmark">✓</i>
        </div>
        <div>
            <h1>{props.header}</h1> 
            <p>{props.children}</p>
        </div>
        </div>
    </div>

}