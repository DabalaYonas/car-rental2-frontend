import "./Pagination.css";

function Pagination(props) {
  
  function changeCurrentPage(i) {
    if (i >= 0 && i < props.total) {
      props.changeCurrentPage(i);
      window.scrollTo(0, 0);
    }
  }

  const nums = [];
  for (let i = 0; i < props.total; i++) {
    if (i === props.currentPage) {
      nums.push(<div key={i} onClick={() => changeCurrentPage(i)} className="pagination:number pagination:active">{i+1}</div>);
    } else {
      nums.push(<div key={i} onClick={() => changeCurrentPage(i)} className="pagination:number">{i+1}</div>); 
    }
  }
    return <><div className="pagination:container mr-t-3">
    <div className={"pagination:number arrow" + (props.currentPage === 0 && " pagination:disable")} 
    onClick={() => {changeCurrentPage(props.currentPage - 1)}}
    style={{borderRadius: "7px 0px 0px 7px"}}>
      <svg width="18" height="18">
        <use href="#left" />
      </svg>
      <span className="arrow:text">Previous</span> 
    </div>

    {nums}
    
    <div className={"pagination:number arrow" + (props.currentPage === (props.total-1) && " pagination:disable")} 
        onClick={() => {changeCurrentPage(props.currentPage + 1)}}
        style={{borderRadius: "0px 7px 7px 0px"}}>
      <span className="arrow:text">Next</span> 
      <svg width="18" height="18">
        <use href="#right" />
      </svg>
    </div>
  </div>
  
  <svg className="hide">
    <symbol id="left" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></symbol>
    <symbol id="right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></symbol>
  </svg></>
}

export default Pagination;