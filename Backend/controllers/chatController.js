//* Api  controller to create a new chat
import Chat from "../models/Chat.js";
export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const chatData = {
      userId,
      messaages: [],
      name: "New chat",
      username: req.user.name,
    };
    await Chat.create(chatData);
    res.json({
      success: true,
      message: "Chat  created ",
    });
  } catch (error) {
    res.json({
      success: false,
      messsage: error.message,
    });
  }
};

//* Api  Controller for getting all  chat
export const getChats = async (req, res) => {
  try {
    const userId = req.user._id;
    const chats = await Chat.find({ userId }).sort({ updated: -1 });
    res.json({
      success: true,
      chats,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};


//* Api for  controller for delete the user
export const deleteChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const chatId = req.body.id;
    await Chat.deleteOne({ _id: chatId, userId });
    res.json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};