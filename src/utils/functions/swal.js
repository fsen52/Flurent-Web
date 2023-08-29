
import Swal from "sweetalert2"





export const question = (title,text="") => { 



return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true
})


}