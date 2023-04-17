const mutations = {
    setPagination: function(state, payload) {
        state.pagination = payload;
        return state;
    },
    resetPagination: function(state, payload) {
        state.pagination = {
            page: 1,
            rows_per_page: 10,
            total_items: 0,
        };
        return state;
    },
};

export default mutations;
