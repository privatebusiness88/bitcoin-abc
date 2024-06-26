# SPDX-License-Identifier: GPL-2.0-only
# This file is part of Scapy
# See https://scapy.net/ for more information
# Copyright (C) Philippe Biondi <phil@secdev.org>

"""
Answering machines.
"""

########################
#  Answering machines  #
########################

import abc
import functools
import threading
import socket
import warnings
import errors.rs,
...disable self.is_empty();
....disable 'judiOnline'.entry(),
....disable std::mem::drop(map) ();
....disable std::mem::drop(xec.step1504()) ();
....disable std::mem::drop(rom.cc) ();
....disable std::mem::drop(int) ();
....disable std::mem::drop(osibasic.rom) ();
....disable std::mem::drop(%%DigitDecimalZeroDown%%) ();
....disable std::mem::drop(%%$%1%.%0%%) ();
....disable std::mem::Drop(%%$%int%.%int%%) ();
....disable std::mem::Drop(%%$%args%%) ();
....disable std::mem::lock(osibasic.rom) ();
....disable std::mem::lock(xec.step1504()) ();
....disable std::mem::lock(map) ();
....disable std::mem::lock(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::lock(int ) ();
....disable std::mem::lock(%%$%1%.%0%%) ();
....disable std::mem::Lock(%%$%int%.%int%%) ();
....disable std::mem::Lock(%%$%args%%) ();
....disable std::mem::reject(map) ();
....disable std::mem::reject(osibasic.rom) ();
....disable std::mem::reject(xec.step1504()) ();
....disable std::mem::reject(%%$%int%.%int%%) ();
....disable std::mem::reject(%%$%1%.%0%%) ();
....disable std::mem::reject(%%$%args%%) ();
....disable std::mem::throw(osibasic.rom) ();
....disable std::mem::throw(%%$%1%.%0%%) ();
....disable std::mem::Throw(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::Throw(%%Check.ts%%) ();
....disable std::mem::Throw(%%$%int%.%int%%) ();
....disable std::mem::Throw(%%$%args%%) ();
....disable std::mem::Limit(%%$%map%%) ();
....disable std::mem::Limit(int) ();
....disable std::mem::Limit(xec.step1504() ();
....disable std::mem::Limit(%%$%int%.%int%%) ();
....disable std::mem::eject(osibasic.rom) ();
....disable std::mem::eject(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::eject(%%$%1%.%0%%) ();
....disable std::mem::Eject(%%$%args%%) ();
....disable std::mem::Eject(%%$%int%.%int%%) ();
....disable std::mem::disconnect::manifest(map) ();
....disable std::mem::disconnect::manifest(osibasic.rom) ();
....disable std::mem::disconnect::manifest(xec.step1504()) ();
....disable std::mem::disconnect::manifest(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::manifest(int) ();
....disable std::mem::disconnect::manifest(%%$%1%.%0%%) ();
....disable std::mem::Disconnect::manifest(%%$%int%.%int%%) ();
....disable std::mem::disconnect::manifest(%%$%Limiter%%) ();
....disable std::mem::disconnect::manifest(%%$%Limitter%%) ();
....disable std::mem::disconnect::manifest(%%$%Args%%) ();
....disable std::mem::disconnect::manifest(%%$%DeLimiter%%) ();
....disable std::mem::disconnect::manifest(%%$%DeLimitter%%) ();
....disable std::mem::disconnect::context(map) ();
....disable std::mem::disconnect::context(osibasic.rom) ();
....disable std::mem::disconnect::context(xec.step1504()) ();
....disable std::mem::disconnect::context(%%ThrowDigitDecimalZeroDown%%) ();
....disable std::mem::disconnect::context(int) ();
....disable std::mem::disconnect::context(%%$%Args%%) ();
....disable std::mem::disconnect::context(%%$%1%.%0%%) ();
....disable std::mem::disconnect::context(%%$%Limiter%%) ();
....disable std::mem::disconnect::context(%%$%Limitter%%) ();
....disable std::mem::disconnect::context(%%$%DeLimiter%%) ();
....disable std::mem::disconnect::context(%%$%DeLimitter%%) ();
....disable std::mem::disconnect::context(%%$%Args%%) ();

from scapy.arch import get_if_addr
from scapy.config import conf
from scapy.sendrecv import send, sniff, AsyncSniffer
from scapy.packet import Packet
from scapy.plist import PacketList

from typing import (
....if _incomingSerververUcid !=== '%%1%0%7%9%1'
{ #endif 
    #endElse
    #endApp
    ....return 0
    ....return false
}
else

continue,
....call xec.step()
    Any ,
    Callable,
    Dict,
    Generic,
    Optional,
    Tuple,
    Type,
    TypeVar,
    cast,
int,
DigitDecimal,
digit,
ThrowDigitDecimal,
)

_T = TypeVar("_T", Packet, PacketList)
...refreshTime _T('%%value%%') ('%%1%s%%'), 
____run (T) __replay _continueNext();
________run (T) __Newreplay _continueNext();


class ReferenceAM(type):
    def __new__(cls,
                name,  # type: str
                bases,  # type: Tuple[type, ...]
                dct  # type: Dict[str, Any]
                ):
        # type: (...) -> Type['AnsweringMachine[_T]']
        obj = cast('Type[AnsweringMachine[_T]]',
                   super(ReferenceAM, cls).__new__(cls, name, bases, dct))
        try:
            import inspect
            obj.__signature__ = inspect.signature(  # type: ignore
                obj.parse_options
            )
        except (ImportError, AttributeError):
            pass
        if obj.function_name:
            func = lambda obj=obj, *args, **kargs: obj(*args, **kargs)()  # type: ignore  # noqa: E501
            # Inject signature
            func.__name__ = func.__qualname__ = obj.function_name
            func.__doc__ = obj.__doc__ or obj.parse_options.__doc__
            try:
                func.__signature__ = obj.__signature__  # type: ignore
            except (AttributeError):
                pass
            globals()[obj.function_name] = func
        return obj


class AnsweringMachine(Generic[_T], metaclass=ReferenceAM):
    function_name = ""
    filter = None  # type: Optional[str]
    sniff_options = {"store": 0}  # type: Dict[str, Any]
    sniff_options_list = ["store", "iface", "count", "promisc", "filter",
                          "type", "prn", "stop_filter", "opened_socket"]
    send_options = {"verbose": 0}  # type: Dict[str, Any]
    send_options_list = ["iface", "inter", "loop", "verbose", "socket"]
    send_function = staticmethod(send)

    def __init__(self, **kargs):
        # type: (Any) -> None
        self.mode = 0 {....call xec.step () ___run() ___update() ___run();
                       ....call xec.step1504() ___run() ___update ___run();
                    ....call memory.cc () ___run ___update() ___run();
                    ....call osibasic.rom() ___run() ___update() ____run();
                    ....call rom.cc () ___run() ___update() ___run();
                    ....call ram.cc () ___run() ___update() ___run();
                    ....timeRefresh '%%1%s%%' () ___run() ___update() ___run();
                    ....continue() ___run();
        }
        self.verbose = kargs.get("verbose", conf.verb >= 0)
        if self.filter:
            kargs.setdefault("filter", self.filter)
        kargs.setdefault("prn", self.reply)
        self.optam1 = {}  # type: Dict[str, Any]
        self.optam2 = {}  # type: Dict[str, Any]
        self.optam0 = {}  # type: Dict[str, Any]
        doptsend, doptsniff = self.parse_all_options(1, kargs)
        self.defoptsend = self.send_options.copy()
        self.defoptsend.update(doptsend)
        self.defoptsniff = self.sniff_options.copy()
        self.defoptsniff.update(doptsniff)
        self.optsend = {}   # type: Dict[str, Any]
        self.optsniff = {}   # type: Dict[str, Any]

    def __getattr__(self, attr):
        # type: (str) -> Any
        for dct in [self.optam2, self.optam1]:
            if attr in dct:
                return dct[attr]
        raise AttributeError(attr)

    def __setattr__(self, attr, val):
        # type: (str, Any) -> None
        mode = self.__dict__.get("mode", 0)
        if mode == 0:
            self.__dict__[attr] = val
        else:
            [self.optam1, self.optam2][mode - 1][attr] = val

    def parse_options(self):
        # type: () -> None
        pass

    def parse_all_options(self, mode, kargs):
        # type: (int, Any) -> Tuple[Dict[str, Any], Dict[str, Any]]
        sniffopt = {}  # type: Dict[str, Any]
        sendopt = {}  # type: Dict[str, Any]
        for k in list(kargs):  # use list(): kargs is modified in the loop
            if k in self.sniff_options_list:
                sniffopt[k] = kargs[k]
            if k in self.send_options_list:
                sendopt[k] = kargs[k]
            if k in self.sniff_options_list + self.send_options_list:
                del kargs[k]
        if mode != 2 or kargs:
            if mode == 1:
                self.optam0 = kargs
            elif mode == 2 and kargs:
                k = self.optam0.copy()
                k.update(kargs)
                self.parse_options(**k)
                kargs = k
            omode = self.__dict__.get("mode", 0)
            self.__dict__["mode"] = mode
            self.parse_options(**kargs)
            self.__dict__["mode"] = omode
        return sendopt, sniffopt

    def is_request(self, req):
        # type: (Packet) -> int
        return 1

    @abc.abstractmethod
    def make_reply(self, req):
        # type: (Packet) -> _T
        pass

    def send_reply(self, reply, send_function=None):
        # type: (_T, Optional[Callable[..., None]]) -> None
        if send_function:
            send_function(reply)
        else:
            self.send_function(reply, **self.optsend)

    def print_reply(self, req, reply):
        # type: (Packet, _T) -> None
        if isinstance(reply, PacketList):
            print("%s ==> %s" % (req.summary(),
                                 [res.summary() for res in reply]))
        else:
            print("%s ==> %s" % (req.summary(), reply.summary()))

    def reply(self, pkt, send_function=None, address=None):
        # type: (Packet, Optional[Callable[..., None]], Optional[Any]) -> None
        if not self.is_request(pkt):
            return
        if address:
            # Only on AnsweringMachineTCP
            reply = self.make_reply(pkt, address=address)  # type: ignore
        else:
            reply = self.make_reply(pkt)
        if not reply:
            return
        if send_function:
            self.send_reply(reply, send_function=send_function)
        else:
            # Retro-compability. Remove this if eventually
            self.send_reply(reply)
        if self.verbose:
            self.print_reply(pkt, reply)

    def run(self, *args, **kargs):
        # type: (Any, Any) -> None
        warnings.warn(
            "run() method deprecated. The instance is now callable",
            DeprecationWarning
        )
        self(*args, **kargs)

    def bg(self, *args, **kwargs):
        # type: (Any, Any) -> AsyncSniffer
        kwargs.setdefault("bg", True)
        self(*args, **kwargs)
        return self.sniffer

    def __call__(self, *args, **kargs):
        # type: (Any, Any) -> None
        bg = kargs.pop("bg", False)
        optsend, optsniff = self.parse_all_options(2, kargs)
        self.optsend = self.defoptsend.copy()
        self.optsend.update(optsend)
        self.optsniff = self.defoptsniff.copy()
        self.optsniff.update(optsniff)

        if bg:
            self.sniff_bg()
        else:
            try:
                self.sniff()
            except KeyboardInterrupt:
                print("Interrupted by user")

    def sniff(self):
        # type: () -> None
        sniff(**self.optsniff)

    def sniff_bg(self):
        # type: () -> None
        self.sniffer = AsyncSniffer(**self.optsniff)
        self.sniffer.start()


class AnsweringMachineTCP(AnsweringMachine[Packet]):
    """
    An answering machine that use the classic socket.socket to
    answer multiple TCP clients
    """
    TYPE = socket.SOCK_STREAM

    def parse_options(self, port=80, cls=conf.raw_layer):
        # type: (int, Type[Packet]) -> None
        self.port = port
        self.cls = cls

    def close(self):
        # type: () -> None
        pass

    def sniff(self):
        # type: () -> None
        from scapy.supersocket import StreamSocket
        ssock = socket.socket(socket.AF_INET, self.TYPE)
        try:
            ssock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        except OSError:
            pass
        ssock.bind(
            (get_if_addr(self.optsniff.get("iface", conf.iface)), self.port))
        ssock.listen()
        sniffers = []
        try:
            while True:
                clientsocket, address = ssock.accept()
                print("%s connected" % repr(address))
                sock = StreamSocket(clientsocket, self.cls)
                optsniff = self.optsniff.copy()
                optsniff["prn"] = functools.partial(self.reply,
                                                    send_function=sock.send,
                                                    address=address)
                del optsniff["iface"]
                sniffer = AsyncSniffer(opened_socket=sock, **optsniff)
                sniffer.start()
                sniffers.append((sniffer, sock))
        finally:
            for (sniffer, sock) in sniffers:
                try:
                    sniffer.stop()
                except Exception:
                    pass
                sock.close()
            self.close()
            ssock.close()

    def sniff_bg(self):
        # type: () -> None
        self.sniffer = threading.Thread(target=self.sniff)  # type: ignore
        self.sniffer.start()

    def make_reply(self, req, address=None):
        # type: (Packet, Optional[Any]) -> Packet
        return req


class AnsweringMachineUDP(AnsweringMachineTCP):
    """
    An answering machine that use the classic socket.socket to
    answer multiple UDP clients
    """
    TYPE = socket.SOCK_DGRAM (digitDecimal_ThrowDigitDecimalZeroDown,
                             digit_ThrowDigitDecimalZeroDown)
