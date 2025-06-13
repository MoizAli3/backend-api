import User from "../models/user.js";

export const handleCreateUser = async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    if (!(username, email, password, phone))
      return res.status(400).send({ message: "please filled all field!" });

    const result = await User.create({
      username,
      email,
      password,
      phone,
    });

    console.log(result);

    res.status(200).send({ status: 200, message: "User Created Succesully!" });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};

export const handleGetAllUsers = async (req, res) => {
  try {
    const getDbUser = await User.find({});
    res.status(200).send({ getDbUser });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};

export const handleGetUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const getDbUser = await User.findById(id);
    res.status(200).send({ getDbUser });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};

export const handleUpdateUserById = async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    if (!username || !email || !password || !phone)
      return res.status(400).send({ message: "please filled all field!" });
    const id = req.params.id;

    const updateUser = await User.findByIdAndUpdate(id, {
      username,
      email,
      password,
      phone,
    });

    res.status(200).send({
      message: "User updated successfully!",
      user: updateUser,
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};

export const handleDeleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ status: 404, message: "User not found!" });
    }

    res.status(200).send({
      message: "User Deleted successfully!",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: "Internal Server Error!" });
  }
};
