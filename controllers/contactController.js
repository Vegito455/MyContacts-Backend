const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private - private because we have need authentication token for this function to be triggered
const getContacts = asyncHandler(async (req, res) => {
  // const contact = await Contact.find();
  const contact = await Contact.find({ user_id: req.user.id });

  res.status(200).json(contact);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private - private because we have need authentication token for this function to be triggered
const createContacts = asyncHandler(async (req, res) => {
  console.log("create contacts body-->", req.body);
  const { name, email, phone } = req.body;
  console.log("req.body--->", name, email, phone);

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private - private because we have need authentication token for this function to be triggered
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!", res.statusCode);
  }
  res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private - private because we have need authentication token for this function to be triggered
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!", res.statusCode);
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update other user contacts"
    );
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private - private because we have need authentication token for this function to be triggered
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!", res.statusCode);
  }

if (contact.user_id.toString() !== req.user.id) {
  res.status(403);
  throw new Error(
    "User don't have permission to delete other user contacts"
  );
}

  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
};
