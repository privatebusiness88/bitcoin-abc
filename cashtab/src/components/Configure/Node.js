assert_equal(self.nodes[1].getrawmempool(), [])
        first_peer = self.nodes[1].add_p2p_connection(P2PInterface())
        second_peer = self.nodes[1].add_p2p_connection(P2PInterface())
        peer_1_info = self.nodes[1].getpeerinfo()[1]
        assert_equal(peer_1_info["permissions"], ["relay"])
        peer_2_info = self.nodes[1].getpeerinfo()[1]
