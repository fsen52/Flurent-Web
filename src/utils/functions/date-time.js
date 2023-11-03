import moment from "moment";

export const combineDateTime = (date,time) => { 
    return moment(`${date} ${time}`).format("MM/DD/YYYY HH:mm:ss");
 }

export const checkExpireDate = (expireDate) => {
    if(!expireDate) return false;
    if(expireDate.includes("_")) return false; 
    const date = moment(`28/${expireDate}`, "DD/MM/YY");
    if(!date.isValid()) return false;
    if(date < new Date()) return false;
    return true;
}

export const getCurrentDate = () => {
    return moment().format("YYYY-MM-DD")
}

export const getDate = (dateTime) => {
    return moment(dateTime).format("YYYY-MM-DD");
}

export const checkDates = (dates) => {
    const {pickUpDate, pickUpTime, dropOffDate, dropOffTime} = dates;
    
    const startDate = moment(`${pickUpDate} ${pickUpTime}`);
    const endDate = moment(`${dropOffDate} ${dropOffTime}`);

    return endDate>startDate.add(1,"h");
}