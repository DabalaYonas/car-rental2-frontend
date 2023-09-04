
function RateView(props) {
  var rate = props.rate
  var rated = rate % 6
  var unrated = 5 - rate
  var ratedItem = []
  var unratedItem = []
  { for(var i = 0; i < rated; i++) {ratedItem[i] = <i key={i} className="bi bi-star-fill"></i>} }
  { for(var i = 0; i < unrated; i++) {unratedItem[i] = <i key={i} className="bi bi-star"></i>} }
    return <div className="rates">
      {ratedItem.map((v) => v)}
      {unratedItem.map((v) => v)}
    </div>
  }

  export default RateView