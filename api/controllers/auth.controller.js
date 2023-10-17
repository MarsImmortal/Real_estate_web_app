import { User } from "../models/user.model.js";
import bcryptjs from'bcryptjs';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password : hashedPassword});
    try {
        await newUser.save(); 
        res.status(200).json({message : 'User saved successfully' });
    } catch (e) {
        res.status(500).json({message : e.message});
    }
}
// Compare this snippet from api/routes/auth.routes.js: