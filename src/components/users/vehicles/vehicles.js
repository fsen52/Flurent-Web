import React, { useEffect, useState } from 'react'
import { Col, Container, Pagination, Row } from 'react-bootstrap'
import SectionHeader from '../common/section-header/section-header'
import { getVehiclesByPage } from '../../../api/vehicle-service';
import VehicleCard from './vehicle-card';
import Spacer from '../../common/spacer/spacer';
import Loading from '../../common/loading/loading';
import "./vehicles.scss";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginition, setPaginition] = useState({});

  const loadData = async(page) => {
            try {
                const resp = await getVehiclesByPage(page);
                const {content, numberOfElements, size, totalElements, totalPages, pageable} = resp.data;
                setVehicles(content);
                setPaginition({numberOfElements, size, totalElements, totalPages, pageable});
            } catch (err) {
                console.log(err);
            } finally{
                setLoading(false);
            }
    
  }

  useEffect(() => {
    loadData()
  
  },[] );
  
  
    return (
    <Container>
        <SectionHeader title="Vehicle Models" subTitle="Lux &amp; Economic"
            desc="To contribute to positive bla bla bla"/>
            <Spacer height={30}/>
        {loading ? <Loading/> : ( 
        <>
            <Row className='g-4'>
                {vehicles.map(vehicle => 
                // TODO "id" must change with "carId" 
                <Col key={vehicle.carId} sm={6} md={4} lg={3}><VehicleCard {...vehicle}/></Col> 
                )}
            
            
            </Row>
        
            {paginition.totalPages > 1 && ( 
                <Row className='vehicles-pagination'>
                    <Pagination >
                        <Pagination.First onClick={()=> loadData(0)} 
                            disabled={paginition.pageable.pageNumber <=0}/>
                        <Pagination.Prev onClick={()=> loadData(paginition.pageable.pageNumber-1)} 
                            disabled={paginition.pageable.pageNumber <=0}/>
                            {[...Array(paginition.totalPages)].map((item, index)=> (
                                <Pagination.Item active={index === paginition.pageable.pageNumber}
                                    key={index} onClick={()=>loadData(index)}>
                                        {index + 1}
                                </Pagination.Item>

                            ))}

                            <Pagination.Next onClick={()=> loadData(paginition.pageable.pageNumber + 1)} 
                                disabled={paginition.pageable.pageNumber >= paginition.totalPages-1}/>
                            <Pagination.Last  onClick={()=> loadData(paginition.totalPages-1)} disabled={paginition.pageable.pageNumber >= paginition.totalPages-1}/>
                    </Pagination>
                </Row>

            )}

        </>

        )}

       

    </Container>
  )
}

export default Vehicles