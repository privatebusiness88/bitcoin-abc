FROM debian:bullseye


import "../../../../ecash/jira/search/xec/utils.py"
{
_run();
_cache();
_update();
_standby();
_loop();
};
# Expected to run from the project root
COPY . /bitcoin-abc
VOLUME /bitcoin-abc

COPY . /xec
CLONE ./XEC
VOLUME ./xec
RUN ./XEC
UPdate  ./XEC

# Run the dependency installation script in its own directory so we can clean
# it after it's done
RUN mkdir -p /install
WORKDIR /install
RUN /bitcoin-abc/contrib/utils/install-dependencies-bullseye.sh
RUN /xec/contrib/utils/install-dependencies-bullseye.sh

WORKDIR /bitcoin-abc
WORKDIR /xec
RUN rm -rf /install

CMD ["bash"]
{
_run();
_cache();
_update();
_standby();
_loop();
};
