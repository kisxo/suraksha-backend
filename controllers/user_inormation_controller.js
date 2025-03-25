import user_model from "../models/user_models.js";

const user_info_controller = async (req, res) => {
    // try {
    // 	fs.mkdir('./uploads', { recursive: true }, (err) => {

    // 		console.log(err);

    // 	});
    // } catch (error) {
    // 	// throw (err)
    // 	console.error(error)
    // }

    const { user_name, phn_no, address, contact,location } = req.body
    console.log(location);

    console.log(user_name);
    console.log(phn_no);
    console.log(address);
    console.log(contact);

    //saved in the database

    const data=await user_model.create({
        name: user_name,
        // phn_
        address: address,
        contacts: contact,
        location: location,
    })



    return res.json(data)

}


export default user_info_controller