import moment from "moment";

export const combineDateTime = (date,time) => { 
    return moment(`${date} ${time}`).format("MM/DD/YYYY HH:mm:ss");
 }

