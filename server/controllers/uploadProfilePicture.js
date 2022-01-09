const User = require("../models/user.model");

const uploadProfilePicture = async (req, res) => {
   const { user } = req.body;
   const userDetails = JSON.parse(user);

   try {
      const profileImageRes = await User.findOneAndUpdate(
         { _id: userDetails._id },
         { profilePicture: req.file.filename },
         { new: true }
      );
      res.status(200).send(profileImageRes);
   } catch (e) {
      console.log("Error:  ", e);
   }
};
module.exports = uploadProfilePicture;
