# Chat Notification

<p align="center">
  <a href="https://nodejs.org/en">
     <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white" alt="Node.js" width="100"/>
  </a>
  <a href="https://firebase.google.com/?gad_source=1&gclid=CjwKCAiAnpy9BhAkEiwA-P8N4rNWWo9B7nFbuJ_S4ZEnDEtjkQLSwIM7wCUnlR3Kgfmbu7EpKgpEIhoCJt0QAvD_BwE&gclsrc=aw.ds&hl=en">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black" alt="Firebase" width="100"/>
  </a>
</p>

A Firebase Cloud Functions-based notification that sends real-time notifications to chat participants when new messages are received.

This project was implemented to be used alongside the https://github.com/RafaelGasparoto/chat_flutter_firebase project, a chat app built with Flutter.

## Description

This project implements a notification service that:
- Monitors new messages in Firebase Firestore chat collections
- Sends push notifications to chat participants using Firebase Cloud Messaging (FCM)
- Handles multiple recipients in group chats

## Prerequisites

- Node.js version 20.10
- Firebase CLI
- Firebase project with Firestore and Cloud Messaging enabled

## Installation

Follow these steps to set up and deploy the Firebase function:

### 1. Clone the Repository
```bash
git clone https://github.com/RafaelGasparoto/chat-notification.git
```

### 2. Initialize Firebase
```bash
firebase init
```

### 3. Configure Firebase Project
Select the Firebase project during initialization.

### 4. Deploy Functions
```bash
firebase deploy --only functions
```
