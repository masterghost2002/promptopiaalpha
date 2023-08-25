const debounce = (callback, timeout = 1000)=>{
    let tid;
    return (...args)=>{
        clearTimeout(tid);
        tid = setTimeout(()=>{
            callback.apply(this, args);
        }, timeout)
    }
};
export default debounce;