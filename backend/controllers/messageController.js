const mongoose = require("mongoose");
const Conversation = require("../models/conversationmodel");
const Message = require("../models/messagemodel");
const { getReceiverSocketId ,io} = require("../socket/socket");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    //if there is an existing conversation between 2 users the mesg id in the messageSchema will be pushed to the messaages of the conversationSchema
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    //if messaging for the first time
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //saves the messages and conversations in the database
    await Promise.all([conversation.save(), newMessage.save()]);

    //socketio functionality
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      // io.to(<socket_id>).emit() used to send events to specific client
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; //receiver id
    const senderId = req.user._id;

    //populate function do not sent the reference but it sends the actuall content that it stored, in this case its our messages
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    //returns a empty array
    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
