const admin = require("firebase-admin");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { setGlobalOptions } = require("firebase-functions/v2");

setGlobalOptions({ region: "southamerica-east1" });

admin.initializeApp();

exports.sendNotificationOnMessage = onDocumentCreated("chats/{chatId}/messages/{messageId}", async (event) => {
    const chatId = event.params.chatId;
    const messageData = event.data.data();


    if (!messageData) return null;

    const senderId = messageData.senderId;
    const senderName = messageData.senderName ?? '';
    const messageText = messageData.content;

    const chatDoc = await admin.firestore().collection("chats").doc(chatId).get();
    if (!chatDoc.exists) {
        console.log("Chat not found");
        return null;
    }

    const participants = chatDoc.data().participants || [];
    const recipientIds = participants.filter(uid => uid !== senderId);

    if (recipientIds.length === 0) {
        console.log("Users to receive not found");
        return null;
    }

    const usersCollection = admin.firestore().collection("users");
    const tokens = [];

    for (const recipientId of recipientIds) {
        const userDoc = await usersCollection.doc(recipientId).get();
        if (userDoc.exists && userDoc.data().fcmToken) {
            tokens.push(userDoc.data().fcmToken);
        }
    }

    if (tokens.length === 0) {
        console.log("fcm tokens not found");
        return null;
    }

    const payload = {
        notification: {
            title: `Nova mensagem de ${senderName}`,
            body: messageText.length > 50 ? messageText.substring(0, 50) + "..." : messageText,
        },
        data: {
            chatId: chatId,
        },
        tokens: tokens,
    };

    try {
        await admin.messaging().sendEachForMulticast(payload);
        console.log("Notification send successfully to:", recipientIds);
    } catch (error) {
        console.error("Error on send notification:", error);
    }

    return null;
});