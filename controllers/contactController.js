const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @dec Get all contacts
// @route Get /api/contacts
// @access private

const getContacts = asyncHandler(async (req, res) => {
  console.log(req.user, "fhdfsdif");
  const contacts = await Contact.find({ user_id: req.user.id });
  console.log(contacts, "aaaa");
  res.status(200).json(contacts);
});

// @dec Create new contact
// @route Post /api/contacts
// @access private

const createContact = asyncHandler(async (req, res) => {
  console.log("this is the body:", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @dec Get contact
// @route Post /api/contacts/:id
// @access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

// @dec update contact
// @route Post /api/contacts/:id
// @access private

const updateContact = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  const contact = await Contact.findById(req.params.id);
  console.log(contact);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "user do not have permission to update other user contacts"
    );
  }

  const updatedContact = await Contact.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
  console.log(updatedContact);
});
// @dec delete contact
// @route Post /api/contacts/:id
// @access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log(contact);
  console.log(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  console.log("helo1");
  if (contact.user_id.toString() !== req.user.id) {
      console.log("helo2");
    res.status(403);
    throw new Error(
      "user do not have permission to delete other user contacts"
    );
  }
  console.log("hlooo");
  await Contact.findOneAndRemove({ _id: req.params.id }, { confirm: true });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
