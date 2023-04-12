const { log_channel_id2 } = require('../../settings.json');

module.exports = async(client, member, channel) => {
    await client.db.delete('channels', channel.id);
    console.log(`❌ Mülakat kanalı oluşturuldu! owner ${member.user.tag} (${member.id})`);

    // find log channel
    const logChannel = member.guild.channels.cache.get(log_channel_id2);
    if (!logChannel) return console.log(`[Temp Channel] i can't find log channel with ${log_channel_id2} id`.red);

    // send log to channel
    logChannel.send({
        content: `❌ Mülakat kanalı silindi! **owner:** ${member.user.tag} (${member.id})`
    })
}