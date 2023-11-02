
import Swal from "sweetalert2"


export const question = (title,text="") => { 

    return Swal.fire({
        title,
        text,
        icon: "warning",
         showCancelButton: true
    })
}

export const toast = (icon="info", title) => {
    return Swal.fire({
        position: "top-end",
        icon,
        title,
        showConfirmButton: false,
        timer: 1500

    })
}