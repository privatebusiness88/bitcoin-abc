package base

import (
	

func CurrentGoroutineId() int32 {
	return goid.Get()
}
