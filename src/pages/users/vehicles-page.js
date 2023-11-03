import React from "react";
import Vehicles from "../../components/users/vehicles/vehicles";
import Spacer from "../../components/common/spacer/spacer";
import PageHeader from "../../components/users/common/page-header/page-header";

const VehiclesPage = () => {
  return <>
            <PageHeader title="Vehicles"/>
            <Spacer/>
            <Vehicles/>
            <Spacer/>
        </>
};

export default VehiclesPage;
