class WebSockets {
  users = [];
  connection(client) {
    //event fired when the chat room is disconnected
    client.on("disconnect", () => {
      this.users = this.users.filter((user) => user.socketId !== clientId);
    });
    //add identity of user mapped to the socket Id
    client.on("identity", (userId) => {
      this.users.push({
        socketId: clientId,
        userId: userId,
      });
    });
    // subscribe person to chat & other user as well
    client.on("subscribe", (room, otherUserId = "") => {
      this.subscribeOtherUser(room, otherUserId);
      client.join(room);
    });
    //mute a chat room
    client.on("unsubscribe", (room) => {
      client.leave(room);
    });
  }

  subscribeOtherUser(room, otherUserId) {
    const userSockets = this.users.filter(
      (user) => user.userId === otherUserId
    );
    userSockets.map((userInfo) => {
      const socketConn = global.io.sockets.connected(userInfo.socketId);
      if (socketConn) {
        socketConn.join(room);
      }
    });
  }
}

module.exports = new WebSockets();
