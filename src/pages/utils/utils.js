
function calcDiff(startDate, endDate) {
    var date1 = startDate;
    var date2 = endDate;
    var a = new Date(date1);
    var b = new Date(date2);
    let one_day = 1000*60*60*24;
    return (Math.ceil((b.getTime() - a.getTime())/one_day));
}

export default calcDiff