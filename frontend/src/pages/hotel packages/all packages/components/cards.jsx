//each card - All packages
import { Link } from "react-router-dom";
import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    
  } from "@material-tailwind/react";
  import image_card from '../../../../assets/tour_landing.jpg'
   
  export function BookingCard({id,package_name, room_name, SActivity_name, spa_name, package_des, price}) {
    return (
      <Card className="w-full max-w-[26rem] shadow-lg">
        <CardHeader floated={false} color="blue-gray">
          <img
            src={image_card}
            alt="ui/ux review check"
          />
          <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
          
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between mb-3">
            <Typography variant="h4" color="blue-gray" className="font-bold text-center">
              {package_name}
            </Typography>
            
          </div>
          <Typography color="gray">
          Room Type : {room_name}<br/>
          Special Activity : {SActivity_name}<br/>
          Spa Package : {spa_name}<br/>
          <br/>
          <i>{package_des}</i><br/>
          <br/>
          Total Price : Rs.{price}
          </Typography>
          
                  
           
        </CardBody>
        <CardFooter className="pt-3">
        <Link to={`/hotel/${id}/${price}`}>
        <Button size="lg" fullWidth={true}>
            Book Now
          </Button>
        </Link>
          
          
        </CardFooter>
      </Card>
    );
  }

  