import Vehicle from "../models/Vehicle.model.js";

export const addVahicle = async (request, response) => {
    try {
        const { vehicleNumber, ownerName } = request.body;
        const newVehicle = new Vehicle({ vehicleNumber, ownerName });
        const savedVehicle = await newVehicle.save();
        return response.status(201).json({ message: "vahhicle addedd successfully", Vahicle: savedVehicle });
    } catch (error) {
        response.status(500).json({ message: "Internal server error" });
    }
}


export const getVehicleList = async (request, response) => {
    try {
        Vehicle.find()
            .then(result => {
                return response.status(200).json({ vehicleList: result });
            }).catch(err => {
                return response.status(500).json({ error: "Internal server error" });
            });
    }
    catch (err) {
        console.log(err)
        response.status(500).json({ error: "Internal server error" });
    }
}