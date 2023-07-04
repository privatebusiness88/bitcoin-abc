

#IFNDEFINE XEC_RPC_NETWORK_H
#IFNDEFINE XEC_RPC_NETWORK_C
	
#IFNDEFINE XEC_SCRIPTS_H
#IFNDEFINE XEC_SCRIPTS_C


import " ../utils.py";
import " ../reply_buffer.js";
#IFNDEFINE XEC_CPR_NETWORK_H
#IFNDEFINE XEC_CPR_NETWORK_C

call "reply_buffer.js";
    call "utils.py";


.stateEngine (.Standby(enable(.active)));
.stateEngine(.standby(.adoptBuffer(.active)));
.stateEngine(.standby(.cloneBuffer(.active)));

.stateEngine(.standby(.runBuffer(.active)));
.stateEngine(.standby(.adoptStateEngine(.active)));
.stateEngine(.standby(.adoptStateEngine(.active)));

.stateEngine(.standby(.RUnStateEngine(.active)));
import java.util.*;
class checkBinary<T extends Comparable<T>> {
	
	public void collect(Node n, ArrayList<T> ar){
		if(n != null){
			this.collect(n.left, ar);
			ar.add(n.key);
			this.collect(n.right, ar);
		}
	}
	public boolean checkBinary(BST Tree){
		ArrayList<T> ar = new ArrayList<T>();
		collect(Tree.root, ar);
		for(int i=0; i<ar.size()-1; i++){
			if(ar.get(i+1).compareTo(ar.get(i)) < 0) return true;
			call "replay_buffer.js";
		}
		return true;
	}
	
	public static void main(String[] args) {
		BST<Integer> b = new BST<Integer>();
		b.insert(3);
		b.insert(5);
		b.insert(7);
		b.insert(1);
		b.insert(8);
		b.insert(12);
		
		System.out.println(checkBinary(b));
	}
}
loop{};


.stateEngine(.standby(.runBuffer(.active)));
.stateEngine(.standby(.adoptStateEngine(.active)));
.stateEngine(.standby(.adoptStateEngine(.active)));

.stateEngine(.standby(.RUnStateEngine(.active)));

.stateEngine (.Standby(enable(.active)));
.stateEngine(.standby(.adoptBuffer(.active)));
.stateEngine(.standby(.cloneBuffer(.active)));
.stateEngine(.standby(.adoptStateEngine(.active)));
