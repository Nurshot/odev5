var mongoose=require('mongoose');

var Venue=mongoose.model("venue");



var converter = (function(){

    var earthRadius=6371;
    var radian2Kilometer=function(radian){
        return parseFloat(radian*earthRadius);
    };

    var kilometer2Radian=function(distance){
        return parseFloat(distance/earthRadius);
    };

    return {
        radian2Kilometer,
        kilometer2Radian,
    };
}
)();



const createResponse=function(res,status,content){

    res.status(status).json(content);
};

const listVenues=async function(req,res){
    var lat=parseFloat(req.query.lat);
    var long=parseFloat(req.query.long);

    var point={
        type: "Point",
        coordinates: {lat,long},
    };
    
    var geoOptions={
        distanceField:"dis",
        spherical:true,
    };

    try{
        const result= await Venue.aggregate([
            {
                $geoNear:{
                    near:point,
                    ...geoOptions,
                },
            },

        ]);

        const venues=result.map((venue)=>{

            return{
                distance:converter.kilometer2Radian(venue.dis),
                name:venue.name,
                adress:venue.adress,
                rating:venue.rating,
                foodanddrink:venue.foodanddrink,
                id: venue._id,
            };
        });

        createResponse(res,200,venues);
        
    }catch(e){
        createResponse(res,200,{status: "Enlem ve boylam zorunlu ve sıfırdan farklı olmalı."});
    }
};

const addVenue=function(req,res){
    createResponse(res,200,{status: "Başarılı."});

};

const getVenue=async function(req,res){
    try{
        await Venue.findById(req.params.venueid).exec().then(
            function(venue){
                createResponse(res,200,venue);   
            }
        );

    }
    catch(error){
        createResponse(res,404,{status: "Böyle bir mekan yok."});
    }
};

const updateVenue=function(req,res){
    createResponse(res,200,{status: "Başarılı."});

};

const deleteVenue=function(req,res){
    
    createResponse(res,200,{status: "Başarılı."});
};

module.exports={
    listVenues,addVenue,updateVenue,deleteVenue,getVenue
};


