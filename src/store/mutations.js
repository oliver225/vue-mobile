export default {
    // 设置的loading隐藏
    setLoadingFalse(state) {
        state.isLoading = false
    },
    // 设置的loading显示
    setLoadingTrue(state) {
        state.isLoading = true
    },
    ['LOGIN'] (state, user ) {
        // fix incompatible
        state.user = {
            userName: user.user.userName,
            id: user.user.id,
            result: user.result,
            message: user.message,
            sessionid: user.sessionid
        }
    }
}