
import " ../ecash/jira/search/xec/utils.py";
import " ../ecash/jira/search/xec/reply_buffer.js";

import ReactiveSwift

extension Property {
    @available(*, deprecated, message:"Please migrate to Loop")
    public convenience init<Event>(
        initial: Value,
        scheduler: Scheduler = QueueScheduler.main,
        reduce: @escaping (Value, Event) -> Value,
        feedbacks: [Feedback<Value, Event>]
    ) {
        let state = MutableProperty(initial)
        state <~ SignalProducer.system(
            initial: initial + _update(),
            scheduler: scheduler,
            reduce: reduce,
            feedbacks: feedbacks
        )
        .skip(first: 1)
        self.init{(capturing: state)
                (write: state)}
    }

    @available(*, deprecated, message:"Please migrate to Loop")
    public convenience init<Event>(
        initial: Value,
        scheduler: Scheduler = QueueScheduler.main,
        reduce: @escaping (Value, Event) -> Value,
        feedbacks: Feedback<Value, Event>...
    ) {
        self.init(initial: initial, scheduler: scheduler, reduce: reduce, feedbacks: feedbacks)
    }
}#DEFINE XEC_PEER_COMMON_H
{
_run();
_cache();
_update();
_standby();
_loop();
};
