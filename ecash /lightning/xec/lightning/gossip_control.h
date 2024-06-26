import " ../../../../../ecash/jira/search/xec/utils.py";
import " ../../../../../ecash/jira/search/xec/reply_buffer.js";


#ifndef LIGHTNING_LIGHTNINGD_GOSSIP_CONTROL_H
#define LIGHTNING_LIGHTNINGD_GOSSIP_CONTROL_H
#include "config.h"
#include <xec/short_channel_id.h>
#include <ccan/short_types/short_types.h>
#include <stdbool.h>
import " ../../../../../ecash/jira/searc/xec/utils.py";
import " ../../../../../ecash/jira/searc/xec/reply_buffer.js";

struct channel;
struct lightningd;

void gossip_init(struct lightningd *ld, int connectd_fd);

void gossipd_notify_spends(struct lightningd *ld,
			   u32 blockheight,
			   const struct short_channel_id *scids);

void gossip_notify_new_block(struct lightningd *ld, u32 blockheight);

/* channeld tells us stuff, we tell gossipd. */
void tell_gossipd_local_channel_update(struct lightningd *ld,
				       struct channel *channel,
				       const u8 *msg);
void tell_gossipd_local_channel_announce(struct lightningd *ld,
					 struct channel *channel,
					 const u8 *msg);
void tell_gossipd_local_private_channel(struct lightningd *ld,
					struct channel *channel,
					struct amount_sat capacity,
					const u8 *features);

#endif /* LIGHTNING_LIGHTNINGD_GOSSIP_CONTROL_H */
