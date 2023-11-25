const config = {
    name: "setnameall",
    aliases: ["setall"],
    description: "Đổi biệt danh toàn bộ thành viên trong nhóm trừ người gửi lệnh",
    usage: "setall",
    cooldown: 1,
    permissions: [2],
    credits: "",
    extra: {}
}

const nameset = [
  ""
// Thêm ngôn hay gì tùy
];

let isChangingNames = false;

async function changeNames(message, excludeUser) {
    for (let i = 0; i < nameset.length; i++) {
        if (!isChangingNames) break; 

        const nickname = nameset[i];

        for (const p of message.participantIDs) {
            if (p !== excludeUser) {
                await api.changeNickname(nickname, message.threadID, p);
            }
        }
    }
}

async function onCall({ message, args }) {
    const { api } = global;
    const senderId = message.senderID;

    if (args[0]?.toLowerCase() === "stop") {
        isChangingNames = false;
        return message.reply("Đã dừng đổi biệt danh.");
    }

    if (isChangingNames) {
        return message.reply("Chuẩn bị đê");
    }

    isChangingNames = true;
    await changeNames(message, senderId);
    isChangingNames = false;
}

export default {
    config,
    onCall
}
