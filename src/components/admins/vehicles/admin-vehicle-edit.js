import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { question, toast } from "../../../utils/functions/swal";
import { useFormik } from "formik";
import { Alert, Badge, Button, ButtonGroup, Col, Form, Row, Spinner } from "react-bootstrap";
import { createVehicle, deleteVehicleById, deleteVehicleImage, getVehicle, getVehicles, updateVehicle, uploadVehicleImage } from "../../../api/vehicle-service";
import "./admin-vehicles-new.scss"
import { getVehicleImage } from "../../../utils/functions/vehicle-functions";
import Loading from "../../common/loading/loading";

let isImageChanged = false;

const AdminVehicleEdit = () => {

    const [imageSrc, setImageSrc] = useState("");
    const fileImageRef = useRef();
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const navigate = useNavigate();
    const {vehicleId} = useParams();
 
    const [initialValues, setInitialValues] = useState ({

        model: "",
        doors: "",
        seats: "",
        luggage: "",
        transmission: "",
        airConditioning: "",
        fuelType: "",
        year: "",
        pricePerHour: "",
        image:"",
        
    });

    const validationSchema = Yup.object({
        model:Yup.string().required("Please enter vehicle model name"),
        doors:Yup.number().required("Please enter number of doors"),
        seats:Yup.number().required("Please enter number of seats"),
        luggage:Yup.number().required("Please enter number of Luggage"),
        transmission:Yup.string().required("Please enter transmissions type"),
        airConditioning:Yup.string().required("Please enter AC info"),
        fuelType:Yup.string().required("Please enter fuel type"),
        year:Yup.number().required("Please enter years of vehicle"),
        pricePerHour:Yup.number().required("Please enter vehicle price per hour"),
        image:Yup.mixed().required("Please select an image"),

    })

    const onSubmit = async (values) => { 
       setSaving(true);
       try {
        let imageId = values.image[0]

        if(isImageChanged){

            //We must first old image delete
           // await deleteVehicleImage(imageId);    
            
            const newImageFile = fileImageRef.current.files[0];
            const formData = new FormData();
            formData.append("file", newImageFile);
            const resp = await uploadVehicleImage(formData);
            imageId = resp.data.imageId;
            isImageChanged=false;
        }

        const payload = {...values}
        delete payload.image;
        
        await updateVehicle(imageId, vehicleId, payload)
        toast("success", "Car was successfuly updated")

       } catch (error) {
        console.log(error);
        toast("error",error.response.data.message);
       }finally{
        setSaving(false);
       }

     }

     const formik = useFormik ({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true
     })

    const isError = (field) => { 

        return(

        formik.touched[field] && formik.errors[field]
        
        )
    }


    const handleSelectImage = () => { 
        
        fileImageRef.current.click();

     }

    const handleImageChange = () => { 
        
        const file = fileImageRef.current.files[0];
        if(!file) return;
       
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImageSrc(reader.result);
        }
        
        isImageChanged = true;
        
    }

    const loadData = async () => {
        setLoading(true);
        try {
            const resp = await getVehicle(vehicleId)
            setInitialValues(resp.data);
            setImageSrc(getVehicleImage(resp.data.image))
        } catch (err) {
            console.log(err);
        }finally{
            setLoading(false);

        }
    }

    useEffect(() => {
      loadData();
    
    }, [])
    
    const removeVehicle = async() =>{
        setDeleting(true)
        try {
            await deleteVehicleById(vehicleId)
            toast("success","Car was deleted")
            navigate("/rentadmin/vehicles")
        } catch (err) {
            toast("error", err.response.data.message)
        } finally {
            setDeleting(false);
        }
    }

    const handleDelete = () => { 
        question("Are you sure to delete this car?",
            "This process cannot be reversed").then((result)=> {
            if(result.isConfirmed){
            removeVehicle();
            }
        })
     }

     

  return  loading ? ( <Loading/> ) : (
    
    <Form noValidate onSubmit={formik.handleSubmit} >
        <fieldset disabled={initialValues.builtIn}>
        <Row>
            <Col xl={3} className='image-area' >

                <Form.Control type='file' name='image' className='d-none' onChange={handleImageChange} ref={fileImageRef} />
                <img src={imageSrc} className='img-fluid' alt='Car'/>
                {formik.errors.image && 
                (
                    <Badge bg='danger' className='image-area-error'>
                        Please Select an Image
                    </Badge>
                    
                )}
                <Button variant={formik.errors.image ? "danger" : "primary"} onClick={handleSelectImage} >Select Image</Button>
           
            </Col>

            <Col lg={9}>

                <Row>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Model</Form.Label>
                        <Form.Control type='text'
                        {...formik.getFieldProps("model")}
                        className={isError("model") && "is-invalid"}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.model}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Doors</Form.Label>
                        <Form.Control type='number'
                        {...formik.getFieldProps("doors")}
                        className={isError("doors") && "is-invalid"}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.doors}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Seats</Form.Label>
                        <Form.Control type='number'
                        {...formik.getFieldProps("seats")}
                        className={isError("seats") && "is-invalid"}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.seats}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Luggage</Form.Label>
                        <Form.Control type='number'
                        {...formik.getFieldProps("luggage")}
                        className={isError("luggage") && "is-invalid"}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.luggage}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Transmission</Form.Label>
                        <Form.Select
                        {...formik.getFieldProps("transmission")}
                        className={isError("transmission") && "is-invalid"} >
                            <option>Select</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manuel">Manuel</option>
                                <option value="Triptonic">Triptonic</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.transmission}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Air Conditioning</Form.Label>
                        <Form.Select
                        {...formik.getFieldProps("airConditioning")}
                        className={isError("airConditioning") && "is-invalid"} >
                            <option>Select</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.airConditioning}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Fuel Type</Form.Label>
                        <Form.Select
                        {...formik.getFieldProps("fuelType")}
                        className={isError("fuelType") && "is-invalid"} >
                            <option>Select</option>
                                <option value="Electricity">Electricity</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Gasoline">Gasoline</option>
                                <option value="Dizel">Dizel</option>
                                <option value="Hydrogen">Hydrogen</option>
                                <option value="LPG">LPG</option>
                                <option value="CNG">CNG</option>
                        </Form.Select>
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.fuelType}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Year</Form.Label>
                        <Form.Control type='number'
                        {...formik.getFieldProps("year")}
                        className={isError("year") && "is-invalid"}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.year}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md={4} lg={3} className='mb-3'>
                        <Form.Label>Price Per Hour</Form.Label>
                        <Form.Control type='number'
                        {...formik.getFieldProps("pricePerHour")}
                        className={isError("pricePerHour") && "is-invalid"}
                        />
                        <Form.Control.Feedback type='invalid' >
                            {formik.errors.pricePerHour}
                        </Form.Control.Feedback>
                    </Form.Group>

                </Row>
                
            </Col>

        </Row>
        </fieldset>
        {initialValues.builtIn && (
            <Alert variant='danger'>Build-in vehicles can not be deleted and updated</Alert>
        )}

        <div className='text-end'>

            <ButtonGroup aria-label='Basic example'>

                <Button variant='secondary' type="button" onClick={()=>navigate(-1)} >Cancel</Button>

                {!initialValues.builtIn && ( 
                <>
                 <Button variant="primary" type="submit" disabled={saving}>
                     {saving && <Spinner animation="border" size='sm' />}Update
                 </Button>

                <Button variant="danger" type="button" disabled={deleting} onClick={handleDelete} >
                    {deleting && <Spinner animation="border" size='sm' />}Delete
                 </Button>
                </>
                )}
            </ButtonGroup>
        </div>


    </Form>
    
  )
}

export default AdminVehicleEdit