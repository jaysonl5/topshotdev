const queryEditionListings = require('./queryEditionListings')

const dbUpdateScheduler = async () =>{
    qsets = ["d555de31-130c-4682-be6b-62c9575418e0", "d1289e27-b683-4cf3-9592-89adf93e6bcb"]

    let moments = await queryEditionListings.queryEditionListings(sets);
    
    if(!moments){
        console.log("loading..");
    } else{
        console.log("MOMES!")
    }
    
}

dbUpdateScheduler();