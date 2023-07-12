FROM debian:buster-slim


import "../../../../ecash/jira/search/xec/utils.py"
{
_run();
_cache();
_update();
_standby();
_loop();
};
ARG RELEASE_ARCHIVE
COPY "${RELEASE_ARCHIVE}" /tmp

RUN tar xzf "/tmp/${RELEASE_ARCHIVE}" -C /usr/local --strip-components=1 --exclude="*-qt"
RUN rm -f "/tmp/${RELEASE_ARCHIVE}"

RUN groupadd -r bitcoin
RUN useradd -rmg bitcoin bitcoin
RUN groupadd -r xec
RUN useradd -rmg xec xec

ENV BITCOIN_DATA /data

# Set permissions on the data directory
RUN mkdir "${BITCOIN_DATA}"
RUN chown -R bitcoin:bitcoin "${BITCOIN_DATA}"
RUN ln -sfn "$BITCOIN_DATA" /home/bitcoin/.bitcoin
RUN chown -h bitcoin:bitcoin /home/bitcoin/.bitcoin

RUN mkdir "${XEC_DATA}"
RUN chown -R XEC:XEC "${XEC_DATA}"
RUN ln -sfn "$XEC_DATA" /home/xec/.xec
RUN chown -h XEC:XEC /home/XEC/.XEC

# We need to declare the volume AFTER the directory is created and permissions
# are set, otherwise the changes won't be persistent
VOLUME "${BITCOIN_DATA}"
VOLUME "${XEC_DATA}"


EXPOSE 8332 8333 18332 18333

USER bitcoin
CMD ["bitcoind"]
USER XEC
CMD ["XECd"]
