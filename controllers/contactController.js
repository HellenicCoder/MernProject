const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
//desc for get allc contact
const getContacts = asyncHandler( async (req , res) => {

    const contacts =await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts)
})

const createContact = asyncHandler( async(req , res) => {
    console.log("you are:",req.body)
    const { name , email , phone } = req.body
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("all fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact)
})

const getContact = asyncHandler( async (req , res) => {
    const id = req.params.id
    const contact = await Contact.findById(id)
    if(!contact){
       res.status(404)
       throw new Error("contact not found")
    }
    res.status(200).json(contact)
})
const putContact = asyncHandler( async(req , res) => {
    const id = req.params.id
    const reqBody = req.body
    const contact = await Contact.findById(id)
    if(!contact){
       res.status(404)
       throw new Error("contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user dont have permisson to update other user contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(id , reqBody, {new : true})
    res.status(200).json(updatedContact)
})

const deleteContact = asyncHandler( async(req , res) => {
    const id = req.params.id
    const contact = await Contact.findById(id)
    if(!contact){
       res.status(404)
       throw new Error("contact not found")
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user dont have permisson to update other user contacts")
    }
    await Contact.deleteOne({_id: id})
    res.status(200).json(contact)
})
module.exports = { getContacts , createContact, getContact, putContact , deleteContact}