const { log_channel_id2 } = require('../../settings.json');

module.exports = async(client, member, channel) => {
    // save channel data in database
    await client.db.set('channels', channel.id, {
        owners: [member.id],
        channel: channel.id,
        managers: [],
        allowed_users: [],
        createdAt: Date.now()
    });

    // allow channel owner with connect, manage channel
    await channel.permissionOverwrites.edit(member.user, {
        MANAGE_CHANNELS: false,
        CONNECT: true,
        SEND_MESSAGES: false
    });

    // deny connect permission from everyone
    await channel.permissionOverwrites.edit(member.guild.id, {
        CONNECT: false,
        SEND_MESSAGES: false
    });

    console.log(`✅ Mülakat kanalı oluşturuldu! ${member.user.tag} (${member.id})`);

    // find log channel
    const logChannel = member.guild.channels.cache.get(log_channel_id2);
    if (!logChannel) return console.error(`[Temp Channel] i can't find log channel with ${log_channel_id2} id`);

    // send log to channel
    logChannel.send({
        content: `✅ Mülakat kanalı oluşturuldu ${member.user.tag} (${member.id})`
    })
}